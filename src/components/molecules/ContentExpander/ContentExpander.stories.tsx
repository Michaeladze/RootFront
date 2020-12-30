import React from 'react';
import ContentExpander from './ContentExpander';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'ContentExpander',
  component: ContentExpander
};

export const contentExpander = () => (
  <Story name='ContentExpander (Схлопыватель 🧐)'>
    <StoryItem description='Прячет контент под кнопкой'>
      <ContentExpander title='Контент'>
        <p>Какой-то контент</p>
        <p>Какой-то контент</p>
        <p>Какой-то контент</p>
        <p>Какой-то контент</p>
        <p>Какой-то контент</p>
        <p>Какой-то контент</p>
        <p>Какой-то контент</p>
        <p>Какой-то контент</p>
        <p>Какой-то контент</p>
        <p>Какой-то контент</p>
      </ContentExpander>
    </StoryItem>
  </Story>
);
