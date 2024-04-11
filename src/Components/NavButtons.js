import React, { useState } from 'react'
import {RiDashboardFill} from 'react-icons/ri'
import {BsChevronDown} from 'react-icons/bs'

export const NavButtons = ({setQuery, open}) => {

    const menus = [
        {
            title: "Quick searches",
            submenu: true,
            submenuItems : [
                {title: "London"},
                {title: "Sydney"},
                {title: "Tokyo"},
                {title:"Paris"},
            ]
        }
    ];

    const [submenuOpen, setSubmenuOpen] = useState(false);
  return (
    <div className='flex flex-col '>

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
                        <li key={index} className='text-slate-700 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-lime-200 rounded-md' onClick={() => setQuery({q: submenuItem.title})}>
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
