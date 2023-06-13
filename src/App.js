import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from './pages/Login';
import Beranda from './pages/Beranda';
import Search from './pages/Search';
import Reels from './pages/Reels';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Komentar from './pages/Komentar';

function App() {
  return (
    <React.Fragment>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/login'/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/beranda'element={<Beranda />}/>
            <Route path='/komentar/:id' element={<Komentar />}/>
            <Route path='/explore'element={<Search />}/>
            <Route path='/reels'element={<Reels />}/>
            <Route path='/message'element={<Messages />}/>
            <Route path='/profile'element={<Profile />}/>
            <Route path='/explore/search'element={<p>tes</p>}/>
            <Route path='*' element={<h1>404 not found</h1>}/>
          </Routes>
        </Router>
    </React.Fragment>
  );
}

export default App;
