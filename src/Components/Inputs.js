import React from 'react'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import {SlLocationPin} from 'react-icons/sl'
import {RiDashboardFill} from 'react-icons/ri'
import {BsChevronDown} from 'react-icons/bs'
import { IoLocationSharp } from "react-icons/io5";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Inputs = ({setQuery, units, setUnits, open, setOpen}) => {
  const [city, setCity] = useState("");
  const [submenuOpen, setSubmenuOpen] = useState(false);

  
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

  const handleUnits = (selectedUnit) => {
    // const selectedUnit = e.currentTarget.name;
    if(units !== selectedUnit) setUnits(selectedUnit);
  };

  const menus = [
    {
      title: "Weather units",
      submenu: true,
      submenuItems:  [
        {title: "Degree Celcius", unit: 'metric'},
        {title: "Fahernite", unit: 'imperial'},
      ]
    }
  ];

  return (
    <div className='flex flex-col py-3'>
        <div className='flex flex-row  items-center py-2 px-2'>
            <input
              value={city}
              onChange={(e) => setCity(e.currentTarget.value)}
             type='text' placeholder='Search...'  className={`w-full border-b-2 border-slate-400 bg-transparent font-light p-2 focus:outline-none capitalize placeholder:lowercase ${!open && "hidden"}`}/>

            <AiOutlineSearch 
              size={25} 
              className="cursor-pointer transition ease-out hover:scale-125"
              onClick={handleSearchClick} 
            />
        </div>

        <div className='text-sm text-slate-500 flex items-center gap-x-4 cursor-pointer p-2 mt-4 hover:bg-lime-200 rounded-md' onClick={handleLocationClick}>
          <span  className='text-2xl block float-left'><IoLocationSharp/></span>
          <span className={`font-medium flex-1 text-black duration-200 ${!open && "hidden"}`}>Weather by Location</span>
        </div>

        <ul className='pt-2'>
          {menus.map((menu, index) => (
            <>
            <li key={index} className='text-sm text-slate-500 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-lime-200 rounded-md'>
              <span className='text-2xl block float-left'>
                <RiDashboardFill/>
              </span>
              <span className={`font-medium flex-1 text-black duration-200 ${!open && "hidden"}`}>
                {menu.title}
              </span>
              {menu.submenu && open && (
                <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() => { setSubmenuOpen(!submenuOpen)}}/>
              )}

            </li>

            {menu.submenu && submenuOpen && open && (
                <ul>
                    {menu.submenuItems.map((submenuItem, index) => (
                        <li key={index} className='text-slate-500 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-lime-200 rounded-md' onClick={() => handleUnits(submenuItem.unit)}>
                            {submenuItem.title}
                        </li>
                    ))}
                </ul>
            )}

            </>

          ))}
        </ul>

    </div>
  )
}
