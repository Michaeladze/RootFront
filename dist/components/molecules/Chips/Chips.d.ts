import { FC } from 'react';
import './Chips.scss';
import { IChips, Size, Variant } from '../../../types';
export interface IChipsProps {
    items: IChips[];
    className?: string;
    variant?: Variant;
    onClick?: (c: IChips) => void;
    onRemove?: (id: string) => void;
    disabled?: boolean;
    /** Размер */
    size?: Size;
}
declare const Chips: FC<IChipsProps>;
export default Chips;
