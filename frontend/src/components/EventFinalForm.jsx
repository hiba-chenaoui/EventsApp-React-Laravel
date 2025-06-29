import React, { useState } from "react";

const EventFinalForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    if (!title || !description || !date || !time || !location) {
      alert("Please fill in all fields.");
      return;
    }

    onSubmit({ title, description, date, time, location, image });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Enter Event Details</h3>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleSubmit}>Submit Event</button>
          <button onClick={onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventFinalForm;
