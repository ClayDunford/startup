import { use, useEffect, useState} from "react";

export function useWeather() {
    const [weater, setWeater] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!navigator.geolocation) {
            setError("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const {latitude, longitude} = pos.coords;
                try {
                    const res = await fetch(
                       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`
                    );
                    const data = await res.json();
                    setWeather(data.current);
                } catch {
                    setError("Failed to fetch weather");
                }
            },
            () => setError("Location access denied")
        );
    }, []);
    return {weather, error};
}