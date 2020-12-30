import '../src/styles/index.scss';
import { configure } from '@storybook/react';

/** Вешаем дефолтный класс на body для применения цветовой схемы */
function loadStories () {
  document.body.className = 'theme-default';
}

configure(loadStories, module);
