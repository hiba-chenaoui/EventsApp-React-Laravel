import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper"; 
import Header from "../components/Header";  // Import your header
import welcomeImage from "../assets/welcome-image.jpg"; 
import "./Welcome.css"; // Import your CSS file for Welcome page
import Card from "../components/Card";

const Welcome = () => {
  return (
    <>
    <BackgroundWrapper image={welcomeImage}>
      <Header /> {/* The header will be on top */}
      <div className="welcome-content">
        <h1 className="slogan">Gather with Purpose  <br /> Heal Through Community</h1>
        <br />
        <br />
        <a href="#events" class="cta-button">Explore Events</a>
        {/* Buttons or other components here */}
      </div>
    </BackgroundWrapper>

    <br />
    <br />
<p>Upcoming Events</p>    
<Card />
<Card />
<Card />



  </>
  );
};

export default Welcome;
