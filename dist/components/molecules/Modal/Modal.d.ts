import React, { FC } from 'react';
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
}
declare const Modal: FC<IModalProps>;
export default Modal;
