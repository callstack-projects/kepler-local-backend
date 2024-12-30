import React, { useState, useEffect } from 'react';
import { documentaries, teams, suggestedforyou, livestreams } from '../contentTypes';
import AddItemModal from '../components/AddItemModal';
import './ConfigureDetails.css';
import InteractiveLayout from '../components/InteractiveLayout';

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

  return (
    <div className="configure-details">
      <h1>Configure Details</h1>
      <div className="two-column-layout">
        {/* Left Column */}
        <div className="left-column">
          {detailsData && (
            <div>
              <h2>Details Layout</h2>
              
              <select 
                value={selectedSection} 
                onChange={handleSectionChange}
                className="section-dropdown"
              >
                <option value="">Select a section</option>
                {detailsData?.map(section => (
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
                      {typeof fieldType === 'string' ? (
                        <p>
                          <strong>{fieldName}:</strong> 
                          {fieldType}
                        </p>
                      ) : (
                        <div className="nested-fields">
                          <strong>{fieldName}:</strong>
                          {Object.entries(fieldType).map(([nestedKey, nestedValue]) => (
                            <p key={nestedKey} className="nested-field">
                              <span>{nestedKey}:</span> {nestedValue}
                            </p>
                          ))}
                        </div>
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
        {selectedSection !== '' && (
          <div className="right-column">
            <button 
              className="add-item-button"
              onClick={() => setIsModalOpen(true)}
            >
              Add Item
            </button>
            <InteractiveLayout 
              detailsData={detailsData}
              selectedSection={selectedSection}
            />
          </div>
        )}
      </div>

      <AddItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allData={detailsData}
        selectedSection={selectedSection}
      />
    </div>
  );
}

export default ConfigureDetails;