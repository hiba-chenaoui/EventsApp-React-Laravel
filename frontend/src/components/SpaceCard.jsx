// SpaceCard.jsx
import { Edit, MapPin, Users, Calendar, Camera } from 'lucide-react';
import Amenities from './Amenities';
import SpaceEditForm from './SpaceEditForm';

const SpaceCard = ({
  space,
  index,
  editingSpace,
  spaceForm,
  setSpaceForm,
  handleEditSpace,
  handleSaveSpace,
  cancelEdit,
  saving,
  handleImageUpload,
  onViewBookings,
  getAmenityIcon,
}) => (
  <div className="space-card">
    <div className="space-image-container">
      {space.images && space.images.length > 0 ? (
        <img src={space.images[0]} alt={space.name} className="space-image" />
      ) : (
        <div className="space-placeholder">
          <Camera size={32} />
          <span>Add Photos</span>
        </div>
      )}
      <div className="space-actions-overlay">
        <button className="action-btn" title="Edit" onClick={() => handleEditSpace(space, index)}>
          <Edit size={16} />
        </button>
      </div>
    </div>

    <div className="space-content">
      {editingSpace === index ? (
        <SpaceEditForm
          spaceForm={spaceForm}
          setSpaceForm={setSpaceForm}
          saving={saving}
          handleSaveSpace={handleSaveSpace}
          cancelEdit={cancelEdit}
          handleImageUpload={handleImageUpload}
          index={index}
        />
      ) : (
        <>
          <div className="space-type-badge">{space.type_of_space}</div>
          <div className="space-header">
            <div className="space-title">
              <h3 className="space-name">{space.name}</h3>
              <div className="space-location">
                <MapPin size={12} />
                {space.address}
              </div>
            </div>
          </div>

          <div className="space-specs">
            <div className="spec-item">
              <Users size={14} />
              <span>Up to {space.capacity} guests</span>
            </div>
          </div>

          <Amenities amenities={space.amenities} />

          <div className="space-pricing">
            <div>
              <span className="price-main">${space.price_per_hour}/hour</span>
              <span className="price-alt">${space.price_per_day}/day</span>
            </div>
          </div>

          <div className="space-actions-bottom">
            <button className="btn-reserve" onClick={() => onViewBookings(space.id)}>
              <Calendar size={16} />
              View Bookings
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);

export default SpaceCard;
