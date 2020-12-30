import React from 'react';

import PopupFooter from './PopupFooter';
import Story from '../../../storybook/Story';
import StoryItem from '../../../storybook/StoryItem';
import StoryRow from '../../../storybook/StoryRow';

export default {
  title: 'Projects/PopupFooter',
  component: PopupFooter
};

export const PopupFooterComponent = () => {
  return (
    <Story name='PopupFooter'>
      <StoryItem description=''>
        <StoryRow>
          <PopupFooter />
        </StoryRow>
        <StoryRow>
          <PopupFooter textAccept={'Текст'} />
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
