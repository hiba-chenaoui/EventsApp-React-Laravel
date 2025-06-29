import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import NavBar from "../components/navBar";
import Register from "../components/register";
import Login from "../components/login";
import welcomeImage from "../assets/welcome-image.jpg";
import "./Welcome.css";
import Card from "../components/Card";
import FeaturesSection from "../components/FeaturesSection";

const Welcome = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(null); 

  useEffect(() => {
    fetch("http://localhost:8000/api/events") // Make sure this matches your Laravel API route
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []); // Adjust if your backend returns a different structure
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
      });
  }, []);

  return (
    <>
      <BackgroundWrapper image={welcomeImage}>
        <NavBar setForm={setForm} />
        {form ==="Register" && <Register/> }
        {form==="Login" && <Login/>}

        <div className="welcome-content">
          <h1 className="slogan">
            Gather with Purpose <br /> Heal Through Community
          </h1>
          <br />
          <br />
          <a href="#events" className="cta-button">
            Explore Events
          </a>
        </div>
      </BackgroundWrapper>

      <FeaturesSection />
      <hr color="yellow" />
      <br />
      <br />

      <p className="eventsection">Upcoming Events</p>
      <div className="card-container">
        {events.length > 0 ? (
          events.map((event) => (
            <Card
            key={event.id}
            image={event.image ? `http://localhost:8000/storage/${event.image}` : "/default.jpg"}
            title={event.title}
            description={event.description}
            date={event.date}
            time={event.time}
            location={event.location}
          />
          
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No events found.</p>
        )}
      </div>
      <hr color="yellow" />
    </>
  );
};

export default Welcome;
