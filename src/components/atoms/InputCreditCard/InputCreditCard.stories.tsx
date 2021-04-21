import React from 'react';
import InputCreditCard from './InputCreditCard';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { Button, FormGroup } from '../../../index';
import StoryRow from '../../storybook/StoryRow';
import { useReactiveForm } from 'use-reactive-form';

export default {
  title: 'Form Controls/InputCreditCard',
  component: InputCreditCard
};


export const creditCardInput = () => {

  const config = { fields: { card: '' } };
  const { ref, values } = useReactiveForm(config);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <Story name='InputCreditCard' description='Поле для ввода номера счета или номера карты. Доступен ввод только чисел.' width={600}>
      <StoryItem>
        <StoryRow>
          <FormGroup label='Номер счета'>
            <InputCreditCard defaultValue='10002000300040005000'/>
          </FormGroup>
        </StoryRow>
      </StoryItem>
      <StoryItem description='Поведение в форме'>
        <StoryRow>
          <form ref={ref} onSubmit={onSubmit} style={{
            display: 'flex',
            marginTop: '24px'
          }}>
            <div style={{ width: '520px' }}>
              <FormGroup label='Номер карты'>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '100%' }}>
                    <InputCreditCard name='card' type='card' />
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
