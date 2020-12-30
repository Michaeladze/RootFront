import React from 'react';
import Button from '../Button';

const Fonts = () => {
  return (
    <div className='rf-fonts'>
      <div className='rf-fonts__col'>
        <h3 className='rf-fonts__col-title'>Тексты</h3>

        <h1 className='rf-fonts__item rf-h1'>Заголовок 1</h1>
        <h2 className='rf-fonts__item rf-h2'>Заголовок 2</h2>
        <h3 className='rf-fonts__item rf-h3'>Заголовок 3</h3>
        <h4 className='rf-fonts__item rf-h4'>Заголовок 4</h4>
        <h5 className='rf-fonts__item rf-h5'>Заголовок 5</h5>
        <h6 className='rf-fonts__item rf-h6'>Заголовок 6</h6>

        <p className='rf-fonts__item rf-s1'>Подзаголовок 1</p>
        <p className='rf-fonts__item rf-s2'>Подзаголовок 2</p>

        <p className='rf-fonts__item rf-p1'>Параграф 1</p>
        <p className='rf-fonts__item rf-p2'>Параграф 2</p>

        <p className='rf-fonts__item rf-c1'>Подпись 1</p>
        <p className='rf-fonts__item rf-c2'>Подпись 2</p>

        <p className='rf-fonts__item rf-l'>Лейбл</p>
      </div>
      <div className='rf-fonts__col'>
        <h3 className='rf-fonts__col-title'>Кнопки</h3>

        <Button buttonType='link' className='rf-fonts__item rf-button-giant'>
          Гигантский
        </Button>
        <Button buttonType='link' className='rf-fonts__item rf-button-large'>
          Большой
        </Button>
        <Button buttonType='link' className='rf-fonts__item rf-button-medium'>
          Средний
        </Button>
        <Button buttonType='link' className='rf-fonts__item rf-button-small'>
          Маленький
        </Button>
        <Button buttonType='link' className='rf-fonts__item rf-button-tiny'>
          Крошечный
        </Button>
      </div>
    </div>
  );
};

export default Fonts;
