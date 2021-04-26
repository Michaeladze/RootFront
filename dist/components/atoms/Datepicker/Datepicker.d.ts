import { FC } from 'react';
import './Datepicker.scss';
import { DatePickerProps } from 'react-date-picker/dist/entry.nostyle';
import { Size } from '../../../types';
export interface IDatepickerProps extends Omit<DatePickerProps, 'onChange'> {
    onChange?: (date: Date | null, name?: string) => void;
    clear?: boolean;
    /** Размер */
    size?: Size;
    showLeadingZeros?: boolean;
}
declare const Datepicker: FC<IDatepickerProps>;
export default Datepicker;
