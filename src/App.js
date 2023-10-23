import './App.css';
import { useEffect, useState } from 'react';
import { Forecast } from './Components/Forecast';
import { Inputs } from './Components/Inputs';
import { NavButtons } from './Components/NavButtons';
import { TemperatureDetails } from './Components/TemperatureDetails';
import { TimeLocation } from './Components/TimeLocation';
import getFormattedWeatherData from './WeatherService';
import getWeatherData from './WeatherService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q: 'mumbai'})
  const [units,setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'
      toast.info('Fetching weather for ' + message)

      await getFormattedWeatherData({...query, units}).then((data) => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`);
        setWeather(data);
      })
    };
    fetchWeather();
  }, [query,units]);

  const formatBackground = () => {
    if(!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if(weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  }

  return (
    <div className=''>
    <div className='nav-header flex flex-row border-b-2 shadow-lg mx-auto max-w-[100%] px-10'>
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      <NavButtons setQuery={setQuery}/>
    </div>
    
    <div className=''>

      <div className={`mx-auto max-w-screen-sm mt-4 mb-8 py-5 px-10 bg-gradient-to-br h-fit shadow-xl rounded-2xl shadow-gray-400 ${formatBackground()}`}>
          {weather && (
            <div className=''>
              <TimeLocation weather={weather}/>
              <TemperatureDetails weather={weather}/>
            </div>
          )}
      <ToastContainer autoClose={1000} theme='colored' newestOnTop={true}/>
    </div>
    </div>
    
    
    </div>
    
  );
}

export default App;
