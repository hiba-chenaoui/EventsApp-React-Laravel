import React, { useEffect, useState } from 'react';
import { Phone, Heart } from 'lucide-react';

import fakeBusinessData from '../fakeData/fakeBusinessData';
import SpaceCard from '../components/SpaceCard';
import '../styles/BusinessProfileTest.css';

const BusinessProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddSpace, setShowAddSpace] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(fakeBusinessData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="loading-container"><p>Loading your spaces...</p></div>;
  if (!data) return <div className="no-data-container"><p>No spaces found.</p></div>;

  const { business, spaces } = data;

  return (
    <div className="space-profile-container">
      {/* Host Header */}
      <div className="host-header">
        <div className="host-info">
          <div className="host-avatar">
            {business.company_name?.charAt(0).toUpperCase()}
          </div>
          <div className="host-details">
            <h1>{business.company_name}</h1>
            <div className="host-meta">
              <div className="host-stat">
                <Heart size={16} />
                <span>{business.business_type}</span>
              </div>
              <div className="host-stat">
                <Phone size={16} />
                <span>{business.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="host-stats">
          <div className="stat-item">
            <span className="stat-number">{spaces.length}</span>
            <div className="stat-label">Wellness Spaces</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">127</span>
            <div className="stat-label">Total Bookings</div>
          </div>
        </div>
      </div>

      {/* Spaces Section */}
      <div className="spaces-section">
        <h2>Your Wellness Spaces</h2>

        <button className="add-space-btn" onClick={() => setShowAddSpace(true)}>
          <span>+</span> Add New Space
        </button>

        {/* {showAddSpace && <NewSpaceWizard />} */}

        <div className="spaces-grid">
          {spaces.map((space, index) => (
            <SpaceCard key={index} space={space} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
