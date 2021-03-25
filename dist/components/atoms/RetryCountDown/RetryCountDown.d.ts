import React from 'react';
interface IProps {
    time: number[];
    action?: () => void;
}
declare const RetryCountDown: React.FC<IProps>;
export default RetryCountDown;
