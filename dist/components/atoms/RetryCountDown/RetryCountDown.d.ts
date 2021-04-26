import React from 'react';
import './RetryCountDown.scss';
interface IProps {
    time: number[];
    action?: () => void;
}
declare const RetryCountDown: React.FC<IProps>;
export default RetryCountDown;
