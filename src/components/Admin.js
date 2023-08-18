import React, { useState } from 'react'
import Tasks from './Tasks'
import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../context/context'

export default function  Admin() {

    let allMembers = JSON.parse(localStorage.getItem('allMembers' || '[]'))
    const data = allMembers.filter(i => i.member === 'user')
    const [task, setTask] = useState('')
    const [user, setUser] = useState(data[0].username)
    const adminMember = JSON.parse(localStorage.getItem('adminMember') || '[]')
    const navigate = useNavigate()
    const {setApprender} = useProductContext()

    const addTodo = ()=>{
        if(!task) return alert('please write task')
        const todo = {
            'task': task,
            'status': 'pending'
        }
        let userTodos = allMembers.find(i => i.username === user)
        userTodos.tasks.push(todo)
        localStorage.setItem('allMembers', JSON.stringify(allMembers))
        setTask('')
    }
  return (
    <div className='admin'>
        <div className="admin-task-assign">
            <input type="text" value={task} onChange={e => setTask(e.target.value)} />
            <select value={user} onChange={e => setUser(e.target.value)}>
                { data.map((item, index) => <option key={index}>{item.username}</option>)}
            </select>
            <button onClick={addTodo}>assign task</button>
        </div>
        <div>
            <Tasks />
        </div>
        <button
         className='logout'
         onClick={()=>{
            adminMember.splice(0, 1)
            localStorage.setItem('adminMember', JSON.stringify(adminMember))
            setApprender(prev => !prev)
            return navigate('/login')
        }}>Logout</button>
    </div>
  )
}
