import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../context/context'

export default function User() {

  const navigate = useNavigate()
  const {setApprender} = useProductContext()

  let userIndex = JSON.parse(localStorage.getItem('userIndex'))
  let user =  userIndex[userIndex.length - 1]

  let allMembers = JSON.parse(localStorage.getItem('allMembers') || '[]')
  const [completed, setCompleted] = useState(false)
  const [handleDelete, setHandleDelete] = useState(false)

  return (
    <div className='task-user'>
      <p>welcome {allMembers[user].username}</p>
      {
      allMembers[user].tasks.length > 0 ?
      allMembers[user].tasks.map((item, index) => (
         <div key={index} className='user-task'>
          <span
            onDoubleClick={()=>{
              if (item.status === 'completed') {
                  item.status = 'pending'
              } else {
                  item.status = 'completed'
              }

              localStorage.setItem('allMembers', JSON.stringify(allMembers))
              setCompleted(prev => !prev)
          }}
          style={item.status === 'completed' ? {textDecoration: 'line-through'} : {}}
          >{item.task}</span>
          <button onClick={()=>{
              allMembers[user].tasks.splice(index, 1)
              localStorage.setItem('allMembers', JSON.stringify(allMembers))
              setHandleDelete(prev => !prev)
          }}>x</button>
        </div>
      )) : <span>no task assign to you</span>
    }
    <button
     className='logout'
     onClick={()=>{
        userIndex.splice(0, 1)
        localStorage.setItem('userIndex', JSON.stringify(userIndex))
        setApprender(prev => !prev)
        return navigate('/login')
      }}>Logout</button>
    </div>
  )
}
