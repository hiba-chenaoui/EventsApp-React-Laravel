import React, { useState } from "react";
import { useEventCart } from "../Context/EventCartContext";
import EventFinalForm from "./EventFinalForm";
import "../styles/CartDrawer.css"; // Assuming you have some styles for the drawer

const CartDrawer = ({ onClose }) => {
  const { cart, clearCart } = useEventCart();
  const items = [...cart.spaces, ...cart.food, ...cart.equipment];
  const [showFinalForm, setShowFinalForm] = useState(false);

  const total = items.reduce((sum, item) => {
    return sum + (item.price_per_day || item.price_per_hour || 0);
  }, 0);

  const handleFinalSubmit = async (eventData) => {
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    formData.append("organizer_id", 1); // TODO: use real user ID
    if (eventData.image) {
      formData.append("image", eventData.image);
    }
    formData.append("items", JSON.stringify(
      items.map(item => ({
        service_id: item.id,
        name: item.name,
        type: item.type || "space",
        booking_date: item.bookingDate,
        start_time: item.bookingStartTime,
        end_time: item.bookingEndTime,
        price: item.price_per_day || item.price_per_hour,
      }))
    ));

    const response = await fetch("http://localhost:8000/api/events", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      alert("🎉 Event created successfully!");
      clearCart();
      onClose();
    } else {
      alert("Something went wrong submitting the event.");
    }
  };

  if (showFinalForm) {
    return <EventFinalForm onSubmit={handleFinalSubmit} onCancel={onClose} />;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Review Your Booking</h3>
        {items.map((item, i) => (
          <div key={i}>
            <strong>{item.name}</strong><br />
            {item.bookingDate} — {item.bookingStartTime} to {item.bookingEndTime}
            <p>${item.price_per_day || item.price_per_hour}</p>
            <hr />
          </div>
        ))}
        <p><strong>Total: ${total}</strong></p>
        <button onClick={() => setShowFinalForm(true)}>Confirm & Continue</button>
      </div>
    </div>
  );
};

export default CartDrawer;
