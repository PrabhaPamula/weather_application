import './App.css';
import { useEffect, useState } from 'react';
import { Inputs } from './Components/Inputs';
import { NavButtons } from './Components/NavButtons';
import { TemperatureDetails } from './Components/TemperatureDetails';
import { TimeLocation } from './Components/TimeLocation';
import { Extra } from './Components/Extra';
import getFormattedWeatherData from './WeatherService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BsArrowLeftShort} from "react-icons/bs"
import { MdMenu } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

function App() {

  const [query, setQuery] = useState({q: 'mumbai'})
  const [units,setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units}).then((data) => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`);
        setWeather(data);
      })
    };
    fetchWeather();
  }, [query,units]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 980) {
        setOpen(false); // Initially close sidebar on 800px and below
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  const formatBackground = () => {
    if(!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if(weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  }

  const [open, setOpen] = useState(true);
  const [sidebar, setSidebar] = useState(false)
  
return (
    <div className='main-sidebar-container flex flex-row'>

        <div className={`nav-header flex flex-col border-b-2 bg-slate-200 min-h-screen px-2 pt-5 duration-300 relative ${open ? "w-60" : "w-16"} `} >
          {/* logo */}
          <div className='sidebar-logo inline-flex items-center p-2'>
            <img src="../images/sun.png" className='w-8 mr-2'/>
            <p className={`font-medium text-lg ${!open && "hidden"}`}>WeatherApp</p>
          </div>
          
          <div className='nav-content'>
            <BsArrowLeftShort className={`bg-white text-black text-3xl rounded-full absolute -right-3 top-3 border border-slate-600 cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} open={open} setOpen={setOpen}/>
            <NavButtons setQuery={setQuery} open={open}/>
          </div>
        </div>
    {/* sidebar */}
      

      {/* side of sidebar */}
      <div className='sidebar-side-container flex-grow mt-8 ml-4'>
        <div className=''>
            {weather && (
              <>
                <div className={`weather-card mx-auto  w-8/12 py-4 px-5 bg-gradient-to-br h-fit shadow-lg rounded-2xl shadow-gray-400 ${formatBackground()}`}>
                  <TimeLocation weather={weather}/>
                  <TemperatureDetails weather={weather}/>
                </div>
                <div className='mx-auto w-8/12 py-5 px-5'>
                  <Extra weather={weather}/>
                </div>
              </>
            )}
          <ToastContainer autoClose={500} theme='colored' newestOnTop={true} className="toast-bottom"/>
        </div>
      </div>
    </div>
    
  );
}

export default App;
