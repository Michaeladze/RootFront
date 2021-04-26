import { FC } from 'react';
import './TimeElement.scss';
export interface ITimepickerProps {
    updateTime: (newTime: string) => void;
    min: string;
    max: string;
    value?: string;
}
declare const TimeElement: FC<ITimepickerProps>;
export default TimeElement;
