import React from 'react';
import './DCContentContainer.css';

export const DCContentContainer = ({
  containerElement,
  level,
  parseLayoutElements,
}) => {

  return (
    <div
      className="dc-container"
      style={{
        paddingLeft: containerElement?.displayProps?.horizontalSpacing,
        paddingRight: containerElement?.displayProps?.horizontalSpacing,
        paddingTop: containerElement?.displayProps?.verticalSpacing,
        paddingBottom: containerElement?.displayProps?.verticalSpacing
      }}>
      {containerElement?.title ? (
        <span variant="title">{containerElement.title}</span>
      ) : null}
     <div style={{
        flexDirection: containerElement?.displayProps?.flexDirection
      }}>
        <div className="container-label">Container</div>
          <div className="container-content">
            {parseLayoutElements(containerElement?.layoutElements, level)}
          </div>
      </div>
    </div>
  );
};
