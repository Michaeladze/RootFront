import React from 'react';
import FileInput from './FileInput';
import { IFileData } from '../../../types';
import { Notifications } from '../../../index';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Form Controls/FileInput',
  component: FileInput
};

export const fileInput = () => {
  /** Получаем файл */
  const setFile = (file: IFileData[]) => {
    console.log(file);
  };

  return (
    <Story name='FileInput (Выбор файла)'>
      <StoryItem description='Простой выбор файла'>
        <FileInput name='file' placeholder='Выберите файлы' setFile={setFile} multiple />
      </StoryItem>
      <StoryItem description='Выбор определенного типа файлов'>
        <StoryRow>
          <FileInput name='file' placeholder='Выберите pdf' accept='application/*' multiple setFile={setFile} />
        </StoryRow>
        <StoryRow>
          <FileInput
            name='file'
            placeholder='Изображение PNG (50кБ)'
            accept='image/png'
            setFile={setFile}
            max={50}
          />
        </StoryRow>
        <StoryRow>
          <FileInput name='file' placeholder='Выберите текстовый файл' accept='text/*' setFile={setFile} />
        </StoryRow>
      </StoryItem>
      <StoryItem description='Неактивное поле'>
        <FileInput name='file' placeholder='Это поле неактивно' setFile={setFile} disabled={true} />
      </StoryItem>

      <Notifications />
    </Story>
  );
};
