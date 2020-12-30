import React, { FC, useState } from 'react';
// @ts-ignore
import DatePicker, { DatePickerProps } from 'react-date-picker/dist/entry.nostyle';
import Calendar from '../../_icons/calendar';
import Close from '../../_icons/close';

export interface IDatepickerProps extends Omit<DatePickerProps, 'onChange'> {
  onChange?: (date: Date | null, name?: string) => void;
  clear?: boolean;
  /** Тип */
  inputType?: 'inline' | 'outline';
}

const Datepicker: FC<IDatepickerProps> = (props: IDatepickerProps) => {
  const [value, setValue] = useState<Date | Date[] | null>(props.value || null);

  /** Изменение значения календаря */
  const handleChange = (date: Date | Date[] | null) => {
    const d = date as Date;
    setValue(d);
    props.onChange && props.onChange(d, props.name || '');
  };

  const typeClass = props.inputType === 'outline' ? 'rf-datepicker__wrapper--outline' : '';

  return (
    <div className={`rf-datepicker__wrapper ${typeClass}`}>
      <DatePicker
        {...props}
        value={value}
        format='dd.MM.y'
        calendarIcon={<Calendar />}
        clearIcon={props.clear && !props.disabled && value ? <Close /> : null}
        onChange={handleChange}
      />
    </div>
  );
};

export default Datepicker;
