import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Users, DollarSign, Heart, Calendar, Leaf, Activity, Edit, Eye, Save, X, Check, Star, Wifi, Car, Coffee, Music, Dumbbell, Camera, Upload } from 'lucide-react';
import '../styles/BusinessProfileTest.css';

const BusinessProfileTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddSpace, setShowAddSpace] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);
  const [spaceForm, setSpaceForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch('api/business-space/showAllSpaces', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching spaces:", error);
        setLoading(false);
      });
  }, []);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.street}, ${address.city}, ${address.state}`;
  };

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi size={14} />;
    if (amenityLower.includes('parking') || amenityLower.includes('car')) return <Car size={14} />;
    if (amenityLower.includes('coffee') || amenityLower.includes('tea')) return <Coffee size={14} />;
    if (amenityLower.includes('sound') || amenityLower.includes('music')) return <Music size={14} />;
    if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return <Dumbbell size={14} />;
    return <Activity size={14} />;
  };

  const handleEditSpace = (space, index) => {
    setSpaceForm({
      ...space,
      index: index,
      amenities: space.amenities.join(', '),
      images: space.images || []
    });
    setEditingSpace(index);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload to a service and get URLs back
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSpaceForm({
      ...spaceForm,
      images: [...(spaceForm.images || []), ...imageUrls]
    });
  };

  const removeImage = (indexToRemove) => {
    setSpaceForm({
      ...spaceForm,
      images: spaceForm.images.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSaveSpace = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");

    const spaceData = {
      ...spaceForm,
      amenities: spaceForm.amenities.split(',').map(a => a.trim()).filter(a => a)
    };
    delete spaceData.index;

    try {
      const response = await fetch(`api/business-space/update/${data.spaces[editingSpace].id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(spaceData),
      });

      if (!response.ok) {
        throw new Error("Failed to update space");
      }

      const updatedSpace = await response.json();
      setData(prev => ({
        ...prev,
        spaces: prev.spaces.map((space, index) => 
          index === editingSpace ? updatedSpace : space
        )
      }));
      setEditingSpace(null);
      setSuccessMessage('Space updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error updating space:", error);
      alert('Failed to update space information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-container"><p>Loading your spaces...</p></div>;
  if (!data) return <div className="no-data-container"><p>No spaces found.</p></div>;

  const { business, spaces } = data;

  return (
    <div className="space-profile-container">

      {successMessage && (
        <div className="success-message">
          <Check size={16} />
          {successMessage}
        </div>
      )}

      {/* Host Header */}
      <div className="host-header">
        <div className="host-info">
          <div className="host-avatar">
            {business.company_name.charAt(0).toUpperCase()}
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
          <span>+</span>
          Add New Space
        </button>

        <div className="spaces-grid">
          {spaces.map((space, index) => (
            <div key={index} className="space-card">
              <div className="space-image-container">
                {space.images && space.images.length > 0 ? (
                  <img 
                    src={space.images[0]} 
                    alt={space.name}
                    className="space-image"
                  />
                ) : (
                  <div className="space-placeholder">
                    <Camera size={32} />
                    <span>Add Photos</span>
                  </div>
                )}
                <div className="space-actions-overlay">
                  
                  <button 
                    className="action-btn" 
                    title="Edit"
                    onClick={() => handleEditSpace(space, index)}
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </div>

              <div className="space-content">
                {editingSpace === index ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>Space Name</label>
                      <input
                        type="text"
                        value={spaceForm.name}
                        onChange={(e) => setSpaceForm({...spaceForm, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Space Type</label>
                      <input
                        type="text"
                        value={spaceForm.type_of_space}
                        onChange={(e) => setSpaceForm({...spaceForm, type_of_space: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Capacity</label>
                      <input
                        type="number"
                        value={spaceForm.capacity}
                        onChange={(e) => setSpaceForm({...spaceForm, capacity: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Price per Hour ($)</label>
                        <input
                          type="number"
                          value={spaceForm.price_per_hour}
                          onChange={(e) => setSpaceForm({...spaceForm, price_per_hour: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Price per Day ($)</label>
                        <input
                          type="number"
                          value={spaceForm.price_per_day}
                          onChange={(e) => setSpaceForm({...spaceForm, price_per_day: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="image-upload-section">
                      <label>Photos</label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id={`image-upload-${index}`}
                      />
                      <label htmlFor={`image-upload-${index}`} className="image-upload-btn">
                        <Upload size={24} />
                        <span>Upload Photos</span>
                      </label>
                      
                      {spaceForm.images && spaceForm.images.length > 0 && (
                        <div className="uploaded-images">
                          {spaceForm.images.map((image, imgIndex) => (
                            <div key={imgIndex} className="uploaded-image">
                              <img src={image} alt={`Space ${imgIndex + 1}`} />
                              <button 
                                className="remove-image"
                                onClick={() => removeImage(imgIndex)}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        className={`btn-save ${saving ? 'disabled' : ''}`}
                        onClick={handleSaveSpace}
                        disabled={saving}
                      >
                        <Save size={16} />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button 
                        className="btn-cancel"
                        onClick={() => setEditingSpace(null)}
                        disabled={saving}
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-header">
                      <div className="space-title">
                        <h3 className="space-name">{space.name}</h3>
                        <div className="space-location">
                          <MapPin size={12} />
                          {formatAddress(space.address)}
                        </div>
                      </div>
                      <div className="space-type-badge">
                        {space.type_of_space}
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
                      <button className="btn-reserve">
                        <Calendar size={16} />
                        View Bookings
                      </button>
                     
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileTest;