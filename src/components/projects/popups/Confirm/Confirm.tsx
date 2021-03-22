import React from 'react';
import { PopupFooter } from '../../../../index';


interface IProps {
  /** Текст сабмита */
  textAccept: string;
  /** Действие */
  onAction: () => void;
  /** Текст подтверждения */
  text?: string;
  onClose?: () => void;
}

const Confirm: React.FC<IProps> = ({ textAccept, onAction, onClose, text }: IProps) => {

  const handleSubmit = () => {
    onAction();
    onClose && onClose();
  };

  return (
    <div className='confirm-popup'>
      <h2 className='confirm-popup__title'>Подтвердите действие</h2>
      {text && <p className='confirm-popup__text'>{text}</p>}
      <PopupFooter onSubmit={handleSubmit} onClose={onClose} textAccept={textAccept}/>
    </div>
  );
};

export default Confirm;
