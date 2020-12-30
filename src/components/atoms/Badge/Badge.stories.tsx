import React from 'react';
import Badge from './Badge';
import Envelope from '../../_icons/envelope';
import { Variant } from '../../../types';
import { variants } from '../../../utils/helpers';
import { UserPhoto } from '../../../index';
import Story from '../../storybook/Story';
import StoryCol from '../../storybook/StoryCol';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Badge',
  component: Badge
};

export const badge = () => {
  const list: any = [9, 99, 999, 100, undefined];

  const badgesJSX = variants.map((variant: Variant) => (
    <StoryRow key={variant}>
      {list.map((v: number, i: number) => (
        <StoryCol key={v + i}>
          <Badge badgeContent={v} variant={variant} max={i === 3 ? 99 : Infinity}>
            <Envelope />
          </Badge>
        </StoryCol>
      ))}
    </StoryRow>
  ));

  const userPhotos = ['bottomLeft', 'topLeft', 'topRight', 'bottomRight'].map((position: any) => (
    <StoryCol key={position}>
      <Badge variant='danger' position={position}>
        <UserPhoto fullName='Bottle Neck' />
      </Badge>
    </StoryCol>
  ));

  return (
    <Story name='Badge (Значок)' description='Создает значок в правом верхнем углу элемента.'>
      <StoryItem description='Простой значок'>
        {badgesJSX}
      </StoryItem>

      <StoryItem
        subtitle='Позиция значка'
        description='Значок в виде точки может двигаться по окружности вокруг элемента.'>
        <StoryRow>{userPhotos}</StoryRow>
      </StoryItem>

      <StoryItem
        subtitle='Значок с текстом'
        description='Для текстов нужно указать position="text", чтобы значок не наезжал на буквы.'>
        <Badge badgeContent='99' variant='success'>
          Сообщения
        </Badge>
      </StoryItem>
    </Story>
  );
};
