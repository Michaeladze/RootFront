import React, {
  FC, useContext, useEffect, useMemo, useState
} from 'react';
import './TimeElement.scss';
import { arrayTimeHours, arrayTimeMinutes } from './timeData';
import Button from '../Button';
import Arrow from '../../_icons/angle-down';
import { MenuContext } from '../../molecules/Menu/Menu';

export interface ITimepickerProps {
  updateTime: (newTime: string) => void;
  min: string;
  max: string;
  value?: string;
}

const TimeElement: FC<ITimepickerProps> = ({ updateTime, min, max, value }: ITimepickerProps) => {
  const [time, setTime] = useState<string | null>(null);
  const [translate, setTranslate] = useState(false);

  useEffect(() => {
    if (value) {
      setTime(value.split(':')[0]);
    }
  }, [value]);

  const clickHandler = (event: React.MouseEvent) => {
    setTime((event.currentTarget as HTMLElement).innerText.split(':')[0]);
    setTranslate(true);
  };

  const applyTimeHandler = (event: React.MouseEvent, onClose: () => void) => {
    updateTime((event.currentTarget as HTMLElement).innerText);
    setTranslate(false);
    onClose();
  };

  // -------------------------------------------------------------------------------------------------------------------

  const [minH] = useMemo(() => min.split(':'), [min]);
  const [maxH] = useMemo(() => max.split(':'), [max]);

  /** Сравнение времени */
  const isValidTime = (time: string, flag: 'h' | 'm'): boolean => {
    const [h, m] = time.split(':');

    if (flag === 'h') {
      return h >= minH && h <= maxH;
    }

    const cur = h + m;
    const minStr = min.replace(':', '');
    const maxStr = max.replace(':', '');

    return cur >= minStr && cur <= maxStr;
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Ячейки с часами */
  const itemsHour = arrayTimeHours.map((itemRow: string[], id) => (
    <div key={id} className='rf-time-element__item-row'>
      {itemRow.map((item) => (
        <Button
          buttonType='text'
          key={item}
          disabled={!isValidTime(item, 'h')}
          className='rf-time-element'
          onClick={clickHandler}>
          {item}
        </Button>
      ))}
    </div>
  ));

  const { onClose } = useContext(MenuContext);

  /** Ячейки с минутами */
  const itemsMinutes = arrayTimeMinutes.map((itemRow: string[], id) => (
    <div key={id} className='rf-time-element__item-row'>
      {itemRow.map((item) => {
        const t = (time || '00') + item;
        return (
          <Button
            buttonType='text'
            key={item}
            disabled={!isValidTime(t, 'm')}
            className='rf-time-element'
            onClick={(e: React.MouseEvent) => applyTimeHandler(e, onClose)}>
            {t}
          </Button>
        );
      })}
    </div>
  ));

  return (
    <div className='rf-time-element__wrapper'>
      <div className={`rf-time-element__translate ${translate ? 'element__translate--active' : ''}`}>
        <div className='rf-time-element__column'>
          <div className='rf-time-element__header-container'>
            <div className='rf-time-element__name'>Выберите час</div>
          </div>
          {itemsHour}
        </div>
        <div className={'rf-time-element__column'}>
          <div className='rf-time-element__header-container'>
            <Button style={{ paddingRight: '4px' }} onClick={() => setTranslate(false)} buttonType='text'>
              <Arrow className='rf-time-element__icon' />
            </Button>
            <div className='rf-time-element__name'>Выберите минуты</div>
          </div>
          {itemsMinutes}
        </div>
      </div>
    </div>
  );
};

export default TimeElement;
