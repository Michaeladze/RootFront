import React, { FC, HTMLProps } from 'react';
import './PopupFooter.scss';
import Button from '../../../atoms/Button';

export interface IProps extends HTMLProps<HTMLElement> {
  /** Сабмит */
  onSubmit?: () => void;
  /** Функция закрытия попапа если передана то появляется кнопка отменить*/
  onClose?: () => void;
  /** Текст на кнопке Выбрать*/
  textAccept?: string;
}

const PopupFooter: FC<IProps> = ({ onClose, onSubmit, textAccept = 'Выбрать', ...rest }: IProps) => {
  const onClick = () => {
    onSubmit && onSubmit();
  };

  return (
    <footer {...rest} className={`popup-footer ${rest.className || ''}`}>
      <Button
        className='popup-footer__button'
        type={onSubmit ? 'button' : 'submit'}
        disabled={rest.disabled}
        buttonType='primary'
        onClick={onClick}>
        {textAccept}
      </Button>
      {onClose && (
        <Button className='popup-footer__button' type='button' buttonType='link' onClick={onClose}>
          Отмена
        </Button>
      )}
    </footer>
  );
};

export default PopupFooter;
