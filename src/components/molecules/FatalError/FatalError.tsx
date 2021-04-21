import React from 'react';
import './FatalError.scss';
import FatalErrorIcon from './FatalErrorIcon';

const FatalError: React.FC = () => {


  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className='fatal-error'>
      <FatalErrorIcon/>
      <p className='fatal-error__label'>Что-то пошло не так... Пожалуйста, обновите страницу.</p>
      <p className='fatal-error__message'>Для заведения инцидента воспользуйтесь ЦСПП (
        <a href='#' target='_blank' className='fatal-error__link'>https://cspp.vtb.ru</a>).
      </p>
    </div>
  );
};

export default FatalError;
