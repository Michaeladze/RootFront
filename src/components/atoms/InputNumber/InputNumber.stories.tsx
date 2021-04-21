import React from 'react';
import InputNumber from './InputNumber';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { FormGroup } from '../../../index';
import StoryRow from '../../storybook/StoryRow';

export default {
  title: 'Form Controls/InputNumber',
  component: InputNumber
};


export const inputNumber = () => {

  return (
    <Story name='InputNumber' description='Поле для ввода номера счета или номера карты. Доступен ввод только чисел.' width={600}>
      <StoryItem>
        <StoryRow>
          <FormGroup label='Номер счета'>
            <InputNumber floatPoints={0} />
          </FormGroup>
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
