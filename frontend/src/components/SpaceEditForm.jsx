// SpaceEditForm.jsx
import { Save, X, Upload } from 'lucide-react';

const SpaceEditForm = ({
  spaceForm,
  setSpaceForm,
  saving,
  handleSaveSpace,
  cancelEdit,
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
    
    <div className="edit-form-actions">
      <button
        className={`edit-save ${saving ? 'disabled' : ''}`}
        onClick={handleSaveSpace}
        disabled={saving}
      >
        <Save size={16} />
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      <button className="edit-cancel" onClick={cancelEdit} disabled={saving}>
        <X size={16} />
        Cancel
      </button>
    </div>
  </div>
);

export default SpaceEditForm;
