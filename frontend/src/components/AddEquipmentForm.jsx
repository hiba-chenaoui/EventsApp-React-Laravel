import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'; 

import { AppContext } from "../context/AppContext";
import '../styles/AddEquipmentForm.css';

export default function AddEquipmentForm({onSubmit, onCancel}) {
     const {token} = useContext(AppContext);
     const navigate = useNavigate();
     const [imagePreview, setImagePreview] = useState(null);

     const [formData, setFormData] = useState({
        title: '',
        price: '',
        quantity: '',
        image: null
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
   };
  

    const handleCancel = () => {
    setFormData({ title: '', price: '', image: '' });
    setImagePreview(null);
     if (onCancel) {
        onCancel();
        }
    };

    return (
        <div className="form-content">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Equipment Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="form-input"
              placeholder="Enter equipment name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="form-input"
              placeholder="Enter price"
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="form-input"
              placeholder="Enter quantity"
              min="1"
              step="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Equipment Image</label>
            {/* Optional: You can use a URL input or file upload
            <input
              type="file"
              id="image"
              name="image"
              className="form-input"
              onChange={handleImageChange}
              accept="image/*"
              disabled={loading}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
            
            */}
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleInputChange}
              className="form-input"
            />
         
            
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="submit-btn"
              disabled={loading || !formData.title || !formData.price}
              onClick={() => onSubmit(formData)}
            >
              {loading ? 'Adding...' : 'Add Equipment'}
            </button>
          </div>
        </div>
        </div>
    )

}