import React, { useState, useEffect } from "react";
import "../styles/Capacity&Availability.css";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function CapacityAndAvailability({ data, updateData, next, prev }) {
  const [capacity, setCapacity] = useState(data.capacity || "");
  const [availability, setAvailability] = useState(() => {
    const defaultAvailability = {};
    daysOfWeek.forEach(day => {
      defaultAvailability[day] = { active: false, open: "", close: "" };
    });
    return data.availability || defaultAvailability;
  });

  useEffect(() => {
    updateData({ capacity, availability });
  }, [capacity, availability]);

  const handleDayToggle = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        active: !prev[day].active
      }
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  return (
    <div className="capacity-availability">
      <div className="form-group">
        <label>How many people can your space accommodate?</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="eg, 50"
        />
      </div>

      <div className="section-header">
        <h3>Availability</h3>
        <p>Set your operating hours per day:</p>
      </div>

      <div className="checkbox-group">
        {daysOfWeek.map(day => (
          <div key={day} className="day-item">
            <input
              type="checkbox"
              id={day}
              checked={availability[day].active}
              onChange={() => handleDayToggle(day)}
            />
            <label htmlFor={day} className="day-label">
              {day.charAt(0).toUpperCase()}
            </label>
            {availability[day].active && (
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="time"
                    value={availability[day].open}
                    onChange={(e) => handleTimeChange(day, "open", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="time"
                    value={availability[day].close}
                    onChange={(e) => handleTimeChange(day, "close", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="prev-next">
            <img className="prev" src="/previous.png" onClick={prev}/>
            <img className="next" src="/next.png" onClick={next}/>
      </div>
</div>
            
  );
}
