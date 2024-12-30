import React from 'react';
import './InteractiveLayout.css';
import { useDetailsLayoutElements } from '../useDetailsLayoutElements';

function InteractiveLayout({ detailsData, selectedSection }) {
  const selectedLayout = detailsData?.find(item => item.id === selectedSection);
  
  const renderedDetailsContent = useDetailsLayoutElements({
    detailsLayoutData: selectedLayout,
  });
  return (
    <div className="interactive-layout">
      <h3>Layout Preview</h3>
      <div className="layout-container">
        {renderedDetailsContent}
              {/* {selectedLayout.layoutElements.map((element, index) => (
                  <div key={'container-key-'+index}>
                      {element.elementType === 'DCContentContainer' && (
                        <div className="dc-container">
                            <div className="container-label">Container</div>
                            <div className="container-content">
                            {element.layoutElements?.map((element, index) => (
                                <div key={index} className="layout-element">
                                {element.type}
                                </div>
                            ))}
                            </div>
                        </div>
                        )}
                  </div>
              ))} */}
      </div>
    </div>
  );
}

export default InteractiveLayout;