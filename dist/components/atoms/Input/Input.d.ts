import { FC, HTMLProps } from 'react';
import { Size } from '../../../types';
export interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
    /** Возможность очистки поля по клику */
    onClear?: () => void;
    /** Возможность поиска */
    search?: boolean;
    /** Плавающий лейбл */
    floatLabel?: string;
    /** Дебаунс */
    debounce?: number;
    /** Вернуть value */
    getValue?: (value: string) => void;
    /** Размер */
    size?: Size;
}
declare const Input: FC<IInputProps>;
export default Input;
