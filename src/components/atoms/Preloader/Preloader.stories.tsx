import React from 'react';
import Preloader from './Preloader';
import { Variant } from '../../../types';
import { variants } from '../../../utils/helpers';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';
import StoryCol from '../../storybook/StoryCol';

export default {
  title: 'Preloader',
  component: Preloader
};

export const preloader = () => {
  const preloaderJSX = variants.map((variant: Variant) => (
    <StoryCol key={variant}>
      <div style={{
        width: '60px',
        height: '60px',
        position: 'relative'
      }}>
        <Preloader size='small' variant={variant} />
      </div>
      <div style={{
        width: '60px',
        height: '60px',
        position: 'relative'
      }}>
        <Preloader size='medium' variant={variant} />
      </div>
      <div style={{
        width: '60px',
        height: '60px',
        position: 'relative'
      }}>
        <Preloader size='big' variant={variant} />
      </div>
    </StoryCol>
  ));

  return (
    <Story name='Preloader (Загрузка)'>
      <StoryItem description='При ленивой загрузке компонента или получении данных с сервера вместо пустой страницы стоит отображать прелоудер.'>
        <StoryRow>{preloaderJSX}</StoryRow>
      </StoryItem>
    </Story>
  );
};
