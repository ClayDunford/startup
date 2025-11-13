import { useState, useEffect, useRef } from 'react';
import { calculateGrowth } from '../utils/growthModel';

export function useGrowthSimulation({ water, potColor, tickRate = 1000 }) {
    const [size, setSize] = useState(1);
    const [succulentId, setSucculentId] = useState(null);
    const saveInterval = useRef(null);

    // Refs to hold latest values for autosave callback (so autosave interval doesn't need to be recreated)
    const latestSizeRef = useRef(size);
    const latestWaterRef = useRef(water);
    const latestPotColorRef = useRef(potColor);

    useEffect(() => { latestSizeRef.current = size; }, [size]);
    useEffect(() => { latestWaterRef.current = water; }, [water]);
    useEffect(() => { latestPotColorRef.current = potColor; }, [potColor]);

    // helper to get token from localStorage (set by login/create)
    function getAuthToken() {
        try {
            const stored = JSON.parse(localStorage.getItem('currentUser'));
            return stored?.token || null;
        } catch {
            return null;
        }
    }

    // Load/create succulent
    useEffect(() => {
        async function loadSucculent() {
            try {
                const token = getAuthToken();
                const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
                const res = await fetch('/api/succulents', { credentials: 'include', headers });
                if (!res.ok) throw new Error('Failed to load succulent');
                const data = await res.json();
                if (data.length > 0) {
                    const s = data[0];
                    setSize(s.size || 1);
                    setSucculentId(s.id);
                } else {
                    const createRes = await fetch('/api/succulents', {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json', ...headers },
                        body: JSON.stringify({ size: 1, water, potColor }),
                    });
                    if (!createRes.ok) throw new Error('Failed to create succulent');
                    const newS = await createRes.json();
                    setSize(newS.size || 1);
                    setSucculentId(newS.id);
                }
            } catch (err) {
                console.error('Failed to load/create succulent:', err);
            }
        }
        loadSucculent();
    }, []); // runs once on mount

    // Growth simulation (ticks every tickRate)
    useEffect(() => {
        const timer = setInterval(() => setSize(prev => calculateGrowth(prev, water)), tickRate);
        return () => clearInterval(timer);
    }, [water, tickRate]);

    // Autosave: create a single interval when succulentId becomes available.
    // The autosave callback reads current values from refs so we don't need to recreate the interval on every size change.
    useEffect(() => {
        if (!succulentId) return;

        async function autoSave() {
            try {
                const payload = {
                    size: latestSizeRef.current,
                    water: latestWaterRef.current,
                    potColor: latestPotColorRef.current,
                };
                const token = getAuthToken();
                const headers = { 'Content-Type': 'application/json' };
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const res = await fetch(`/api/succulents/${succulentId}`, {
                    method: 'PUT',
                    headers,
                    credentials: 'include',
                    body: JSON.stringify(payload),
                });
                if (!res.ok) {
                    const text = await res.text().catch(() => '');
                    throw new Error('Failed to autosave: ' + (text || res.status));
                }
                console.log('Auto-saved succulent');
            } catch (err) {
                console.error('Autosave error:', err);
            }
        }

        // clear any existing interval just in case, then set a single interval
        if (saveInterval.current) clearInterval(saveInterval.current);
        saveInterval.current = setInterval(autoSave, 5 * 60 * 1000);
        // Also optionally do an immediate save once
        // autoSave();

        return () => {
            if (saveInterval.current) clearInterval(saveInterval.current);
            saveInterval.current = null;
        };
    }, [succulentId]); // <- only re-run when succulentId changes

    return size;
}