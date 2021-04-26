import React, {
  FC, HTMLProps, useEffect, useRef, useState
} from 'react';
import './Textarea.scss';
import { fromEvent } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, map
} from 'rxjs/operators';

export interface ITextareaProps extends HTMLProps<HTMLTextAreaElement> {
  /** Автоматическое изменение высоты */
  autoResize?: boolean;
  /** Количество строк */
  initialRowCount?: number;
  /** Последовательность перехода при нажатии на Tab */
  tabIndex?: number;
  /** Дебаунс */
  debounce?: number;
  /** Вернуть value */
  getValue?: (value: string) => void;
}

const Textarea: FC<ITextareaProps> = ({
  autoResize = false,
  initialRowCount = 3,
  debounce = 300,
  getValue,
  ...props
}: ITextareaProps) => {
  /** Ссылка на поле */
  const textarea = useRef<HTMLTextAreaElement>(null);

  /** Количество рядов */
  const [rows, setRows] = useState(initialRowCount);

  const [value, setValue] = useState<string>(props.defaultValue?.toString() || props.value?.toString() || '');

  useEffect(() => {
    /** При фокусе на поле раскрываем его */
    if (textarea.current && autoResize) {
      setRows(textarea.current.value.split('\n').length + 1);
    }

    /** Подписываемся на ввод текста */
    let sub: any;

    if (textarea.current) {
      sub = fromEvent(textarea.current, 'keyup')
        .pipe(
          map((e: Event) => e),
          debounceTime(debounce),
          distinctUntilChanged()
        )
        .subscribe((e: any) => {
          if (textarea.current) {
            if (autoResize) {
              setRows(textarea.current.value.split('\n').length + 1);
            }

            if (props.maxLength) {
              setValue(textarea.current.value);
            }

            getValue && getValue(textarea.current.value);
          }

          props.onKeyUp && props.onKeyUp(e);
        });
    }

    return () => {
      try {
        autoResize && sub && sub.unsubscribe();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return (
    <div className={`rf-textarea__wrapper ${props.className}`}>
      <textarea
        {...props}
        ref={textarea}
        rows={rows}
        className={'rf-textarea-field'}
        autoComplete='off'
      />
      {props.maxLength && props.maxLength > 0 && (
        <p className='rf-textarea__max-length'>
          {value.length} / {props.maxLength}
        </p>
      )}
    </div>
  );
};

export default Textarea;
