import React, { useState, useEffect } from 'react';
import AddNewCarousel from '../components/AddNewCarousel';
import './ConfigureCarousels.css';
import { contenTypes } from '../contentTypes';

function ConfigureCarousels() {
  const [carouselsData, setCarouselsData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [dataToPublish, setDataToPublish] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  // const [selectedEndpoint, setSelectedEndpoint] = useState('');

  useEffect(() => {
    // Try to load from localStorage first
    const savedData = localStorage.getItem('carouselsConfig');
    if (savedData) {
      setCarouselsData(JSON.parse(savedData));
    } else {
      // Fall back to API if no local data
      fetch('http://localhost:5001/carousellayout')
        .then(response => response.json())
        .then(data => setCarouselsData(data));
    }
  }, []);

  const getCarouselStyle = (type) => {
    switch (type) {
      case 'hero':
        return { width: '300px', height: '200px' };
      case 'card':
        return { width: '120px', height: '180px' };
      case 'square':
        return { width: '150px', height: '150px' };
      default:
        return { width: '150px', height: '100px' };
    }
  };

  const handleTitleEdit = (index, newTitle) => {
    const updatedCarousels = [...carouselsData];
    updatedCarousels[index].carouselTitle = newTitle;
    setCarouselsData(updatedCarousels);
    setEditingIndex(null);
    setHasChanges(true);
  };

  const handleSaveDraft = () => {
    // Save to localStorage with proper JSON formatting
    const formattedData = JSON.stringify(carouselsData, null, 2);
      localStorage.setItem('carouselsConfig', formattedData);
    
      setHasChanges(false);
      setDataToPublish(formattedData);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const response = await fetch('http://localhost:5001/carousellayout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dataToPublish,
      });
      
      if (response.ok) {
        setHasChanges(false);
        localStorage.removeItem('carouselsConfig');
      }
    } catch (error) {
      console.error('Failed to publish:', error);
    } finally {
      setIsPublishing(false);
      setDataToPublish(null);
    }
  };

  const handleAddCarousel = (newCarousel) => {
    setCarouselsData([newCarousel, ...carouselsData]);
    setHasChanges(true);
    setShowAddModal(false);
  };

  const handleRemoveCarousel = (carouselId) => {
    setCarouselsData(carouselsData.filter(carousel => carousel.id !== carouselId));
    setHasChanges(true);
  };

  const handleEndpointChange = (carouselId, newEndpoint) => {
    setCarouselsData(carouselsData.map(carousel => 
      carousel.id === carouselId ? { ...carousel, endpoint: newEndpoint } : carousel
    ));
    setHasChanges(true);
  };

  return (
    <div className="configure-carousels">
      <h1>Configure Carousels</h1>
      <div className="action-buttons">
        <button 
          className="save-draft-button"
          onClick={handleSaveDraft}
          disabled={!hasChanges}
        >
          Save Draft
        </button>
        <button 
          className="publish-button"
          onClick={handlePublish}
          disabled={!dataToPublish || isPublishing}
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
        <button 
          className="add-item-button"
          onClick={() => setShowAddModal(true)}
        >
          Add Item
        </button>
      </div>
      
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddNewCarousel 
              onAdd={handleAddCarousel}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
      
      <div className="carousels-list">
        {carouselsData && carouselsData.map((carousel, index) => (
          <div key={index} className="carousel-section">
            <div className="carousel-title-label">
              {editingIndex === index ? (
                <input
                  type="text"
                  defaultValue={carousel.carouselTitle || ""}
                  onBlur={(e) => handleTitleEdit(index, e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleTitleEdit(index, e.target.value);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <h2 onClick={() => setEditingIndex(index)}>
                  {carousel.carouselTitle ? carousel.carouselTitle : "No title"}
                </h2>
              )}
            </div>
            <div className="endpoint-label">
              <strong>Endpoint:</strong>
              <select 
                value={carousel.endpoint} 
                onChange={(e) => handleEndpointChange(carousel.id, e.target.value)}
              >
                {Object.keys(contenTypes).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            <div className="rectangles-row">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div
                  key={item}
                  className="carousel-rectangle"
                  style={getCarouselStyle(carousel.carouselType)}
                />
              ))}
            </div>
            <button className="remove-button" onClick={() => handleRemoveCarousel(carousel.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}export default ConfigureCarousels;