import {useState, useEffect} from 'react';
import {calculateGrowth} from '../utils/growthModel';

export function useGrowthSimulation({water, tickRate = 1000}) {
    const [size, setSize] = useState(1);

    useEffect (() => {
        const savedDataRaw = localStorage.getItem('succulentData');
        
        if (savedDataRaw) {
            const savedData = JSON.parse(savedDataRaw);
            const {savedSize, savedWater, savedDate} = savedData;

            const now = new Date();
            const then = new Date(savedDate);
            const hoursPassed = Math.max((now-then) / (1000 * 60 * 60), 0);

            let offlineSize = savedSize;
            for (let i = 0; i < hoursPassed; i++) {
                offlineSize = calculateGrowth(offlineSize, savedWater);
            }
            setSize(offlineSize);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSize((prev) => {
                const newSize = calculateGrowth(prev, water);
                localStorage.setItem(
                    'succulentData',
                    JSON.stringify({
                        savedSize: newSize,
                        savedWater: water,
                        savedDate: new Date().toISOString(),
                    })
                );
                return newSize;
            });
        }, tickRate);

        return () => clearInterval(interval);
    }, [water, tickRate]);
    return size;
}