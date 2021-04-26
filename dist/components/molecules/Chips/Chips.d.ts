import { FC } from 'react';
import { IChips, Size, Variant } from '../../../types';
import './Chips.scss';
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
