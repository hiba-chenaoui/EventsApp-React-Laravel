import React from "react";
import "./Card.css";

function Card({ image, title, description, date, time, location }) {
  return (
    <div className="card">
      <img className="card-image" src={image} alt={title} />

      <div className="card-content">
        <h2 className="card-title">{title}</h2>

        <p className="card-description">{description}</p>

        <div className="card-info">
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Location:</strong> {location}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
