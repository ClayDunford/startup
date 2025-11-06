// useGrowthSimulation.js
import { useState, useEffect, useRef } from 'react';
import { calculateGrowth } from '../utils/growthModel';

export function useGrowthSimulation({ water, potColor, tickRate = 1000 }) {
  const [size, setSize] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    const savedDataRaw = localStorage.getItem('succulentData');
    if (savedDataRaw) {
      const savedData = JSON.parse(savedDataRaw);
      const { savedSize, savedWater, savedDate } = savedData;

      const now = new Date();
      const then = new Date(savedDate);
      const hoursPassed = Math.max((now - then) / (1000 * 60 * 60), 0);

      let offlineSize = savedSize;
      for (let i = 0; i < hoursPassed; i++) {
        offlineSize = calculateGrowth(offlineSize, savedWater);
      }
      setSize(offlineSize);
    }
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSize((prev) => {
        const newSize = calculateGrowth(prev, water);
        if (newSize >= 10) {
          clearInterval(intervalRef.current); // stop sim permanently
        }
        localStorage.setItem(
          'succulentData',
          JSON.stringify({
            savedSize: newSize,
            savedWater: water,
            savedDate: new Date().toISOString(),
            savedPotColor: potColor,
          })
        );
        return newSize;
      });
    }, tickRate);

    return () => clearInterval(intervalRef.current);
  }, [water, tickRate, potColor]);

  return size;
}
