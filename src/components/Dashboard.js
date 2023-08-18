import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/context";
import Tasks from "./Tasks";
import Logout from "./Logout";

export default function Dashboard() {
  
    const navigate = useNavigate()
  const {setApprender} = useProductContext()

  let userIndex = JSON.parse(localStorage.getItem('userIndex'))
  let user =  userIndex[userIndex.length - 1]

  let allMembers = JSON.parse(localStorage.getItem('allMembers') || '[]')
  const [completed, setCompleted] = useState(false)
  const [handleDelete, setHandleDelete] = useState(false)
    const data = allMembers.filter(i => i.member === 'user')
    const [task, setTask] = useState('')
    const [users, setUsers] = useState(data[0].username)
    const adminMember = JSON.parse(localStorage.getItem('adminMember') || '[]')
    const admin = allMembers[userIndex].member
    console.log(admin);

    const addTodo = ()=>{
        if(!task) return alert('please write task')
        const todo = {
            'task': task,
            'status': 'pending'
        }
        let userTodos = allMembers.find(i => i.username === users)
        userTodos.tasks.push(todo)
        localStorage.setItem('allMembers', JSON.stringify(allMembers))
        setTask('')
    }

  return (
    <div>
      {admin === "admin" ? (
        <div className="admin">
          <div className="admin-task-assign">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <select value={users} onChange={(e) => setUsers(e.target.value)}>
              {data.map((item, index) => (
                <option key={index}>{item.username}</option>
              ))}
            </select>
            <button onClick={addTodo}>assign task</button>
          </div>
          <div>
            <Tasks />
          </div>
          <Logout />
        </div>
      ) : (
        <div className="task-user">
          <p>welcome {allMembers[user].username}</p>
          {allMembers[user].tasks.length > 0 ? (
            allMembers[user].tasks.map((item, index) => (
              <div key={index} className="user-task">
                <span
                  onDoubleClick={() => {
                    if (item.status === "completed") {
                      item.status = "pending";
                    } else {
                      item.status = "completed";
                    }

                    localStorage.setItem(
                      "allMembers",
                      JSON.stringify(allMembers)
                    );
                    setCompleted((prev) => !prev);
                  }}
                  style={
                    item.status === "completed"
                      ? { textDecoration: "line-through" }
                      : {}
                  }
                >
                  {item.task}
                </span>
                <button
                  onClick={() => {
                    allMembers[user].tasks.splice(index, 1);
                    localStorage.setItem(
                      "allMembers",
                      JSON.stringify(allMembers)
                    );
                    setHandleDelete((prev) => !prev);
                  }}
                >
                  x
                </button>
              </div>
            ))
          ) : (
            <span>no task assign to you</span>
          )}
          <Logout />
        </div>
      )}
    </div>
  );
}
