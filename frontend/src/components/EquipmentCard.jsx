
import { useState, useEffect } from "react";
import { Camera, Edit , X, Save} from 'lucide-react';

const EquipmentCard = ({ equipment , onSave}) => {

const [isEditing, setIsEditing] = useState(false);
const [formData, setFormData] = useState({
    title: equipment.title,
    price: equipment.price,
    quantity: equipment.quantity ,
  });


const handleSave = () => {
  onSave({ ...equipment, ...formData });
  setIsEditing(false);
};


return(
  <div className="space-card">
    <div className="equipment-image-container">
      {equipment.image ? (
        <img
          src={equipment.image}
          alt={equipment.title}
          className="space-image"
        />
      ) : (
        <div className="space-placeholder">
          <Camera size={32} />
          <span>Add Photo</span>
        </div>
      )}
      <div className="space-actions-overlay">
       {!isEditing ? (
        <button className="action-btn" title="Edit" 
          onClick={() => setIsEditing(true)}
        >
          <Edit size={16} 
            
          />
        </button>
       ):(
          <>
            <button
                className="action-btn"
                title="Save"
                onClick={handleSave}
            >
                <Save size={16} />
            </button>
            <button
                className="action-btn"
                title="Cancel"
                onClick={() => {
                setFormData({ title: equipment.title, price: equipment.price });
                setIsEditing(false);
                }}
            >
                <X size={16} />
            </button>
          </>
       )}
      </div>
    </div>
    <div className="space-content">
     {isEditing ?(
         <>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="form-input"
            />
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="form-input"
            />
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="form-input"
            />
          </>
     ):(
        <>
            <h3>{equipment.title}</h3>
            <div className="space-pricing">
                <span className="price-main">${equipment.price}</span>
            </div>
            <div className="space-pricing">
                <span className="quantity">{equipment.quantity} Pcs</span>
            </div>
        </>
     )}
    </div>
  </div>
);
}
export default EquipmentCard;
