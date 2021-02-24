import React from 'react';
import Input from './Input';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';

export default {
  title: 'Form Controls/Input',
  component: Input
};

const inputsData: any[] = [
  {
    name: 'rtf1',
    placeholder: 'Введите текст'
  },
  {
    name: 'rtf2',
    placeholder: 'Фокус на поле',
    autofocus: true
  },
  {
    name: 'rtf3',
    placeholder: 'Невалидное поле',
    className: 'invalid'
  },
  {
    name: 'rtf4',
    placeholder: 'Неактивное поле ввода',
    disabled: true
  }
];

const searchInputData = {
  name: 'rtf',
  placeholder: 'Поиск',
  clear: () => {}
};

export const input = () => {
  const inputsJSX = inputsData.map((r: any) => (
    <StoryRow key={r.name}>
      <Input
        name={r.name}
        placeholder={r.placeholder}
        className={r.className}
        disabled={r.disabled}
        autoFocus={r.autofocus}
        onClear={r.clear}
        size='medium'
      />
    </StoryRow>
  ));

  return (
    <Story name='Input' description='Однострочное поле ввода' width={600}>
      <StoryItem subtitle='Состояния инпута'>{inputsJSX}</StoryItem>

      <StoryItem subtitle='Виды инпутов' description='Для поиска, паролей, с очисткой содержимого и т.д.'>
        <StoryRow>
          <Input
            name={searchInputData.name}
            placeholder={searchInputData.placeholder}
            search={true}
            onClear={() => console.log('clear')}
          />
        </StoryRow>
        <StoryRow>
          <Input type='password' name='password' placeholder='Введите пароль' />
        </StoryRow>
        <StoryRow>
          <Input
            name='clearInput'
            placeholder='Поле с возможностью очистки содержимого. Начните печатать...'
            onClear={() => console.log('clear')}
          />
        </StoryRow>
        <StoryRow>
          <Input name='floatLabel' floatLabel='Введите текст' />
        </StoryRow>
      </StoryItem>
    </Story>
  );
};

input.story = {
  name: 'Input'
  /*
   * Parameters: {
   *   design: {
   *     type: 'figma',
   *     url: 'https://www.figma.com/file/Ic098zB7wDIQlqfQYFThyn/RTF_Klimov?node-id=1179%3A7085'
   *   }
   * }
   */
};
