import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProductContext } from '../context/context'

export default function Login() {

    const navigate = useNavigate()
    const {setApprender} = useProductContext()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let userIndex = JSON.parse(localStorage.getItem('userIndex') || '[]')
    let adminMember = JSON.parse(localStorage.getItem('adminMember') || '[]')

    const handleLogin = e =>{
        e.preventDefault()
        let validUser = JSON.parse(localStorage.getItem('allMembers')).some(data => data.email === email && data.password === password)
        let allUsers = JSON.parse(localStorage.getItem('allMembers')).filter(data => data.email === email && data.password === password)
        const isAdmin = allUsers.map(i => i.member)[0]

        if (!validUser) {
            return alert('invalid username or password')
        } else{
            if (isAdmin === 'admin') {
                if(adminMember.length > 0) adminMember.splice(0)
                adminMember.push(email)
                localStorage.setItem('adminMember', JSON.stringify(adminMember))
                setEmail('')
                setPassword('')
                setApprender(prev => !prev)
                return navigate('/admin')
            } else {
                let user = JSON.parse(localStorage.getItem('allMembers')).findIndex(data => data.email === email && data.password === password)
                if(userIndex.length > 0) userIndex.splice(0)
                userIndex.push(user)
                localStorage.setItem('userIndex', JSON.stringify(userIndex))
                setEmail('')
                setPassword('')
                setApprender(prev => !prev)
                return navigate('/user')
            }
        }

    }
  return (
    <div className='login'>
        <form onSubmit={handleLogin} className='login-form'>
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' />
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password' />
            <input type="submit" value="submit" />
        </form>
        <div>
            <span>not registered yet? </span>
            <Link to={'/'}> register</Link>
        </div>
    </div>
  )
}
