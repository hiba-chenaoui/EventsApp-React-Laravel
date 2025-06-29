import React, { useState, useCallback } from 'react';
import {
  MapPin,
  Users,
  Camera,
  Calendar,
  Wifi,
  Car,
  Coffee,
  Music,
  Dumbbell,
  Activity
} from 'lucide-react';

import { useEventCart } from '../Context/EventCartContext';
import BookingModal from './BookingModal';
import '../styles/BusinessProfileTest.css';

const getAmenityIcon = (amenity) => {
  const a = amenity.toLowerCase();
  if (a.includes('wifi') || a.includes('internet')) return <Wifi size={14} />;
  if (a.includes('parking') || a.includes('car')) return <Car size={14} />;
  if (a.includes('coffee') || a.includes('tea')) return <Coffee size={14} />;
  if (a.includes('sound') || a.includes('music')) return <Music size={14} />;
  if (a.includes('gym') || a.includes('fitness')) return <Dumbbell size={14} />;
  return <Activity size={14} />;
};

const formatAddress = (address) => {
  if (!address) return '';
  return `${address.street}, ${address.city}, ${address.state}`;
};

const SpaceCard = ({ space, role = "organizer", type = "spaces" }) => {
  const [showModal, setShowModal] = useState(false);

  // Use useCallback to prevent function recreation on every render
  const handleBook = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Prevent any potential event bubbling issues
  const handleCardClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <div className="space-card" onClick={handleCardClick}>
        <div className="space-image-container">
          {space.images && space.images.length > 0 ? (
            <img src={space.images[0]} alt={space.name} className="space-image" />
          ) : (
            <div className="space-placeholder">
              <Camera size={32} />
              <span>Add Photos</span>
            </div>
          )}
        </div>

        <div className="space-content">
          <div className="space-type-badge">{space.type_of_space}</div>

          <div className="space-header">
            <div className="space-title">
              <h3 className="space-name">{space.name}</h3>
              <div className="space-location">
                <MapPin size={12} />
                {formatAddress(space.address)}
              </div>
            </div>
          </div>

          <div className="space-specs">
            <div className="spec-item">
              <Users size={14} />
              <span>Up to {space.capacity} guests</span>
            </div>
          </div>

          <div className="amenities-grid">
            {space.amenities.slice(0, 6).map((amenity, idx) => (
              <div key={idx} className="amenity-item">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {space.amenities.length > 6 && (
              <div className="amenity-item">
                <span>+{space.amenities.length - 6} more</span>
              </div>
            )}
          </div>

          <div className="space-pricing">
            <div>
              <span className="price-main">${space.price_per_hour}/hour</span>
              <span className="price-alt">${space.price_per_day}/day</span>
            </div>
          </div>

          <div className="space-actions-bottom">
            {role === "organizer" ? (
              <button 
                className="btn-reserve" 
                onClick={handleBook}
                type="button"
              >
                <Calendar size={16} />
                Book Now
              </button>
            ) : (
              <button className="btn-reserve" type="button">
                <Calendar size={16} />
                View Bookings
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Render modal outside of card to prevent positioning issues */}
      {showModal && (
        <BookingModal
          space={space}
          type={type}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default SpaceCard;