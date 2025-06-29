import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/profile.jsx';
import { EventCartProvider } from "../src/Context/EventCartContext.jsx";

import './styles/style.css';

function App() {
  return (
    <EventCartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </EventCartProvider>
  );
}

export default App;
