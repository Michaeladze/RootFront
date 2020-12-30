import React from 'react';
import Tile from './Tile';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Tile',
  component: Tile
};

export const tile = () => {
  return (
    <Story name='Tile (Плитка)'>
      <StoryItem description='Плитка оборачивает контент в стилизованный блок'>
        <Tile>Контент</Tile>
      </StoryItem>
    </Story>
  );
};
