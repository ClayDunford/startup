import { useState, useEffect, useRef } from 'react';
import { calculateGrowth } from '../utils/growthModel';

export function useGrowthSimulation({ water, potColor, tickRate = 1000 }) {
  const [size, setSize] = useState(1);
  const [succulentId, setSucculentId] = useState(null);
  const saveInterval = useRef(null);

  // Load from backend on mount
  useEffect(() => {
    async function loadSucculent() {
      try {
        const res = await fetch('/api/succulents', { credentials: 'include' });
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({size: 1, water, potColor}),
          });

          const newS = await createRes.json();
          setSize(newS.size || 1);
          setSucculentId(newS.id);
        }
      } catch (err) {
        console.error('Failed to load/create succulent:', err);
      }
    }
    loadSucculent();
  }, []);

  // Simulate growth
  useEffect(() => {
    const growthTimer = setInterval(() => {
      setSize(prev => calculateGrowth(prev, water));
    }, tickRate);
    return () => clearInterval(growthTimer);
  }, [water, tickRate]);

  // Autosave 
  useEffect(() => {
    if (!succulentId) return;

    async function autoSave() {
      try {
        await fetch(`/api/succulents/${succulentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({ size, water, potColor}),
        });
        console.log('Auto-saved succulent');
      } catch (err) {
        console.error('Failed to auto-save: ', err);
      }
    }

    saveInterval.current = setInterval(autoSave, 5 * 60 * 1000);
    return () => clearInterval(saveInterval.current);
  }, [succulentId, size, water, potColor]);
  return size;
}
