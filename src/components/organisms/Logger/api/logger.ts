import { ILogRecord } from '../../../../types';
import { records } from '../Logger';

export function logRecord(item: ILogRecord) {
  if (!localStorage.getItem('recording')) {
    return;
  }

  records.list.push(item);
}

// @ts-ignore
export const reduxLogMiddleware = store => next => action => {
  const result = next(action);

  logRecord({
    timestamp: Date.now(),
    source: 'redux',
    action,
    snapshot: JSON.parse(JSON.stringify(store.getState()))
  });

  return result;
};
