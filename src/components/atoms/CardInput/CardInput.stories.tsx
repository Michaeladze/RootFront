import React from 'react';
import CardInput from './CardInput';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { FormGroup } from '../../../index';
import StoryRow from '../../storybook/StoryRow';

export default {
  title: 'Form Controls/CardInput',
  component: CardInput
};


export const cardInput = () => {

  return (
    <Story name='CardInput' description='Поле для ввода номера счета или номера карты. Доступен ввод только чисел.' width={600}>
      <StoryItem>
        <StoryRow>
          <FormGroup label='Номер счета'>
            <CardInput defaultValue='10002000300040005000'/>
          </FormGroup>
        </StoryRow>
        <StoryRow>
          <FormGroup label='Номер карты'>
            <CardInput type='card' defaultValue='1000200030004000'/>
          </FormGroup>
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
