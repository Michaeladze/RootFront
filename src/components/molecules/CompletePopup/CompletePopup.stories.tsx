import React from 'react';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';
import CompletePopup from './CompletePopup';

export default {
  title: 'CompletePopup',
  component: CompletePopup
};

export const completePopup = () => {

  return (
    <Story name='CompletePopup (Карточка события)'>
      <StoryItem description='Кнопки с типом outlineSecondary'>
        <StoryRow>
          <CompletePopup label='Заявка успешно создана' confirm onClose={() => {}}/>
          <CompletePopup label='Заявка отклонена' onClose={() => {}}/>
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
