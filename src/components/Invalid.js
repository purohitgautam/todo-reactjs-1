import React from 'react'
import { Link } from 'react-router-dom'

export default function Invalid() {
  return (
    <div>
      <p>Invalid URL</p> 
      <Link to={'/'}>Go To Home</Link> 
      </div>
  )
}
