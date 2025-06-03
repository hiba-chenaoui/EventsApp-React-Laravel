import {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet/hooks';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

export default function LocationPicker({onLocationSelect}){
    const [marker, setMarker] = useState(null);
    const [address, setAddress] = useState(null);

   const getAddressFromCoords = async (lat, lng) => {
    try {
        const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();

        const addr = data.address;

        // Construct address using suburb and city (fallbacks included)
        const suburb = addr.suburb || addr.neighbourhood || "";
        const city = addr.city || addr.town || addr.village || "";

        const shortAddress = [suburb, city].filter(Boolean).join(", ");

        setAddress(shortAddress);
        onLocationSelect({ lat, lng, address: shortAddress });
    } catch (err) {
        console.error("Failed to fetch address:", err);
        setAddress("Could not determine address");
    }
    };


    const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker(e.latlng);
        getAddressFromCoords(lat, lng);
        // Send the coordinates to the parent component   
      }
    });
    return null;
  };

  return (
    <div>
      <MapContainer
        center={[35.6895, -0.1234]}
        zoom={12}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='© OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {marker && <Marker position={marker} />}
      </MapContainer>

      {marker && (
        <p className="location-info">
          
          Address: {address}
        </p>
      )}
    </div>
  );
};
