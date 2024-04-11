import React from 'react'
import {FaTemperatureHalf} from 'react-icons/fa6'
import {BiDroplet} from 'react-icons/bi'
import {WiWindy} from 'react-icons/wi'
import {FiSun} from 'react-icons/fi'
import {PiSunHorizonBold} from 'react-icons/pi'
import {FiArrowUp} from 'react-icons/fi'
import {FiArrowDown} from 'react-icons/fi'
import { formatToLocalTime, iconUrlFromCode } from '../WeatherService'
import '../App.css'

export const TemperatureDetails = ({weather : {details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like,timezone}}) => {
  return (
    <>
    <div>
        <div className='flex items-center justify-center  text-3xl text-cyan-300'>
            <p>{details}</p>
        </div>
        <div  className='main-temp flex flex-row item-center justify-center m-auto px-6 text-white '>
            <img src={iconUrlFromCode(icon)} className='w-32'/>
            <p className='text-7xl mt-5'>{`${temp.toFixed()}`}°</p>
        </div>
        <div className='more-weather-info flex flex-row mt-5 mb-5 text-white justify-center space-x-4'>
            <div className='flex font-light text-sm items-center justify-center mx-2'>
                <FaTemperatureHalf size={18} className='mr-1'/>
                Real fell:
                <span className='font-medium ml-1'>{`${feels_like.toFixed()}`}°</span>
            </div>
            <div className='flex font-light text-sm items-center justify-center'>
                <BiDroplet size={18} className='mr-1'/>
                Humidity:
                <span className='font-medium ml-1'>{`${humidity.toFixed()}`}%</span>
            </div>
            <div className='flex font-light text-sm items-center justify-center'>
                <WiWindy size={18} className='mr-1'/>
                Wind:
                <span className='font-medium ml-1'>{`${speed.toFixed()}`} km/hr</span>
            </div>
        </div> 
    </div> 

    </>
  )
}
