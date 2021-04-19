import React, { useState } from 'react';
import Select, { ISelectProps } from '../Select/Select';
import {
  ICustomOption, IOption, isCustomOption
} from '../../../types';

export interface ICreatableSelectProps extends ISelectProps {
  /** Устананвливает позицию кастомной опции - по-умолчанию в конце */
  createOptionPosition?: 'first' | 'last',
  /** Форматирует лейбл для кастомоной опции - по-умолчанию 'Создать ${text}' */
  formatCreateLabel?: (label: string) => string;
  /** Обработчик выбора кастомной опции, если указан - вызывается вместо onChange  */
  onCreateOption?: (option: ICustomOption) => void;
}


export const CreatableSelect: React.FC<ICreatableSelectProps> = ({ onCreateOption,
  createOptionPosition = 'last',
  options,
  onChange,
  ...props }) => {
  const [newOption, setNewOption] = useState<ICustomOption | undefined>(undefined);

  const isValidNewOption = (inputValue: string) =>
    !(!inputValue || options.some(option => option.label === inputValue || option.value === inputValue));
  const formatLabel = props.formatCreateLabel ? props.formatCreateLabel : (label: string) => `Создать '${label}'`;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidNewOption(e.target.value)) {
      const customOption = {
        label: formatLabel(e.target.value),
        value: `${e.target.value}`,
        __isNew__: true
      };

      setNewOption(customOption);
    }
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLInputElement>, v?: IOption) => {
    if (v && isCustomOption(v)) {
      if (onCreateOption) {
        return onCreateOption(v);
      }
    }

    onChange && onChange(e, v);
  };

  const allOptions = newOption ? createOptionPosition === 'first' ? [newOption, ...options] : [...options, newOption] : options;

  return (
    <Select {...props} multiSelect={false} options={allOptions} onInputChange={onInputChange} onChange={onChangeSelect} />
  );
};

export default CreatableSelect;
