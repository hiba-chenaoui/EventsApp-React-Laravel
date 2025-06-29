// Amenities.jsx
import { Wifi, Car, Coffee, Music, Dumbbell, Activity } from 'lucide-react';

const getAmenityIcon = (amenity) => {
  const amenityLower = amenity.toLowerCase();
  if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi size={14} />;
  if (amenityLower.includes('parking') || amenityLower.includes('car')) return <Car size={14} />;
  if (amenityLower.includes('coffee') || amenityLower.includes('tea')) return <Coffee size={14} />;
  if (amenityLower.includes('sound') || amenityLower.includes('music')) return <Music size={14} />;
  if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return <Dumbbell size={14} />;
  return <Activity size={14} />;
};

const Amenities = ({ amenities }) => (
  <div className="amenities-grid">
    {amenities && (
    amenities.slice(0, 6).map((amenity, idx) => (
      <div key={idx} className="amenity-item">
        {getAmenityIcon(amenity)}
        <span>{amenity}</span>
      </div>
    )
    ))}
    {amenities && amenities.length > 6 && <div className="amenity-item">+{amenities.length - 6} more</div>}
  </div>
);

export default Amenities;
