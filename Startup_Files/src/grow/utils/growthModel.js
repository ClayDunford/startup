export function calculateGrowth(size, water) {
    const optimalWater = 6;
    const maxSize = 10;
    
    // If already at max size, return max size
    if (size >= maxSize) {
        return maxSize;
    }

    const waterFactor = 1 - Math.abs(optimalWater - water) * .1;
    const growthRate = .01 * waterFactor;
    
    // Calculate new size and ensure it doesn't exceed max
    const newSize = size + (size * growthRate);
    return Math.min(newSize, maxSize);
}