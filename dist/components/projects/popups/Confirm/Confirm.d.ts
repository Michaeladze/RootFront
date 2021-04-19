import React from 'react';
export interface IConfirmProps {
    /** Текст сабмита */
    textAccept: string;
    /** Действие */
    onAction: (comment?: string) => void;
    /** Текст подтверждения */
    text?: string;
    onClose?: () => void;
    /** Комментарий */
    comment?: string;
    /** Показать комментарий */
    showComment?: boolean;
}
declare const Confirm: React.FC<IConfirmProps>;
export default Confirm;
