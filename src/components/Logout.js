import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../context/context'

export default function Logout() {
    const navigate = useNavigate()
    const {setApprender} = useProductContext()
  
    let userIndex = JSON.parse(localStorage.getItem('userIndex'))

  return (
    <button
        className="logout"
        onClick={() => {
        userIndex.splice(0);
        localStorage.setItem("userIndex", JSON.stringify(userIndex));
        setApprender((prev) => !prev);
        return navigate("/login");
        }}
    >
        Logout
    </button>
  )
}
