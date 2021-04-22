import React from 'react';
import InputPhone from './InputPhone';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { Button, FormGroup } from '../../../index';
import StoryRow from '../../storybook/StoryRow';
import { useReactiveForm } from 'use-reactive-form';

export default {
  title: 'Form Controls/InputPhone',
  component: InputPhone
};


export const inputPhone = () => {

  const config = { fields: { phone: '' } };
  const { ref, values } = useReactiveForm(config);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <Story name='InputPhone' description='Поле для ввода номера телефона. Доступен ввод только чисел.' width={600}>
      <StoryItem>
        <StoryRow>
          <form ref={ref} onSubmit={onSubmit} style={{
            display: 'flex',
            marginTop: '24px'
          }}>
            <div style={{ width: '520px' }}>
              <FormGroup label='Телефон'>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '100%' }}>
                    <InputPhone name='phone' />
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
