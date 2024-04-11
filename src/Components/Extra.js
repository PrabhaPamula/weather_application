import React from 'react'
import {FaTemperatureHalf} from 'react-icons/fa6'
import {BiDroplet} from 'react-icons/bi'
import {WiWindy} from 'react-icons/wi'
import {FiSun} from 'react-icons/fi'
import {PiSunHorizonBold} from 'react-icons/pi'
import {FiArrowUp} from 'react-icons/fi'
import {FiArrowDown} from 'react-icons/fi'
import { formatToLocalTime, iconUrlFromCode } from '../WeatherService'
import '../App.css';

export const Extra = ({weather : {details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like,timezone}}) => {
  return (
    <>
   <div className='extra-content flex flex-row items-center justify-between text-sm py-2 gap-3'>
            <div className='extra-card shadow-md basis-1/4 rounded-2xl shadow-gray-400 bg-slate-200 p-4 items-center'>
            <div className='flex flex-col items-center m-auto'>
                <FiSun/>
                <p className='font-light mt-2'>Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
            </div>
           </div>

           <div className='extra-card shadow-md basis-1/4 rounded-2xl shadow-gray-400 bg-slate-200 p-4 items-center'>
            <div className='flex flex-col items-center m-auto'>
           <PiSunHorizonBold/>
           <p className='font-light mt-2'>Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
           </div>
           </div>

           <div className='extra-card shadow-md basis-1/4 rounded-2xl shadow-gray-400 bg-slate-200 p-4 items-center'>
            <div className='flex flex-col items-center m-auto'>
           <FiArrowUp/>
           <p className='font-light mt-2'>High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}`}°</span></p>
           </div>
           </div>

           <div className='extra-card shadow-md basis-1/4 rounded-2xl shadow-gray-400 bg-slate-200 p-4 items-center'>
            <div className='flex flex-col items-center m-auto'>
           <FiArrowDown/>
           <p className='font-light mt-2'>Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}`}°</span></p>
           </div>
           </div>
    </div>

    </>
  )
}
