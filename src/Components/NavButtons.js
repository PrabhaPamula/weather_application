import React from 'react'

export const NavButtons = ({setQuery}) => {
    const cities = [
        {
            id: 1,
            title: 'London'
        },
        {
            id: 2,
            title: 'Sydney'
        },
        {
            id: 3,
            title: 'Tokyo'
        },
        {
            id: 4,
            title: 'Toronto'
        },
        {
            id: 5,
            title: 'Paris'
        }
    ]
  return (
    <div className='flex items-center justify-between p-3 m-auto w-1/2'>
        {cities.map((city) => (
            <button key = {city.id} 
                className='text-lg font-medium text-slate-500'
                onClick={() => setQuery({q: city.title})}
            >
                {city.title}
            </button>
        ))}
    </div>
  )
}
