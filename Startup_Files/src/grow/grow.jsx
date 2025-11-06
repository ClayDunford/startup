import React, { useState } from 'react';
import '../app.css';
import Succulent from './succulent';
import Controls from './controls';
import { useGrowthSimulation } from './hooks/useGrowthSimulation';
import { useWeather } from './hooks/useWeather';
import { getWeatherBackground } from './utils/weatherBackground';

export function Grow() {
  const [potColor, setPotColor] = useState('#a97c50');
  const [water, setWater] = useState(6);

  const size = useGrowthSimulation({ water, potColor, tickRate: 1000 });
  const { weather, error } = useWeather();
  const background = getWeatherBackground(weather?.weathercode);

  return (
    <div
      className="d-flex flex-column bg-custom min-vh-100"
      style={{
        background: background || '#006838',
        transition: 'background 1s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <main style={{ position: 'relative', flexGrow: 1 }}>
        <div
          className="text-light text-center"
          style={{ backgroundColor: '#006838', zIndex: 5, position: 'relative' }}
        >
          <h1>Enjoy the growth!</h1>
          {error ? <p>{error}</p> : <p>Weather-based background active</p>}
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
          <div style={{ position: 'relative' }}>
            <div
              className="d-flex flex-column align-items-center mt-4"
              style={{
                zIndex: 2,
                position: 'relative',
                minHeight: '80vh',
                paddingBottom: '15vh',
                justifyContent: 'flex-end',
              }}
            >
              <Succulent size={size} potColor={potColor} />
              <Controls
                potColor={potColor}
                setPotColor={setPotColor}
                water={water}
                setWater={setWater}
              />
              <p className="text-light mt-3">Current Size: {size.toFixed(2)}x</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
