export function getWeatherBackground(weatherCode) {
    if (weatherCode === undefined) return "#006838";

    if (weatherCode < 3) return "linear-gradient(to bottom, #87CEEB, #F0E68C)";
    if (weatherCode < 50) return "linear-gradient(to bottom, #B0C4DE, #708090)";
    if (weatherCode < 70) return "linear-gradient(to bottom, #5F9EA0, #2F4F4F)";
    if (weatherCode < 80) return "linear-gradient(to bottom, #B0E0E6, #A9A9A9))";
    return "linear-gradient(to bottom, #2E2E2E, #000000)";
}