import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const navLists = ['Home', 'login', 'admin', "user"]
  return (
    <div className='navbar'>
      <span>Todo.app</span>
      <div className="nav-items">
          <ul>
            {navLists.map((navlist, index) => {
              return <NavLink 
                 to={navlist === 'Home' ? '/' : `/${navlist.toLowerCase()}`}
                 key={index}  style={({isActive}) => ({color: isActive ? 'rgb(1 173 255)' : 'black', textDecoration: 'none'})}
                 className={'navlinks'} >
                  {navlist}
                </NavLink>
          })}
          </ul>
      </div>
    </div>
  )
}
