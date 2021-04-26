import React from 'react';
import './InputCreditCard.scss';
import { IInputProps } from '../Input/Input';
export interface ICardInputProps extends Omit<IInputProps, 'type'> {
    type?: 'account' | 'card';
    defaultValue?: string;
}
declare const InputCreditCard: React.FC<ICardInputProps>;
export default InputCreditCard;
