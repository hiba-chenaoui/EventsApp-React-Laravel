import { useState } from 'react';
import LocationPicker from './LocationPicker';

export default function SpaceLocationCard({ data, updateData, next, prev }) {
  const [location, setLocation] = useState(null);

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    updateData({ address: loc });
  };

  return (
    <>
      <h3>Space Location</h3>
      <p>Where is your space located?</p>
      <LocationPicker onLocationSelect={handleLocationSelect} />
      {location && (
        <p>
          📍 Selected Location: Latitude {location.lat.toFixed(5)}, Longitude {location.lng.toFixed(5)}
        </p>
      )}
      <div className="prev-next">
            <img className="prev" src="/previous.png" onClick={prev}/>
            <img className="next" src="/next.png" onClick={next}/>
      </div>
    </>
  );
}
