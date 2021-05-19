import React, { useEffect, useState } from 'react';
import './LoggerView.scss';
import Upload from './icons/upload-icon';
import { Store } from 'redux';
import { IFileData, ILogRecord } from '../../../types';
import { FileInput } from '../../../index';

interface IProps {
  push: (url: string) => void;
  store: Store<any, any>;
  reducers: any;
}

const LoggerView: React.FC<IProps> = ({ push, store, reducers }: IProps) => {

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const toggle = (e: KeyboardEvent) => {

      if (e.ctrlKey && e.shiftKey) {
        if (e.keyCode === 12 || e.charCode === 12 || e.key === 'L') {
          setShow((show: boolean) => !show);
        }

        if (e.keyCode === 18 || e.charCode === 18 || e.key === 'R') {
          setShow(false);
        }
      }
    };

    window.addEventListener('keypress', toggle);
    return () => {
      window.removeEventListener('keypress', toggle);
    };
  }, []);

  useEffect(() => {
    document.body.style.paddingBottom = show ? '320px' : '0';
  }, [show]);

  // -------------------------------------------------------------------------------------------------------------------

  const [files, setFiles] = useState<IFileData[]>([]);

  useEffect(() => {
    if (files.length === 0) {
      return;
    }

    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(files[0].file);


    function onReaderLoad(event: any) {
      const data = JSON.parse(event.target.result);
      setData(data);
    }
  }, [files]);


  // -------------------------------------------------------------------------------------------------------------------

  const [source, setSource] = useState<string>('all');

  const sources: string[] = [
    'all',
    'network',
    'redux',
    'console'
  ];

  const filters = (
    <div className='logger-view__header-filters'>
      { sources.map((s: string) => (
        <div key={ s }
          className={ `logger-view__header-filters-button ${source === s ? 'logger-view__header-filters-button--active' : ''}` }
          onClick={ () => setSource(s) }>{ s }</div>
      )) }
    </div>
  );

  // -------------------------------------------------------------------------------------------------------------------

  const [active, setActive] = useState<ILogRecord | undefined>(undefined);
  const [data, setData] = useState<ILogRecord[]>([]);
  const [filteredData, setFilteredData] = useState<ILogRecord[]>([]);

  useEffect(() => {
    const flt: ILogRecord[] = data.filter((r: ILogRecord) => source === 'all' || source === r.source);
    setFilteredData(flt);
  }, [data, source]);

  useEffect(() => {
    if (!show) {
      return;
    }

    const rootReducer = (state: any, action: any) => {
      if (active) {

        if (action.type === 'RESET_STORE') {
          return reducers(undefined, action);
        }

        if (action.type === 'WRITE_STORE') {
          return reducers(active.snapshot, action);
        }
      }

      // Деактивируем все экшены, если режим просмотра
      if (show) {
        return state;
      }

      return reducers(state, action);
    };

    store.replaceReducer(rootReducer);
  }, [active, show]);

  useEffect(() => {
    return () => {
      store.replaceReducer(reducers);
    };
  }, []);


  const onClick = (d: ILogRecord) => {
    if (!d.pathname || d.source !== 'redux') {
      return;
    }

    store.dispatch({ type: 'RESET_STORE' });

    setTimeout(() => {
      store.dispatch({
        type: 'WRITE_STORE',
        payload: d.snapshot
      });

      d.pathname && push(d.pathname);
    });

    setActive(d);
  };


  const dataJSX = filteredData.map((d: ILogRecord) => {
    let name = '';

    switch (d.source) {
    case 'network':

      if (d.snapshot.status !== undefined) {
        name = `[Response] ${d.snapshot.config.url}`;
      } else {
        name = `[Request] ${d.snapshot.url}`;
      }

      break;
    case 'console':
      name = d.name || '';
      break;
    case 'redux':
      name = d.action?.type || '';
      break;
    default:
    }

    const key = d.timestamp + d.source;
    const activeKey = active ? active.timestamp + active.source : '';

    return (
      <div className={ `logger-view__record ${activeKey === key ? 'logger-view__record--active' : ''}` }
        key={ key } onClick={ () => onClick(d) }>
        <div className='logger-view__record-time'>{ new Date(d.timestamp).toLocaleString() }</div>
        <div className='logger-view__record-pathname'>{ d.pathname?.slice(0, 17) }</div>
        <div className='logger-view__record-source'>{ d.source }</div>
        <div className='logger-view__record-name'>{ name }</div>
      </div>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  const placeholder = (
    <div className='logger-view__header-upload'>
      <div
        className={ `logger-view__header-upload-icon ${files.length > 0 ? 'logger-view__header-upload-icon--active' : ''}` }>
        <Upload/>
      </div>
      <span className='logger-view__header-upload-label'>Загрузить файл</span>
    </div>
  );

  // -------------------------------------------------------------------------------------------------------------------

  return (
    show ? (
      <div className='logger-view'>
        <div className='logger-view__inner'>
          <header className='logger-view__header'>
            <div className='logger-view__header-file'>
              <FileInput setFile={ setFiles } buttonType='text' showChips={ false } customPlaceholder={ placeholder }/>
            </div>
            { filters }
          </header>
          <div className='logger-view__list-headers'>
            <div className='logger-view__record logger-view__record-headers'>
              <div className='logger-view__record-time'>Время</div>
              <div className='logger-view__record-pathname'>Путь</div>
              <div className='logger-view__record-source'>Источник</div>
              <div className='logger-view__record-name'>Описание</div>
            </div>
          </div>
          <div className='logger-view__list'>
            { dataJSX }
          </div>
        </div>
      </div>
    ) : null
  );
};

export default LoggerView;
