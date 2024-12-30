/* eslint-disable default-case */
import React from 'react';
import { DCContentContainer } from './components/DCContentContainer';
import { DCImageTile } from './components/DCImageTile';
import { DCText } from './components/DCText';

export const useDetailsLayoutElements = (props) => {
  const { detailsLayoutData } = props;
  console.log('first things first!', detailsLayoutData);

  const parseLayoutElements = (layoutElements, level) => {
    return layoutElements?.map((layoutElement, index) =>
      parseLayoutElement(layoutElement, level, index),
    );
  };

  const parseLayoutElement = (layoutElement, level, index) => {
    switch (layoutElement?.elementType) {
      case 'DCContentContainer':
        return displayLayoutContentContainer(layoutElement, level + 1, index);

      case 'DCText':
      case 'DCImageTile':
        return displayLayoutElement(layoutElement, level + 1, index);
    }
  };

  const displayLayoutContentContainer = (containerElement, level, index) => {
    if (containerElement?.title !== '') {
      return (
        <DCContentContainer
          containerElement={containerElement}
          key={`${level}-${index}-DCContentContainer`}
          level={level}
          parseLayoutElements={parseLayoutElements}
        />
      );
    }
  };

  const displayLayoutElement = (layoutElement, level, index) => {
    switch (layoutElement?.elementType) {
      case 'DCText':
        return (
          <DCText
            layoutElement={layoutElement}
            key={`${level}-${index}-DCText`}
          />
        );

      case 'DCImageTile':
        return (
          <DCImageTile
            layoutElement={layoutElement}
            key={`${level}-${index}-DCImageTile`}
          />
        );
    }
  };

  return parseLayoutElements(detailsLayoutData?.layoutElements, 0);
};
