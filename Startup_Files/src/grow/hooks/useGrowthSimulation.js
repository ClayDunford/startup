import { useState, useEffect, useRef } from 'react';
import { calculateGrowth } from '../utils/growthModel';

export function useGrowthSimulation({ water, potColor, tickRate = 1000 }) {
  const [size, setSize] = useState(1);
  const [succulentId, setSucculentId] = useState(null);
  const saveTimer = useRef(null);

  // Load from backend on mount
  useEffect(() => {
    async function loadSucculent() {
      try {
        const res = await fetch('/api/succulents', { credentials: 'include' });
        if (!res.ok) return;

        const succulents = await res.json();
        if (succulents.length > 0) {
          const s = succulents[0];
          setSucculentId(s.id);
          setSize(s.size);
        } else {
          // Create one if none exists
          const createRes = await fetch('/api/succulents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ size: 1, water, potColor }),
          });
          const newSucculent = await createRes.json();
          setSucculentId(newSucculent.id);
          setSize(newSucculent.size);
        }
      } catch (err) {
        console.error('Failed to load succulent:', err);
      }
    }
    loadSucculent();
  }, []);

  // Simulate growth
  useEffect(() => {
    if (!succulentId) return;

    const interval = setInterval(() => {
      setSize(prev => {
        const newSize = calculateGrowth(prev, water);

        // Throttle saves — only update backend every few seconds
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
          fetch(`/api/succulents/${succulentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ size: newSize, water, potColor }),
          }).catch(err => console.error('Failed to save succulent:', err));
        }, 2000);

        return newSize;
      });
    }, tickRate);

    return () => clearInterval(interval);
  }, [succulentId, water, potColor, tickRate]);

  return size;
}
