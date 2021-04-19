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
  /** Изменение значение инпута */
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Вернуть IOption */
  getValue?: (option: IOption) => void;
  /** Размер */
  size?: Size;
  /** Событие на удаление чипсы */
  onChipsRemove?: (id: string, name?: string) => void;
  /** Возможность добавлять опции */
  creatable?: boolean;
  /** Создание новой опции */
  saveOption?: (value: string) => void;
}

const Select: FC<ISelectProps> = ({
  options,
  multiSelect = false,
  value,
  onChange,
  onInputChange,
  getValue,
  size = 'medium',
  onChipsRemove,
  creatable = false,
  saveOption,
  ...props
}: ISelectProps) => {
  /** Ссылка на текущий компонент */
  const componentNode = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------------------------------------------------------------

  /** Отображение дропдауна с значениями */
  const [showDropdown, toggleDropdown] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  /** Отображение сообщения о создании новой опции */
  const [newOptionMessage, showNewOptionMessage] = useState<boolean>(false);

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
      if (!o.label.toLowerCase()
        .includes(search.toLowerCase())) {
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
    // TODO Creatable проверять на точное совпадение
    if (options.length === result.size) {
      if (creatable) {
        showNewOptionMessage(true);
      } else {
        showDropdown && toggleDropdown(false);
      }
    } else {
      showNewOptionMessage(false);
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
                name={props.name}
                onChange={onOptChange}
                checked={defaultChecked}
              />
            ) : (
              <Radio
                label={v.label}
                value={v.value}
                disabled={v.disabled}
                name={props.name}
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
  const _onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    typeof onInputChange === 'function' && onInputChange(e);
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Чипсы под инпутом для множественного выбора */
  const chips: IChips[] = currentValue.map((o: IOption) => ({
    id: o.value,
    name: o.label,
    disabled: o.disabled
  }));

  /** Функция удаления чипсы */
  const onChipRemove = (id: string) => {
    if (componentNode.current) {
      const checkbox = componentNode.current.querySelector<HTMLInputElement>(`input[value='${id}']`);

      if (checkbox) {
        let event;

        if (typeof (Event) === 'function') {
          event = new Event('change');
        } else {
          event = document.createEvent('Event');
          event.initEvent('change', true, true);
        }

        checkbox.dispatchEvent(event);
        checkbox.checked = false;
      }
    }

    setCurrentValue(onOptionRemove(id));
    onChipsRemove && onChipsRemove(id, props.name);
  };

  const chipsJSX = multiSelect && chips.length > 0 && (
    <div className='rf-select__chips'>
      <Chips variant='accent' items={chips} size={size} onRemove={onChipRemove} disabled={props.disabled}/>
    </div>
  );

  // -------------------------------------------------------------------------------------------------------------------

  /** Очистка поля ввода */
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

  /** Валидация в форме */
  useEffect(() => {
    if (componentNode.current) {
      const option = componentNode.current.querySelector('.rf-select__list input:not([type=text])');
      const input = componentNode.current.querySelector('.rf-input__field');

      if (option && input) {
        const invalid: boolean = option.classList.contains('invalid');
        invalid ? input.classList.add('invalid') : input.classList.remove('invalid');
      }
    }
  });

  // -------------------------------------------------------------------------------------------------------------------

  const onSaveOption = () => {
    saveOption && saveOption(inputValue);
    showNewOptionMessage(false);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const clearIconClass = !props.readOnly && inputValue.length > 0 ? 'rf-select__input-clear--show' : '';

  return (
    <div className={`rf-select ${sizeClass[size]} ${props.className || ''}`} ref={componentNode}>
      <div className='rf-select__input-wrapper'>
        <Input
          placeholder={props.placeholder}
          value={inputValue}
          readOnly={props.readOnly}
          onChange={_onInputChange}
          onKeyUp={onSearch}
          size={size}
          onClick={onInputClick}
          disabled={props.disabled}
        />
        {!props.disabled && (
          <Button
            buttonType='text'
            disabled={props.disabled}
            onClick={clearInput}
            className={`rf-select__input-icon rf-select__input-clear ${clearIconClass}`}>
            <Close/>
          </Button>
        )}
        {!props.disabled && (props.readOnly || inputValue.length === 0) && (
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

      <ul className={`rf-select__list ${showDropdown ? 'rf-select__list--show' : ''}`} ref={dropdownRef}
        onScroll={(e: any) => e.stopPropagation()}>
        {optionsList}
        {newOptionMessage && (<p className='rf-select__add-option' onClick={onSaveOption}>Хотите создать <span className='rf-select__add-option-value'>{inputValue}</span></p>)}
      </ul>

      {chipsJSX}
    </div>
  );
};

export default Select;
