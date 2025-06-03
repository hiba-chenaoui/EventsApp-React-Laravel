
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import { useEffect, useState } from "react";
import Layout from './pages/Layout.jsx';
import 'leaflet/dist/leaflet.css';
import Home from './pages/Home.jsx';
import Profile from './pages/profile.jsx';

import './styles/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={<Profile/>}/>

      </Routes>
    </Router>
  );
}
export default App;
