import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import Layout from './pages/Layout.jsx';
import 'leaflet/dist/leaflet.css';
import Home from './pages/Home.jsx';
import Profile from './pages/profile.jsx';
import BusinessProfile from './pages/businessProfile.jsx';
import BusinessProfileTest from './pages/businessProfileTest.jsx';

import './styles/style.css';

function App() {
    

    return (
        <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/businessProfile" element={<BusinessProfile/>} />
            <Route path="/businessProfileTest" element={<BusinessProfileTest/>} />
        </Routes>

        </BrowserRouter>
        
    );
}

export default App;
