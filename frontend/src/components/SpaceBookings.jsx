import React, { useEffect, useState ,useContext} from "react";
import { AppContext } from "../context/AppContext";
import "../styles/SpaceBookings.css"; 

const SpaceBookings = ({ spaceId , onClose }) => {
  const {token} = useContext(AppContext);
  const [bookingsData, setBookingsData] = useState({ bookings: [], space: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/space/${spaceId}/bookings`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookingsData(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [spaceId]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  

  return (
  <div className="bookings-overlay">
    <div className="bookings-container">
         <button onClick={onClose} style={{ float: "right" }} className="close-btn">
                    ✖
         </button>
    {
        bookingsData.bookings.length === 0 ? (
        
          <p className="booking-label">No bookings yet for  <span className="space-name">{bookingsData.space}</span></p>
        ):(
            <>
                <p className="booking-label">Bookings for : <span className="space-name">{bookingsData.space}</span></p>
                <table className="bookings-table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Organizer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingsData.bookings.map((booking) => (
                        <tr key={booking.id}>
                        <td>{booking.booking_date}</td>
                        <td>{booking.start_time}</td>
                        <td>{booking.end_time}</td>
                        <td>{booking.organizer_name ?? "N/A"}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </>

        )
    }
        
    </div>
   </div>
  );
};

export default SpaceBookings;
