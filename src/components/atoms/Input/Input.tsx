import React, {
  FC, HTMLProps, useEffect, useRef, useState
} from 'react';
import { fromEvent } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, map
} from 'rxjs/operators';
import SearchIcon from '../../_icons/search';
import CloseIcon from '../../_icons/close';
import HideIcon from '../../_icons/hide';
import ShowIcon from '../../_icons/show';
import { Size } from '../../../types';
import { sizeClass } from '../../../utils/helpers';
import './Input.scss';
export interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  /** Возможность очистки поля по клику */
  onClear?: () => void;
  /** Возможность поиска */
  search?: boolean;
  /** Плавающий лейбл */
  floatLabel?: string;
  /** Дебаунс */
  debounce?: number;
  /** Вернуть value */
  getValue?: (value: string) => void;
  /** Размер */
  size?: Size;
}

const Input: FC<IInputProps> = ({
  onClear,
  debounce = 300,
  search = false,
  floatLabel,
  getValue,
  size = 'medium',
  ...props
}: IInputProps) => {
  /** Ref */
  const ref = useRef<HTMLInputElement>(null);

  /** Хук для плавающего лейбла */
  const [floatClass, setFloatClass] = useState<string>('');

  /** Иконка показать/скрыть пароль */
  const [showPassword, setShowPassword] = useState(false);

  /** Значение поля */
  const [value, setValue] = useState<string>(props.defaultValue?.toString() || props.value?.toString() || '');

  // ------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    /** Подписываемся на ввод текста */
    let sub: any;

    if (ref.current) {
      sub = fromEvent(ref.current, 'keyup')
        .pipe(
          map((e: Event) => e),
          debounceTime(debounce),
          distinctUntilChanged()
        )
        .subscribe((e: any) => {
          setValue(e.target.value);
          props.onKeyUp && props.onKeyUp(e);
          getValue && getValue(e.target.value);
        });
    }

    return () => {
      try {
        sub && sub.unsubscribe();
      } catch (e) {
        console.log(e);
      }
    };
  }, [
    onClear,
    debounce,
    props.onKeyUp,
    search
  ]);

  // ------------------------------------------------------------------------------------------------------------------
  /** Очистка поля ввода и сброс результатов поиска */
  const clearInput = () => {
    if (ref.current) {
      ref.current.value = '';
      setValue('');
      onClear && onClear();
      floatLabel && setFloatClass('');
    }
  };

  /** Кнопка поиска и сброса */
  const closeButton = onClear && value.length > 0 && (
    <button className='rf-input__action rf-input__action-clear' onClick={clearInput}>
      <CloseIcon/>
    </button>
  );

  /** Кнопка поиска */
  const searchButton = search && value.length === 0 && (
    <button className='rf-input__action rf-input__action-search'>
      <SearchIcon/>
    </button>
  );

  // ------------------------------------------------------------------------------------------------------------------
  /** Показать пароль, если type="password" */
  const togglePassword = () => {
    if (ref.current) {
      setShowPassword(!showPassword);
      ref.current.type = ref.current.type === 'text' ? 'password' : 'text';
    }
  };

  /** Кнопка отображения пароля */
  const showButton = props.type === 'password' && (
    <button className='rf-input-action rf-password-action' type='button' onClick={togglePassword}>
      {showPassword ? <ShowIcon/> : <HideIcon/>}
    </button>
  );

  // ------------------------------------------------------------------------------------------------------------------
  /** Плавающий лейбл */
  const labelText = floatLabel && <label className='rf-input__label'>{floatLabel}</label>;

  /** Добавляем активный класс, если инпут заполнен */
  const handleFloatLabel = () => {
    if (floatLabel) {
      setFloatClass(ref.current && ref.current.value ? 'rf-active-float' : '');
    }
  };

  // ------------------------------------------------------------------------------------------------------------------

  const floatLabelClass = floatLabel ? 'rf-input__field--with-label' : '';
  const iconClass = search || onClear ? 'rf-input__with-icon' : '';

  return (
    <div className={`rf-input ${props.className || ''}`}>
      <input
        {...props}
        ref={ref}
        className={`rf-input__field ${floatLabelClass} ${floatClass} ${sizeClass[size]} ${iconClass}`}
        autoComplete='off'
        type={props.type || 'text'}
        onKeyUp={handleFloatLabel}
      />
      {labelText}
      {showButton}
      {closeButton}
      {searchButton}
    </div>
  );
};

export default Input;
