import React from 'react';
import './InputNumber.scss';
import { IInputProps } from '../Input/Input';
export interface IInputNumberProps extends IInputProps {
    defaultValue?: string | number;
    separator?: string;
    floatPoints?: number;
    groupBy?: number;
    max?: number;
}
declare const InputNumber: React.FC<IInputNumberProps>;
export default InputNumber;
