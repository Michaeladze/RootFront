import React from 'react';
interface IProps {
    /** Текст сабмита */
    textAccept: string;
    /** Действие */
    onAction: () => void;
    /** Текст подтверждения */
    text?: string;
    onClose?: () => void;
}
declare const Confirm: React.FC<IProps>;
export default Confirm;
