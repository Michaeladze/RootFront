import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
export declare const RETRY_ID = -10;
export declare function requestWithRetry<T = any>(request$: AxiosObservable<T>, retry: () => void, max?: number, retries?: number[]): any;
