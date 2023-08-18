import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Registration() {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [user, setUser] = useState('user')

    const handleRegistration = (e)=>{
        e.preventDefault()
        let allMembers = JSON.parse(localStorage.getItem('allMembers') || '[]')
        if (password !== confirmPassword){
            return alert("Password Does Not Match")
        } else if (allMembers.length && allMembers.some(i => i.email === email)){
            return alert('user already exists')
        } else if (allMembers.length && allMembers.some(i => i.username === username)){
            return alert('username is taken, try another')
        } else{
            let me = {
                'username': username,
                'firstname': firstname,
                'lastname': lastname,
                'email': email,
                'mobile': mobile,
                'password': password,
                'birthdate': birthdate,
                'member': user,
                'tasks': []
            }
            allMembers.push(me)
            localStorage.setItem('allMembers', JSON.stringify(allMembers))

            setUsername('')
            setFirstname('')
            setLastname('')
            setEmail('')
            setMobile('')
            setPassword('')
            setConfirmPassword('')
            setBirthdate('')

            navigate('/login')
        }
    }

  return (
    <div className='registration'>
        <form onSubmit={handleRegistration} className="registration-form">
            <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder='Enter Username' required />
            <input type="text" name="fname" value={firstname} onChange={e => setFirstname(e.target.value)} placeholder='Enter Firstname' required />
            <input type="text" name="lname" value={lastname} onChange={e => setLastname(e.target.value)} placeholder='Enter Lastname' required />
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter Email' required />
            <input type="number" name="mobile" value={mobile} onChange={e => setMobile(e.target.value)} placeholder='Enter Mobile' required />
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter Password' required />
            <input type="password" name="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm Password' required />
            <div className="birthdate">
                <select value={user} onChange={e => setUser(e.target.value)} required>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
            </div>
            <input type="submit" value="Register" />
        </form>
        <div>
            <span>already user? </span>
            <Link to={'/login'}> Login</Link>
        </div>
    </div>
  )
}
