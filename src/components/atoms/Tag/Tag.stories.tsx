import React from 'react';
import Tag from './Tag';
import { Variant } from '../../../types';
import { variants } from '../../../utils/helpers';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Tag',
  component: Tag
};

export const tag = () => {
  const tags = variants.map((variant: Variant) => (
    <div style={{ margin: '4px' }} key={variant}>
      <Tag variant={variant}>{variant}</Tag>
    </div>
  ));

  return (
    <Story
      name='Tag'>
      <StoryItem description='Как чипсы, только в единственном экземпляре.'>
        <div style={{ display: 'flex' }}>
          {tags}
        </div>
      </StoryItem>
    </Story>
  );
};
