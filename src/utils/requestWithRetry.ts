import {
  concatMap, delay, map, retryWhen, takeUntil, tap
} from 'rxjs/operators';
import {
  iif, Observable, of, Subject
} from 'rxjs';
import { AxiosResponse } from 'axios';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import { sendNotification } from '../index';
import { removeNotification } from '../components/molecules/Notifications/Notifications';

const stop$ = new Subject<boolean>();

export const RETRY_ID = -10;

export function requestWithRetry<T = any>(
  request$: AxiosObservable<T>,
  retry: () => void,
  max = 10,
  retries: number[] = [5, 15, 30]
): any {
  return request$.pipe(
    map(({ data }: AxiosResponse<T>) => data),
    retryWhen((errors: Observable<any>) =>
      errors.pipe(
        takeUntil(stop$),
        concatMap((e: Error, i: number) =>
          iif(
            () => i >= max,
            of(e).pipe(tap(() => {
              removeNotification(RETRY_ID);
              stop$.next(true);
            })),
            of(e).pipe(
              tap(() => {
                const s = i >= retries.length ? retries[retries.length - 1] : retries[i];
                sendNotification(
                  {
                    id: RETRY_ID,
                    message: '',
                    countdown: retries,
                    variant: 'info',
                    retryAction() {
                      stop$.next(true);
                      retry();
                    },
                    cancelRetry() {
                      stop$.next(true);
                    }
                  },
                  s * 1000
                );
              }),
              delay(1000 * (i >= retries.length ? retries[retries.length - 1] : retries[i]))
            )
          ))
      ))
  );
}
