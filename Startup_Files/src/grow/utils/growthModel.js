export function calculateGrowth(size, water) {
    const optimalWater = 6;
    const waterFactor = 1 - Math.abs(optimalWater - water) * .1;

    const growthRate = .001 * waterFactor;
    return size + (size * growthRate);
}