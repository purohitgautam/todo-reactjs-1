import React, { useState } from 'react'

export default function Tasks() {

    const [renderTasks, setRenderTasks] = useState(false)

    let allMembers = JSON.parse(localStorage.getItem('allMembers' || "[]"))
    let allUsers = allMembers.filter(i => i.member === 'user')

  return (
    <div className='tasks'>
        {
            allUsers.map((item, index) => (
                <div className="user-tasks" key={index}>
                    <span className="username">{item.username}</span>
                    {item.tasks.map((value, i) => <div key={i} className='user-task'>
                        <span
                         onDoubleClick={()=>{
                            if (allUsers[index].tasks[i].status === 'completed') {
                                allUsers[index].tasks[i].status = 'pending'
                            } else {
                                allUsers[index].tasks[i].status = 'completed'
                            }

                            localStorage.setItem('allMembers', JSON.stringify(allMembers))
                            setRenderTasks(prev => !prev)
                         }}
                         style={allUsers[index].tasks[i].status === 'completed' ? {textDecoration: 'line-through'} : {}}
                        >{value.task}</span>
                        <button onClick={()=>{
                            allUsers[index].tasks.splice(i, 1)
                            localStorage.setItem('allMembers', JSON.stringify(allMembers))
                            setRenderTasks(prev => !prev)
                        }}>x</button>
                    </div>)}
                    <button className='deleteUser' onClick={()=>{
                        const email = item.email
                        const emailIndex = allMembers.findIndex(i => i.email === email)
                        allMembers.splice(emailIndex, 1)
                        localStorage.setItem('allMembers', JSON.stringify(allMembers))
                        setRenderTasks(prev => !prev)
                    }}>delete user</button>
                </div>
            ))
        }
    </div>
  )
}
