import React, { useState } from 'react';
import './AddItemModal.css';

function AddItemModal({ isOpen, onClose, allData, selectedSection }) {
  const [selectedType, setSelectedType] = useState('');
  
  const itemTypes = ['container', 'text', 'image'];
  
  const getConfigItems = (type) => {
    // This will be populated with actual config items from configDetails
    const configMap = {
      container: ['header', 'footer', 'sidebar'],
      text: ['title', 'paragraph', 'label'],
      image: ['banner', 'logo', 'icon']
    };
    return configMap[type] || [];
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Item</h2>
        <div className="modal-body">
          <div className="form-group">
            <label>Select Type:</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="modal-select"
            >
              <option value="">Choose type...</option>
              {itemTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {selectedType && (
            <div className="form-group">
              <label>Select Configuration:</label>
              <select className="modal-select">
                <option value="">Choose configuration...</option>
                {getConfigItems(selectedType).map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="modal-button cancel" onClick={onClose}>Cancel</button>
          <button className="modal-button save">Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;