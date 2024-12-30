import React from 'react';

const DEFAULT_HEIGHT = 400;
const DEFAULT_WIDTH = 400;

const getImageSize = (displayProps) => {
  switch (displayProps.size) {
    case 'small':
      return { width: 200, height: 200 };
    case 'medium':
      return { width: 400, height: 400 };
    case 'large':
      return { width: 800, height: 800 };
    case 'custom':
      return {
        width: displayProps?.customWidth ?? DEFAULT_WIDTH,
        height: displayProps?.customHeight ?? DEFAULT_HEIGHT,
      };
    default:
      return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }
};

export const DCImageTile = ({
  layoutElement,
}) => {

  const imageDimensions = getImageSize(layoutElement.displayProps);

  return (
    <img
      src="https://picsum.photos/400/400"
      width={imageDimensions.width}
      height={imageDimensions.height}
      title="example title"
      alt="placeholder"
    />
  );
};
