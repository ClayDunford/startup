import React from 'react';
import '../app.css';
import Succulent from './succulent';
import Controls from './controls';
import {useGrowthSimulation} from './hooks/useGrowthSimulation';

export function Grow() {
  const [potColor, setPotColor] = useState('#a97c50');
  const [water, setWater] = useState(6);

  const size = useGrowthSimulation({water, tickRate: 1000});

  const {weather, error} = useWeather();
  const background = getWeatherBackground(weather?.weathercode);
  return (
    <div className="d-flex flex-column bg-custom min-vh-100">
      <main>
        <div className="text-light text-center" style={{ backgroundColor: '#006838'}} >
          <h1>Enjoy the growth!</h1>
          {error? <p>{error}</p> : <p>Weather-based background active</p>}
        </div>
        <div className="d-flex flex-column align-items-center mt-4">
          <Succulent size={size} potColor={potColor} />
          <Controls
            potColor={potColor}
            setPotColor={setPotColor}
            water={water}
            setWater={setWater} />
            <p className="text-light mt-3"> Current Size: {size.toFixed(2)}x</p>
        </div>
      </main>
    </div>
  );
}