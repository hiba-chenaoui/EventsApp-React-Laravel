import React, { useState, useEffect, useCallback } from "react";
import { useEventCart } from "../Context/EventCartContext";

const BookingModal = ({ space, type, onClose }) => {
  const { addToCart } = useEventCart();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Prevent background scroll when modal opens
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scroll when modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleConfirm = useCallback(() => {
    if (!date || !startTime || !endTime) {
      alert("Please select a date and both start/end times.");
      return;
    }

    const itemWithSchedule = {
      ...space,
      bookingDate: date,
      bookingStartTime: startTime,
      bookingEndTime: endTime,
    };

    addToCart(itemWithSchedule, type);
    handleClose();
  }, [date, startTime, endTime, space, type, addToCart]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Small delay to allow for close animation
    setTimeout(() => {
      onClose();
    }, 100);
  }, [onClose]);

  // Handle backdrop click - only close if clicking directly on overlay
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  // Prevent re-rendering issues
  const modalKey = `modal-${space.id || space.name}`;

  return (
    <div 
      key={modalKey}
      className={`modal-overlay ${isClosing ? 'closing' : ''}`} 
      onClick={handleBackdropClick}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Select Booking Time for <br /><span className="space-name-highlight">{space.name}</span></h3>
          <button 
            className="modal-close-btn" 
            onClick={handleClose} 
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>

        <div className="modal-form">
          <div className="form-group">
            <label htmlFor={`date-${modalKey}`}>Date:</label>
            <input 
              id={`date-${modalKey}`}
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`start-${modalKey}`}>Start Time:</label>
            <input 
              id={`start-${modalKey}`}
              type="time" 
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label htmlFor={`end-${modalKey}`}>End Time:</label>
            <input 
              id={`end-${modalKey}`}
              type="time" 
              value={endTime} 
              onChange={(e) => setEndTime(e.target.value)}
              min={startTime}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button 
            onClick={handleConfirm} 
            className="btn-confirm"
            type="button"
          >
            Confirm Booking
          </button>
          <button 
            onClick={handleClose} 
            className="btn-cancel"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;