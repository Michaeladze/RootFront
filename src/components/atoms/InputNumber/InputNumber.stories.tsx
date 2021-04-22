import React from 'react';
import InputNumber from './InputNumber';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { Button, FormGroup } from '../../../index';
import StoryRow from '../../storybook/StoryRow';
import { useReactiveForm } from 'use-reactive-form';

export default {
  title: 'Form Controls/InputNumber',
  component: InputNumber
};


export const inputNumber = () => {

  const config = { fields: { number: '' } };
  const { ref, values } = useReactiveForm(config);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <Story name='InputNumber' description='Поле для ввода номера счета или номера карты. Доступен ввод только чисел.' width={600}>
      <StoryItem>
        <StoryRow>

          <form ref={ref} onSubmit={onSubmit} style={{
            display: 'flex',
            marginTop: '24px'
          }}>
            <div style={{ width: '520px' }}>
              <FormGroup label='Число'>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '100%' }}>
                    <InputNumber name='number' defaultValue={2000.20} max={10000.50} floatPoints={1} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <Button type='submit'>Отправить</Button>
                  </div>
                </div>
              </FormGroup>
            </div>
          </form>
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
