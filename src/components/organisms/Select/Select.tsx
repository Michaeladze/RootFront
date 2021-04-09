import React, {
  FC, InputHTMLAttributes, useCallback, useEffect, useMemo, useRef, useState
} from 'react';
import {
  IChips, IOption, Size
} from '../../../types';
import useClickOutside from '../../../hooks/useClickOutside';
import {
  Button, Checkbox, Input, Radio
} from '../../../index';
import Angle from '../../_icons/caret-down';
import Close from '../../_icons/close';
import Chips from '../../molecules/Chips/Chips';
import { sizeClass } from '../../../utils/helpers';

export interface ISelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Список вариантов */
  options: IOption[];
  /** Множественный выбор */
  multiSelect?: boolean;
  /** Начальное значение */
  value?: string | string[];
  /** Изменение значение селекта */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, option?: IOption) => void;
  /** Вернуть IOption */
  getValue?: (option: IOption) => void;
  /** Размер */
  size?: Size;
}

const Select: FC<ISelectProps> = ({
  options,
  multiSelect = false,
  value,
  onChange,
  getValue,
  size = 'medium',
  ...props
}: ISelectProps) => {
  /** Ссылка на текущий компонент */
  const componentNode = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------------------------------------------------------------

  /** Отображение дропдауна с значениями */
  const [showDropdown, toggleDropdown] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  /** При открытии выпадающего списка поднимаем скролл наверх */
  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [showDropdown]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Отфильтрованные значения */
  const [hiddenOptions, setHiddenOptions] = useState<Map<string, boolean>>(new Map());

  /** Функция фильтрации списка */
  const onFilter = (options: IOption[], search: string) => {
    return options.reduce((acc: Map<string, boolean>, o: IOption) => {
      if (!o.label.toLowerCase().includes(search.toLowerCase())) {
        acc.set(o.value, true);
      }

      return acc;
    }, new Map<string, boolean>());
  };

  /** Поиск внутри селекта */
  const onSearch = (e: React.KeyboardEvent) => {
    if (props.readOnly) {
      return;
    }

    let result: Map<string, boolean> = new Map();
    const search = (e.target as HTMLInputElement).value;

    if (search) {
      result = onFilter(options, search);
    }

    /** Скрываем выпадающий список, если ничего не найдено */
    if (options.length === result.size) {
      showDropdown && toggleDropdown(false);
    } else {
      !showDropdown && toggleDropdown(true);
    }

    setHiddenOptions(result);
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Визуальное значение */
  const initInputValue = () => {
    if (typeof value === 'string') {
      if (multiSelect) {
        return '';
      }

      const tmp: IOption | undefined = options.find((o: IOption) => o.value === value);
      return tmp?.label || '';
    }

    return '';
  };

  const [inputValue, setInputValue] = useState<string>(initInputValue());

  useEffect(() => {
    setInputValue(initInputValue());
  }, [value]);

  /** Текущее значение */
  const initCurrentValue = () => {
    if (Array.isArray(value)) {
      if (multiSelect && value.length !== 0) {
        return options.filter((o: IOption) => value.includes(o.value));
      }

      return [];
    }

    return options.filter((o: IOption) => o.value === value);

  };

  const [currentValue, setCurrentValue] = useState<IOption[]>(initCurrentValue());

  const onOptionRemove = (value: string): IOption[] => {
    return currentValue.filter((e: IOption) => e.value !== value);
  };

  useEffect(() => {
    setCurrentValue(initCurrentValue());
  }, [value]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Изменение значений из выпадающего списка */
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>, o: IOption) => {
    if (multiSelect) {
      const el = e.target as HTMLInputElement;
      setCurrentValue(el.checked ? [...currentValue, o] : onOptionRemove(o.value));
    } else {
      setInputValue(o.label);
      setCurrentValue([o]);
      toggleDropdown(false);
      setHiddenOptions(new Map());
    }
  };

  /** Закрыть выпадающий список при клике на radio кнопку, так как на ней может не сработать change */
  const onOptClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDropdown(false);
  };

  /** Выпадающий список с значениями */
  const optionsList = useMemo(
    () =>
      options.map((v: IOption) => {
        const onOptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          onOptionChange(e, v);
          onChange && onChange(e, v);
          getValue && getValue(v);
        };

        const hiddenClass = hiddenOptions.has(v.value) ? 'rf-select__list-item--hidden' : '';
        const defaultChecked = !!currentValue.find((o: IOption) => o.value === v.value);

        return (
          <li className={`rf-select__list-item ${hiddenClass}`} key={v.value}>
            {multiSelect ? (
              <Checkbox
                label={v.label}
                value={v.value}
                disabled={v.disabled}
                name={props.name || 'defaultSelectName'}
                onChange={onOptChange}
                checked={defaultChecked}
              />
            ) : (
              <Radio
                label={v.label}
                value={v.value}
                disabled={v.disabled}
                name={props.name || 'defaultSelectName'}
                onChange={onOptChange}
                onClick={onOptClick}
                checked={defaultChecked}
                icon={false}
              />
            )}
          </li>
        );
      }),
    [options, currentValue, hiddenOptions]
  );

  // -------------------------------------------------------------------------------------------------------------------

  /** Клик по инпуту открывает выпадающий список */
  const onInputClick = () => {
    if (options.length !== hiddenOptions.size) {
      toggleDropdown(true);
    }
  };

  const openSelectDropdown = () => {
    if (showDropdown) {
      toggleDropdown(false);
    } else {
      onInputClick();
    }
  };

  /** ChangeEvent для возможности записывать currentValue в input */
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Чипсы под инпутом для множественного выбора */
  const chips: IChips[] = currentValue.map((o: IOption) => ({
    id: o.value,
    name: o.label,
    disabled: o.disabled
  }));

  /** Функция удаления чипсы */
  const onChipsRemove = (id: string) => {
    if (componentNode.current) {
      const checkbox = componentNode.current.querySelector<HTMLInputElement>(`input[value='${id}']`);

      if (checkbox) {
        const event = new Event('change');
        checkbox.dispatchEvent(event);
        checkbox.checked = false;
      }
    }

    setCurrentValue(onOptionRemove(id));
  };

  const chipsJSX = multiSelect && chips.length > 0 && (
    <div className='rf-select__chips'>
      <Chips variant='accent' items={chips} size={size} onRemove={onChipsRemove} disabled={props.disabled} />
    </div>
  );

  // -------------------------------------------------------------------------------------------------------------------

  /** Очистка оля ввода */
  const clearInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue('');

    if (componentNode.current) {
      const input = componentNode.current.querySelector('input.rf-input__field');

      if (input) {
        (input as HTMLInputElement).focus();
        toggleDropdown(true);
        setHiddenOptions(new Map());
      }
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Функция отслеживания клика вне элемента */
  const handleClickOutside = useCallback(() => {
    toggleDropdown(false);
    setHiddenOptions(new Map());
    setInputValue(multiSelect ? '' : currentValue[0]?.label || '');
  }, [currentValue]);

  useClickOutside(componentNode, handleClickOutside);

  // -------------------------------------------------------------------------------------------------------------------

  const clearIconClass = !props.readOnly && inputValue.length > 0 ? 'rf-select__input-clear--show' : '';

  return (
    <div className={`rf-select ${sizeClass[size]} ${props.className || ''}`} ref={componentNode}>
      <div className='rf-select__input-wrapper'>
        <Input
          placeholder={props.placeholder}
          value={inputValue}
          readOnly={props.readOnly}
          onChange={onInputChange}
          onKeyUp={onSearch}
          size={size}
          onClick={onInputClick}
          disabled={props.disabled}
        />
        <Button
          buttonType='text'
          disabled={props.disabled}
          onClick={clearInput}
          className={`rf-select__input-icon rf-select__input-clear ${clearIconClass}`}>
          <Close />
        </Button>
        { (props.readOnly || inputValue.length === 0) && (
          <Button
            buttonType='text'
            disabled={props.disabled}
            className={`rf-select__input-icon rf-select__input-angle
                ${showDropdown ? 'rf-select__input-angle--rotate' : ''}`}
            onClick={openSelectDropdown}>
            <Angle/>
          </Button>
        )}
      </div>

      <ul className={`rf-select__list ${showDropdown ? 'rf-select__list--show' : ''}`} ref={dropdownRef} onScroll={(e: any) => e.stopPropagation()}>
        {optionsList}
      </ul>

      {chipsJSX}
    </div>
  );
};

export default Select;
