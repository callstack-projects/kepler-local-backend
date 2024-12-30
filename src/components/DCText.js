import React from 'react';

export const DCText = ({ layoutElement }) => {

  return (
    <div
      style={{
          alignContent: layoutElement.displayProps?.alignContent,
          alignItems: layoutElement.displayProps?.alignItems,
          justifyContent: layoutElement.displayProps?.justifyContent,
        }}>
      <span variant={layoutElement?.displayProps?.variant}>
        "example text"
      </span>
    </div>
  );
};
