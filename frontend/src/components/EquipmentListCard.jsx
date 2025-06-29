import React, { useState } from 'react';
import '../styles/EquipmentListCard.css'; 

export default function EquipmentListCard({ data, updateData, prev, onSubmit }) {
  const [equipment, setEquipment] = useState({ title: '', price: '',quantity: '', image: '' });

  const addEquipment = () => {
    if (!equipment.title || !equipment.price || !equipment.image) return;
    updateData([...data, equipment]);
    setEquipment({ title: '', price: '', image: '' });
  };

  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
  };

  return (
    <>
      <h2 className="card-title">Add Your Equipment</h2>
      
      <div className="form-section">
        <div className="input-grid">
          <div className="input-group">
            <input
              type="text"
              placeholder="Equipment Title"
              value={equipment.title}
              onChange={e => setEquipment({ ...equipment, title: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder="Price ($)"
              value={equipment.price}
              onChange={e => setEquipment({ ...equipment, price: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder="Quantity"
              value={equipment.quantity}
              onChange={e => setEquipment({ ...equipment, quantity: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Image URL"
              value={equipment.image}
              onChange={e => setEquipment({ ...equipment, image: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
        <button onClick={addEquipment} className="add-button">
          + Add Equipment
        </button>
      </div>

      <div className="equipment-list">
        <h3 className="list-title">Your Equipments</h3>
        {data.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <p>No equipment added yet!</p>
          </div>
        ) : (
          <ul className="equipment-grid">
            {data.map((eq, idx) => (
              <li key={idx} className="equipment-item">
                <img 
                  src={eq.image} 
                  alt={eq.title} 
                  className="equipment-image"
                  onError={handleImageError}
                />
                <div className="equipment-title">{eq.title}</div>
                <div className="equipment-price">${eq.price}</div>
                <div className="equipment-quantity">{eq.quantity} Pcs</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="navigation-buttons">
        
        <img className="prev" src="/previous.png" onClick={prev} disabled={true}/>
        <button onClick={onSubmit} className="nav-button finish-button">
          Finish Registration →
        </button>
      </div>
    </>
  );
}