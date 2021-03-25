import React, { HTMLProps } from 'react';
import { IOption, Variant } from '../../../types';
export interface ISegmentProps extends Omit<HTMLProps<HTMLInputElement>, 'list'> {
    /** Список элементов */
    list: [IOption, IOption];
    /** Вариант */
    variant?: Variant;
}
declare const Segment: React.FC<ISegmentProps>;
export default Segment;
