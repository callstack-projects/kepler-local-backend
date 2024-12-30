import React, { useState, useEffect } from 'react';
import { documentaries, teams, suggestedforyou, livestreams } from '../contentTypes';
import './ConfigureDetails.css';

function ConfigureDetails() {
  const [detailsData, setDetailsData] = useState(null);
  const [selectedSection, setSelectedSection] = useState('');
  const [contentTypeData, setContentTypeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5001/detailslayout')
      .then(response => response.json())
      .then(data => setDetailsData(data));
  }, []);

  const handleSectionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSection(selectedValue);
    
    const contentTypeMap = {
      'documentaries': documentaries,
      'teams': teams,
      'suggestedforyou': suggestedforyou,
      'livestreams': livestreams
    };

    setContentTypeData(contentTypeMap[selectedValue]);
  };

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nestedData = detailsData?.detailslayout;

  return (
    <div className="configure-details">
      <h1>Configure Details</h1>
      <div className="two-column-layout">
        {/* Left Column */}
        <div className="left-column">
          {nestedData && (
            <div>
              <h2>Details Layout</h2>
              
              <select 
                value={selectedSection} 
                onChange={handleSectionChange}
                className="section-dropdown"
              >
                <option value="">Select a section</option>
                {nestedData?.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.layout_type}
                  </option>
                ))}
              </select>

              {selectedSection && contentTypeData && (
                <div className="content-fields">
                  <h3>Content Type Fields:</h3>
                  <div className="fields-grid">
                    {Object.entries(contentTypeData).map(([fieldName, fieldType]) => (
                      <div key={fieldName} className="field-item">
                        {typeof fieldType === 'string' && (
                          <p>
                            <strong>{fieldName}:</strong> 
                            {fieldType}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="right-column">
          <button 
            className="add-item-button"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Item</h2>
            <div className="modal-body">
              {/* Add your form fields here */}
              <p>Modal content goes here</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button cancel" onClick={closeModal}>Cancel</button>
              <button className="modal-button save">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfigureDetails;
