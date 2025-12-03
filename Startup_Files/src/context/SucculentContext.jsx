import React, { createContext, useState, useContext, useEffect, useRef, useMemo, useCallback } from "react";
import { calculateGrowth } from '../grow/utils/growthModel';
const SucculentContext = createContext(null);

export function useSucculent() {
    return useContext(SucculentContext);
}

export function SucculentProvider({ children }) {
    const [size, setSize] = useState(1);
    const [water, setWater] = useState(6);
    const [potColor, setPotColor] = useState('#a97c50');
    const [succulentId, setSucculentId] = useState(null);

    // Refs for autosave
    const latestState = useRef({ size, water, potColor });
    useEffect(() => {
        latestState.current = { size, water, potColor };
    }, [size, water, potColor]);

    function getAuthToken() {
        try {
            const rawData = localStorage.getItem('currentUser');
            console.log('🔐 getAuthToken - raw localStorage:', rawData);

            const stored = JSON.parse(rawData);
            console.log('🔐 getAuthToken - parsed data:', stored);
            console.log('🔐 getAuthToken - token:', stored?.token);

            return stored?.token || null;
        } catch (err) {
            console.error('🔐 getAuthToken - parse error:', err);
            return null;
        }
    }

    // Load succulent when user logs in
    useEffect(() => {
        let mounted = true;

        async function loadSucculent() {
            console.log('🔄 loadSucculent: Starting...');
            try {
                const token = getAuthToken();
                console.log('🔑 Token:', token ? 'Present' : 'Missing');

                if (!token) {
                    console.log('⚠️ No token found, skipping load');
                    return;
                }

                const headers = { 'Authorization': `Bearer ${token}` };
                console.log('📡 Fetching /api/succulents...');

                const res = await fetch('/api/succulents', { credentials: 'include', headers });
                console.log('📡 Response status:', res.status);

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('❌ Failed to load:', res.status, errorText);
                    throw new Error('Failed to load succulent');
                }

                if (!mounted) return; // Component unmounted during fetch

                const data = await res.json();
                console.log('📦 Loaded data:', data);

                if (data.length > 0) {
                    const s = data[0];
                    console.log('✅ Found existing succulent:', s);
                    setSize(s.size || 1);
                    setWater(s.water || 6);
                    setPotColor(s.potColor || '#a97c50');
                    setSucculentId(s.id);
                    console.log('✅ Set succulentId:', s.id);
                } else {
                    console.log('📝 No succulent found, creating new one...');
                    const createRes = await fetch('/api/succulents', {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json', ...headers },
                        body: JSON.stringify({ size: 1, water: 6, potColor: '#a97c50' })
                    });

                    console.log('📡 Create response status:', createRes.status);

                    if (!createRes.ok) {
                        const errorText = await createRes.text();
                        console.error('❌ Failed to create:', createRes.status, errorText);
                        throw new Error('Failed to create succulent');
                    }

                    if (!mounted) return;

                    const newS = await createRes.json();
                    console.log('✅ Created new succulent:', newS);
                    setSize(newS.size || 1);
                    setSucculentId(newS.id);
                    console.log('✅ Set succulentId:', newS.id);
                }
            } catch (err) {
                console.error('❌ Failed to load/create succulent:', err);
            }
        }

        // Try to load immediately
        loadSucculent();

        // Also listen for storage events (when user logs in from another tab or this tab)
        const handleStorageChange = (e) => {
            if (e.key === 'currentUser') {
                console.log('🔄 localStorage changed, reloading succulent...');
                loadSucculent();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Poll for localStorage changes every 2 seconds as a fallback
        // (storage event doesn't fire in the same tab that made the change)
        const pollInterval = setInterval(() => {
            const token = getAuthToken();
            if (token && !succulentId) {
                console.log('🔄 Detected token without succulentId, loading...');
                loadSucculent();
            }
        }, 2000);

        return () => {
            mounted = false;
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(pollInterval);
        };
    }, [succulentId]); // Re-run if succulentId changes

    useEffect(() => {
        const timer = setInterval(() => {
            setSize(prev => calculateGrowth(prev, water));
        }, 1000);
        return () => clearInterval(timer);
    }, [water]);

    const saveSucculent = useCallback(async () => {
        if (!succulentId) {
            console.log('⚠️ saveSucculent: No succulentId, skipping save');
            return;
        }
        try {
            const payload = latestState.current;
            console.log('💾 Saving succulent:', { succulentId, payload });

            const token = getAuthToken();
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`/api/succulents/${succulentId}`, {
                method: 'PUT',
                credentials: 'include',
                headers,
                body: JSON.stringify(payload)
            });

            console.log('📡 Save response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Save failed:', response.status, errorText);
                return;
            }

            const result = await response.json();
            console.log('✅ Saved succulent state successfully:', result);
        } catch (err) {
            console.error('❌ Failed to save succulent:', err);
        }
    }, [succulentId]);

    useEffect(() => {
        if (!succulentId) return;
        const interval = setInterval(saveSucculent, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [succulentId]);

    const value = useMemo(() => ({
        size,
        water,
        potColor,
        setWater,
        setPotColor,
        saveSucculent  // Expose for manual testing
    }), [size, water, potColor, saveSucculent]);  // setWater and setPotColor are stable

    return (
        <SucculentContext.Provider value={value}>
            {children}
        </SucculentContext.Provider>
    );
}