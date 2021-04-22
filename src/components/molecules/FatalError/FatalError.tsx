import React from 'react';
import './FatalError.scss';
import FatalErrorIcon from './FatalErrorIcon';

export interface IFatalErrorProps {
  link: string;
}

const FatalError: React.FC<IFatalErrorProps> = ({ link }: IFatalErrorProps) => {


  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className='fatal-error'>
      <FatalErrorIcon/>
      <p className='fatal-error__label'>Что-то пошло не так... Пожалуйста, обновите страницу.</p>
      <p className='fatal-error__message'>Для заведения инцидента воспользуйтесь ЦСПП (
        <a href={link} target='_blank' className='fatal-error__link'>{link}</a>).
      </p>
    </div>
  );
};

export default FatalError;
