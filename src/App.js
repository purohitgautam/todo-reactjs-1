import './App.css';
import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Admin from './components/Admin';
import User from './components/User';
import Invalid from './components/Invalid';
import Navbar from './components/Navbar';
import { useProductContext } from './context/context';

function App() {

  const{ setApprender } = useProductContext()
  useEffect(()=>{
    console.log('hello');
  },[setApprender])

  const userIndex = JSON.parse(localStorage.getItem('userIndex'))
  const adminMember = JSON.parse(localStorage.getItem('adminMember') || '[]')
  console.log(userIndex, adminMember);

  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          {adminMember.length > 0 && <Route path='/admin' element={<Admin />} />}
          {userIndex.length > 0 && <Route path='/user' element={<User />} />}
          <Route path='*' element={<Invalid />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
