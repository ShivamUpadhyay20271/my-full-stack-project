import React from 'react'
import { NavLink } from 'react-router'

export default function Navbar() {
  return (
    <nav className='h-16 bg-blue-800 text-white flex justify-between items-center px-4'>
        <div>My App</div>
        <NavLink to={'/profile'} className='border-2 px-2 py-1.5 rounded-full cursor-pointer hover:bg-gray-500'>Profile </NavLink>
        <NavLink to={'/register'} className='border-2 px-2 py-1.5 rounded-full cursor-pointer hover:bg-gray-500'>Register </NavLink>
    </nav>
  )
}
