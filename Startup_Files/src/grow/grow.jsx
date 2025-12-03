import React, { useMemo, useEffect } from 'react';
import '../app.css';
import Succulent from './succulent';
import Controls from './controls';
import { useWeather } from './hooks/useWeather';
import { getWeatherBackground } from './utils/weatherBackground';
import { useSucculent } from '../context/SucculentContext';

export function Grow() {
  const { size, water, setWater, potColor, setPotColor, saveSucculent } = useSucculent();
  const { weather, error } = useWeather();



  // Compute background only when weathercode actually changes (not on every render)
  const background = useMemo(() => {
    return weather?.weathercode != null
      ? getWeatherBackground(weather.weathercode)
      : '#006838';
  }, [weather?.weathercode]);

  return (
    <div
      className="d-flex flex-column bg-custom min-vh-100"
      style={{ background: background, position: 'relative', overflow: 'hidden' }}
    >
      <main style={{ position: 'relative', flexGrow: 1 }}>
        <div
          className="text-light text-center"
          style={{ backgroundColor: '#006838', zIndex: 5, position: 'relative' }}
        >
          <h1>Enjoy the Growth!</h1>
          {error ? <p>{error}</p> : <p>Weather‑based background active</p>}
        </div>

        <div
          className="grow-container"
          style={{
            position: 'relative',
            width: '80%',
            aspectRatio: '16/9',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <div
              className="d-flex flex-column align-items-center mt-4"
              style={{
                zIndex: 2,
                position: 'relative',
                minHeight: '80vh',
                paddingBottom: '0vh',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <div style={{ width: '20%', minWidth: '120px', marginTop: '10vh' }}>
                <Succulent size={size} potColor={potColor} />
              </div>
              <Controls
                potColor={potColor}
                setPotColor={setPotColor}
                water={water}
                setWater={setWater}
                saveSucculent={saveSucculent}
              />
              <p className="text-light mt-3">
                Current Size: {size.toFixed(2)}x
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
