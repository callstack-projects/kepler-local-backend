import React, { useState, useEffect } from 'react';
import './ConfigureCarousels.css';

function ConfigureCarousels() {
  const [carouselsData, setCarouselsData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/carousellayout')
      .then(response => response.json())
      .then(data => setCarouselsData(data));
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

  return (
    <div className="configure-carousels">
      <h1>Configure Carousels</h1>
      <div className="carousels-list">
        {carouselsData && carouselsData.map((carousel, index) => (
            <div key={index} className="carousel-section">
            <div className="carousel-title-label">
                <h2>{carousel.carouselTitle ? carousel.carouselTitle : "No title"}</h2>
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