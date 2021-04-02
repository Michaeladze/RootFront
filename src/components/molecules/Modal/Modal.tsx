import React, {
  FC, useEffect, useState
} from 'react';
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
  headerContent?: React.ReactNode;
  /** Контент для футера в модальном окне */
  footerContent?: React.ReactNode;
  /** Высота контента */
  height?: string;
  /** Запретить общий скролл */
  disableScroll?: boolean;
}

const Modal: FC<IModalProps> = ({
  className = '',
  children,
  onClose,
  darkenBackground = true,
  showClose = true,
  headerContent,
  footerContent,
  height,
  disableScroll = false
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
  });

  const style = height ? { height } : {};

  /** Обертка для модалки */
  const modal = (
    <div className={`rf-modal ${darkenBackground ? 'rf-modal--darken' : ''}`} onClick={onClose}>
      <div style={style}
        className={`rf-modal__wrapper rf-modal__wrapper1 ${className}`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {showClose && (
          <button className='rf-modal__close-button' onClick={onClose}>
            <Close />
          </button>
        )}

        {headerContent && <div className='rf-modal__header'>{headerContent}</div>}

        <div style={{ overflowY: disableScroll ? 'hidden' : 'auto' } } className='rf-modal__content'>{children}</div>

        {footerContent && <div className='rf-modal__footer'>{footerContent}</div>}
      </div>
    </div>
  );

  return createPortal(modal, div);
};

export default Modal;
