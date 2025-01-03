import React, { useState, useEffect } from 'react';
import './ConfigureCarousels.css';

function ConfigureCarousels() {
  const [carouselsData, setCarouselsData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [dataToPublish, setDataToPublish] = useState(null);

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
    }
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
      </div>
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
              <strong>Endpoint:</strong> {carousel.endpoint}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConfigureCarousels;