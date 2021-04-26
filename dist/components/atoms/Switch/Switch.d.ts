import { FC, ReactNode } from 'react';
import { Variant } from '../../../types';
import './Switch.scss';
export interface ISwitchProps {
    onChange?: (f: boolean) => void;
    label?: ReactNode;
    className?: string;
    state?: boolean;
    disable?: boolean;
    variant?: Variant;
}
declare const Switch: FC<ISwitchProps>;
export default Switch;
