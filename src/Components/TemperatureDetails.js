import React from 'react'
import {FaTemperatureHalf} from 'react-icons/fa6'
import {BiDroplet} from 'react-icons/bi'
import {WiWindy} from 'react-icons/wi'
import {FiSun} from 'react-icons/fi'
import {PiSunHorizonBold} from 'react-icons/pi'
import {FiArrowUp} from 'react-icons/fi'
import {FiArrowDown} from 'react-icons/fi'
import { formatToLocalTime, iconUrlFromCode } from '../WeatherService'

export const TemperatureDetails = ({weather : {details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like,timezone}}) => {
  return (
    <div>
        <div className='flex items-center justify-center py-6 text-3xl text-cyan-300'>
            <p>{details}</p>
        </div>
        <div  className='flex flex-row item-center justify-between px-6 text-white py-3'>
            <img src={iconUrlFromCode(icon)} className='w-32'/>
                <p className='text-7xl mt-5'>{`${temp.toFixed()}`}°</p>
            

            <div className='flex flex-col space-y-2 justify-center'>
                <div className='flex font-light text-sm items-center justify-center'>
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

        <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-6'>
            <FiSun/>
            <p className='font-light'>Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
            <p className='font-light'>|</p>

            <PiSunHorizonBold/>
            <p className='font-light'>Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
            <p className='font-light'>|</p>

            <FiArrowUp/>
            <p className='font-light'>High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}`}°</span></p>
            <p className='font-light'>|</p>

            <FiArrowDown/>
            <p className='font-light'>Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}`}°</span></p>
        </div> 
    </div>
  )
}
