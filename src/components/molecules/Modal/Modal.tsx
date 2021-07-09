import React, {
  FC, useEffect, useState
} from 'react';
import './Modal.scss';
import { createPortal } from 'react-dom';
import Close from '../../_icons/close';

export interface IModalProps {
  /** CSS класс для стилизации */
  className?: string;
  /** Контент модалки */
  children: React.ReactNode | React.ReactNode[];
  /** Событие закрытия */
  onClose?: () => void;
  /** Затемнение фона */
  darkenBackground?: boolean;
  /** Флаг, показываем кнопку закрытия */
  showClose?: boolean;
  /** Контент для шапки в модальном окне */
  header?: React.ReactNode;
  /** Контент для футера в модальном окне */
  footer?: React.ReactNode;
  /** Высота контента */
  height?: string;
  /** Запретить общий скролл */
  disableScroll?: boolean;
  /** На весь экран */
  fullScreen?: boolean;
  /** Кастомный компонент вместо */
  custom?: boolean;
}

const Modal: FC<IModalProps> = ({
  className = '',
  children,
  onClose,
  darkenBackground = true,
  showClose = true,
  header,
  footer,
  height,
  disableScroll = false,
  fullScreen = false,
  custom = false,
}: IModalProps) => {
  /** Создаем контейнер для модалки */
  const [div] = useState<HTMLDivElement>(document.createElement('div'));

  /** При маунте добавляем модалку. При дестрое - удаляем. */
  useEffect(() => {
    /** Закрывает модалку при нажатии на Escape */
    const closeOnEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.body.appendChild(div);
    document.body.style.overflowY = 'hidden';
    window.addEventListener('keyup', closeOnEscPress);

    return () => {
      document.body.style.overflowY = 'auto';
      document.body.removeChild(div);
      window.removeEventListener('keyup', closeOnEscPress);
    };
  }, [div]);

  const style = height ? { height } : {};
  const fullScreenClass = fullScreen ? 'rf-modal__wrapper--fullScreen' : '';

  /** Обертка для модалки */
  const modal = (
    <div className={`rf-modal ${darkenBackground ? 'rf-modal--darken' : ''}`} onClick={onClose}>
      { custom ? (
        <div onClick={ (e: React.MouseEvent) => e.stopPropagation() }>
          {children}
        </div>
      ) : (
        <div style={ style }
          className={ `rf-modal__wrapper ${fullScreenClass} ${className}` }
          onClick={ (e: React.MouseEvent) => e.stopPropagation() }>
          { showClose && (
            <button className='rf-modal__close-button' onClick={ onClose }>
              <Close/>
            </button>
          ) }

          { header && <div className='rf-modal__header'>{ header }</div> }

          <div style={ { overflowY: disableScroll ? 'hidden' : 'auto' } } className='rf-modal__content'>{ children }</div>

          { footer && <div className='rf-modal__footer'>{ footer }</div> }
        </div>
      )
      }
    </div>
  );

  return createPortal(modal, div);
};

export default Modal;
