// SpaceEditForm.jsx
import { Save, X, Upload } from 'lucide-react';

const SpaceEditForm = ({
  spaceForm,
  setSpaceForm,
  saving,
  handleSaveSpace,
  cancelEdit,
  handleImageUpload,
  index
}) => (
  <div className="edit-form">
    <div className="form-group">
      <label>Space Name</label>
      <input
        type="text"
        value={spaceForm.name}
        onChange={(e) => setSpaceForm({ ...spaceForm, name: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>Guests Number</label>
      <input
        type="number"
        value={spaceForm.capacity}
        onChange={(e) => setSpaceForm({ ...spaceForm, capacity: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>Price/Hour</label>
      <input
        type="number"
        value={spaceForm.price_per_hour}
        onChange={(e) => setSpaceForm({ ...spaceForm, price_per_hour: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>Price/Day</label>
      <input
        type="number"
        value={spaceForm.price_per_day}
        onChange={(e) => setSpaceForm({ ...spaceForm, price_per_day: e.target.value })}
      />
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
      <button className="btn-cancel" onClick={cancelEdit} disabled={saving}>
        <X size={16} />
        Cancel
      </button>
    </div>
  </div>
);

export default SpaceEditForm;
