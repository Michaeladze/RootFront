import { FC, HTMLProps } from 'react';
import { Size, Variant } from '../../../types';
export interface IButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
    /** Внешний вид */
    buttonType?: 'primary' | 'secondary' | 'link' | 'outlinePrimary' | 'outlineSecondary' | 'round' | 'text';
    /** Тип */
    type?: 'button' | 'submit' | 'reset';
    /** Варианты */
    variant?: Variant;
    /** Размер */
    size?: Size;
}
declare const Button: FC<IButtonProps>;
export default Button;
