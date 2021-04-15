import { FC, HTMLProps } from 'react';
export interface IProps extends HTMLProps<HTMLElement> {
    /** Сабмит */
    onSubmit?: () => void;
    /** Функция закрытия попапа если передана то появляется кнопка отменить*/
    onClose?: () => void;
    /** Текст на кнопке Выбрать*/
    textAccept?: string;
}
declare const PopupFooter: FC<IProps>;
export default PopupFooter;
