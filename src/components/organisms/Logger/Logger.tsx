import React, {
  useEffect, useRef, useState
} from 'react';
import './Logger.scss';
import Play from './icons/play-icon';
import Pause from './icons/pause-icon';
import Save from './icons/save-icon';
import Trash from './icons/trash-icon';
import { logRecord } from './api/logger';
import { ILogRecord } from '../../../types';

interface IProps {
  format?: 'txt' | 'json';
  onSave?: (data: ILogRecord[]) => void;
}

export const records: { list: ILogRecord[] } = { list: [] };

const Logger: React.FC<IProps> = ({ format = 'json', onSave }: IProps) => {


  const [show, setShow] = useState<boolean>(false);
  const [showDownload, setShowDownload] = useState<boolean>(false);

  useEffect(() => {
    const toggle = (e: KeyboardEvent) => {

      if (e.ctrlKey && e.shiftKey && e.keyCode === 84 || e.charCode === 84 || e.key === 'R') {
        setShow((show: boolean) => !show);
      }
    };

    window.addEventListener('keypress', toggle);
    return () => {
      window.removeEventListener('keypress', toggle);
    };
  }, []);


  // -------------------------------------------------------------------------------------------------------------------

  const oldLog = useRef(console.log);

  const decorateConsoleLog = (revert = false) => {
    if (revert) {
      console.log = oldLog.current;
      return;
    }

    oldLog.current = console.log;
    console.log = (...rest: any) => {
      logRecord({
        timestamp: Date.now(),
        source: 'console',
        snapshot: rest.join(' ')
      });
      oldLog.current.apply(console, rest);
    };
  };

  // -------------------------------------------------------------------------------------------------------------------

  const downloadFile = (data: ILogRecord[]) => {
    onSave && onSave(data);

    let url = '';

    if (format === 'json') {
      url = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
    } else {
      const text = data.reduce((acc: string, r: ILogRecord) => {
        acc += `${new Date(r.timestamp).toLocaleString()} [${r.source}] `;
        switch (r.source) {
        case 'network':
          break;
        case 'console':
          break;
        case 'redux':
          break;
        default:
        }
        acc += `Данные: ${JSON.stringify(r.snapshot)}`;
        acc += '\n';
        return acc;
      }, '');
      url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    }

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `records_${new Date().toLocaleDateString()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const [active, setActive] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [timeStr, setTimeStr] = useState<string>('00:00:00');
  const timerId = useRef<any>(undefined);
  const delay = useRef<number>(1000);

  const clear = (dropTime = true) => {
    localStorage.removeItem('recording');
    dropTime && setTime(0);
    clearTimeout(timerId.current);
  };

  useEffect(() => {
    if (active) {
      localStorage.setItem('recording', 'true');

      timerId.current = setTimeout(function tick() {
        setTime((t: number) => t + 1);
        timerId.current = setTimeout(tick, delay.current);
      }, delay.current);
    } else {
      clear(false);
    }
  }, [active]);

  useEffect(() => {
    decorateConsoleLog();

    return () => {
      decorateConsoleLog(true);
      clear();
    };
  }, []);


  useEffect(() => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    const h = hours < 10 ? '0' + hours : `${hours}`;
    const m = minutes < 10 ? '0' + minutes : `${minutes}`;
    const s = seconds < 10 ? '0' + seconds : `${seconds}`;

    setTimeStr(h + ':' + m + ':' + s);
  }, [time]);

  // -------------------------------------------------------------------------------------------------------------------

  const indicatorClass = active ? 'logger__indicator--active' : '';

  const onClick = () => {
    if (showDownload) {
      downloadFile(records.list);
      records.list = [];

      setShowDownload(false);
      setTime(0);
      return;
    }

    if (active) {
      if (records.list.length > 0) {
        setShowDownload(true);
      }

      setActive(false);
      setTime(0);
      return;
    }

    setActive(true);
  };

  const removeRecord = (e: React.MouseEvent) => {
    e.stopPropagation();
    records.list = [];
    setActive(false);
    setShowDownload(false);
    setTime(0);
  };

  // -------------------------------------------------------------------------------------------------------------------

  return (
    show ? (
      <div className='logger' onClick={ onClick }>
        <div className='logger__icon'>
          { showDownload ? <Save/> : active ? <Pause/> : <Play/> }
        </div>
        <div className='logger__info'>
          <p
            className='logger__label'>{ showDownload ? 'Сохранить запись' : active ? 'Остановить запись' : 'Начать запись' }</p>
          <p className='logger__time'>{ timeStr }</p>
        </div>

        {
          showDownload ? <Trash className='logger__remove' onClick={ removeRecord }/> :
            <div className={ `logger__indicator ${indicatorClass}` }/>
        }
      </div>
    ) : null
  );
};

export default Logger;
