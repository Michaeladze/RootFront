import { concatMap, delay, map, retryWhen, takeUntil, tap } from 'rxjs/operators';
import { iif, of, Subject } from 'rxjs';
import { sendNotification } from '../index';
import { removeNotification } from '../components/molecules/Notifications/Notifications';
var stop$ = new Subject();
export var RETRY_ID = -10;
export function requestWithRetry(request$, retry, max, retries) {
    if (max === void 0) { max = 10; }
    if (retries === void 0) { retries = [5, 15, 30]; }
    return request$.pipe(map(function (_a) {
        var data = _a.data;
        return data;
    }), retryWhen(function (errors) {
        return errors.pipe(takeUntil(stop$), concatMap(function (e, i) {
            return iif(function () { return i >= max; }, of(e).pipe(tap(function () {
                removeNotification(RETRY_ID);
                stop$.next(true);
            })), of(e).pipe(tap(function () {
                var s = i >= retries.length ? retries[retries.length - 1] : retries[i];
                sendNotification({
                    id: RETRY_ID,
                    message: '',
                    countdown: retries,
                    variant: 'info',
                    retryAction: function () {
                        stop$.next(true);
                        retry();
                    },
                    cancelRetry: function () {
                        stop$.next(true);
                    }
                }, s * 1000);
            }), delay(1000 * (i >= retries.length ? retries[retries.length - 1] : retries[i]))));
        }));
    }));
}
