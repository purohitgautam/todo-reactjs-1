import './App.css';
import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Invalid from './components/Invalid';
import Navbar from './components/Navbar';
import { useProductContext } from './context/context';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

function App() {

  const{ setApprender } = useProductContext()
  useEffect(()=>{
    console.log('hello');
  },[setApprender])

  const userIndex = JSON.parse(localStorage.getItem('userIndex') || '[]')
  console.log(userIndex);

  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute userIndex={userIndex} />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='*' element={<Invalid />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
