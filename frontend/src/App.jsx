import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/profile.jsx';
import './styles/style.css';
function App() {
    

    return (
        <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>}/>
        </Routes>

        </BrowserRouter>
        
    );
}

export default App;
