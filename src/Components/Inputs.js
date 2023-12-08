import React from 'react'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import {SlLocationPin} from 'react-icons/sl'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Inputs = ({setQuery, units, setUnits}) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if(city !== '') setQuery({q: city})
  }

  const handleLocationClick = () => {
    if(navigator.geolocation) {
      toast.info('Fetching users location.')
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched!')
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnits = (e) => {
    const selectedUnit = e.currentTarget.name;
    if(units !== selectedUnit) setUnits(selectedUnit);
  };

  return (
    <div className='flex flex-row justify-center p-3'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input
              value={city}
              onChange={(e) => setCity(e.currentTarget.value)}
             type='text' placeholder='Search...' className='text-xl border-b-2 border-slate-400 font-light p-2 w-full focus:outline-none capitalize placeholder:lowercase'/>

            <AiOutlineSearch 
              size={25} 
              className='cursor-pointer transition ease-out hover:scale-125' 
              onClick={handleSearchClick}
            />

            <SlLocationPin 
              size={20} 
              className='cursor-pointer transition ease-out hover:scale-125' 
              onClick={handleLocationClick}
            />
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='metric' className='text-xl font-light transition ease-out hover:scale-125' onClick={handleUnits}>
              °C
            </button>
            <p className='text-xl mx-1'>|</p>
            <button name='imperial' className='text-xl font-light transition ease-out hover:scale-125' onClick={handleUnits}>°F</button>
        </div>
    </div>
  )
}
