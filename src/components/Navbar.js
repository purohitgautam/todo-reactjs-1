import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useProductContext } from '../context/context'

export default function Navbar() {
  
  const {setApprender} = useProductContext()
  const navigate = useNavigate()
  const userIndex = JSON.parse(localStorage.getItem('userIndex') || '[]')
  const handleLogout = ()=>{
    userIndex.splice(0);
    localStorage.setItem("userIndex", JSON.stringify(userIndex));
    setApprender((prev) => !prev);
    return navigate("/login")
  }

  return (
    <div className='navbar'>
      <span>Todo.app</span>
      <div className="nav-items">
          <ul>
              <NavLink className={'navlinks'} style={({isActive}) => ({color: isActive ? 'rgb(1 173 255)' : 'black', textDecoration: 'none'})} to={'/'}>Home</NavLink>
              <NavLink className={'navlinks'} style={({isActive}) => ({color: isActive ? 'rgb(1 173 255)' : 'black', textDecoration: 'none'})} to={'/dashboard'}>Dashboard</NavLink>
              {
              userIndex.length > 0 ?
               <button className='logout' onClick={handleLogout}>Logout</button> : 
                <NavLink className={'navlinks'} style={({isActive}) => ({color: isActive ? 'rgb(1 173 255)' : 'black', textDecoration: 'none'})} to={'/login'}>Login</NavLink>
              }
          </ul>
      </div>
    </div>
  )
}
