import React from 'react';
import './InputPhone.scss';
import { IInputProps } from '../Input/Input';
export interface IInputPhoneProps extends IInputProps {
    defaultValue?: string;
}
declare const InputPhone: React.FC<IInputPhoneProps>;
export default InputPhone;
