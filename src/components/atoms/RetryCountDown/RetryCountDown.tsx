import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import './RetryCountDown.scss';
import Button from '../Button';

interface IProps {
  time: number[];
  action?: () => void;
}

const RetryCountDown: React.FC<IProps> = ({ time, action }: IProps) => {
  const interval = useRef<any>(null);
  const pointer = useRef<number>(0);
  const [value, setValue] = useState<number>(time[pointer.current]);
  const [disabled, setDisabled] = useState(false);

  const clearInterval = () => {
    interval.current && clearTimeout(interval.current);
  };

  const startInterval = useCallback(() => {
    interval.current = setTimeout(function tick() {
      setValue((c: number) => c - 1);

      interval.current = setTimeout(tick, 1000);
    }, 1000);
  }, [setValue]);

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval();
    };
  }, [time]);

  useEffect(() => {
    if (value === 0) {
      clearInterval();

      if (pointer.current >= time.length - 1) {
        setValue(time[time.length - 1]);
      } else {
        pointer.current += 1;
        setValue(time[pointer.current]);
      }

      startInterval();
    }
  }, [value]);

  const onRetry = () => {
    clearInterval();
    pointer.current = 0;
    setValue(time[pointer.current]);
    startInterval();
    action && action();

    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 5000);
  };

  return (
    <div className='retry-notification'>
      <span>Повторное подключение через {value} сек.</span>
      <Button
        buttonType='primary'
        variant='info'
        size='small'
        onClick={onRetry}
        className='retry-now__button'
        disabled={disabled}>
        Повторить сейчас
      </Button>
    </div>
  );
};

export default RetryCountDown;
