import React, { useState } from 'react';
import { contenTypes } from '../contentTypes';

function AddNewCarousel({ onAdd, onClose }) {
  const [newCarousel, setNewCarousel] = useState({
    carouselTitle: '',
    endpoint: Object.keys(contenTypes)[0], // Set first content type as default
    carouselType: 'card'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedCarousel = {
      id: Date.now(), // Generate unique id
      carouselTitle: newCarousel.carouselTitle,
      carouselType: newCarousel.carouselType,
      endpoint: newCarousel.endpoint
    };
    onAdd(formattedCarousel);
    onClose();
  };

  return (
    <div className="add-carousel-form">
      <h2>Add New Carousel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Carousel Title</label>
          <input
            type="text"
            value={newCarousel.carouselTitle}
            onChange={(e) => setNewCarousel({
              ...newCarousel,
              carouselTitle: e.target.value
            })}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Content Type</label>
          <select
            value={newCarousel.endpoint}
            onChange={(e) => setNewCarousel({
              ...newCarousel,
              endpoint: e.target.value
            })}
            required
          >
            {Object.keys(contenTypes).map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Carousel Type</label>
          <select
            value={newCarousel.carouselType}
            onChange={(e) => setNewCarousel({
              ...newCarousel,
              carouselType: e.target.value
            })}
          >
            <option value="hero">Hero</option>
            <option value="card">Card</option>
            <option value="square">Square</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Add Carousel</button>
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewCarousel;