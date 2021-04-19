"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestWithRetry = exports.RETRY_ID = void 0;
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var index_1 = require("../index");
var Notifications_1 = require("../components/molecules/Notifications/Notifications");
var stop$ = new rxjs_1.Subject();
exports.RETRY_ID = -10;
function requestWithRetry(request$, retry, max, retries) {
    if (max === void 0) { max = 10; }
    if (retries === void 0) { retries = [5, 15, 30]; }
    return request$.pipe(operators_1.map(function (_a) {
        var data = _a.data;
        return data;
    }), operators_1.retryWhen(function (errors) {
        return errors.pipe(operators_1.takeUntil(stop$), operators_1.concatMap(function (e, i) {
            return rxjs_1.iif(function () { return i >= max; }, rxjs_1.of(e).pipe(operators_1.tap(function () {
                Notifications_1.removeNotification(exports.RETRY_ID);
                stop$.next(true);
            })), rxjs_1.of(e).pipe(operators_1.tap(function () {
                var s = i >= retries.length ? retries[retries.length - 1] : retries[i];
                index_1.sendNotification({
                    id: exports.RETRY_ID,
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
            }), operators_1.delay(1000 * (i >= retries.length ? retries[retries.length - 1] : retries[i]))));
        }));
    }));
}
exports.requestWithRetry = requestWithRetry;
