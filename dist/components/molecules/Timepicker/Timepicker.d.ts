import { FC, HTMLProps } from 'react';
import './Timepicker.scss';
export interface ITimepickerProps extends HTMLProps<HTMLInputElement> {
    /** Css класс */
    className?: string;
    /** Заблокирован выбор или нет */
    disabled?: boolean;
    /** Начальное значение */
    initialValue?: string;
    /** Функция при изменении значения */
    onChangeValue?: (value: string, id: string) => void;
    /** Минимальное значение 00:00 */
    min?: string;
    /** Максимальное значение 00:00 */
    max?: string;
}
declare const Timepicker: FC<ITimepickerProps>;
export default Timepicker;
