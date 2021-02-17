import React from 'react';
import TextEditor from './TextEditor';
import StoryItem from '../../storybook/StoryItem';
import Story from '../../storybook/Story';

export default {
  title: 'Form Controls/TextEditor',
  component: TextEditor
};

export const textEditor = () =>
  <Story name='TextEditor' width={600}>
    <StoryItem description='Редактор текста'>
      <TextEditor name='editor' preview/>
    </StoryItem>
  </Story>;
