import { useLocation as useLocation1 } from 'react-router-dom';
export var useLocation = function () {
    // @ts-ignore
    var location = useLocation1();
    var query = location.search
        .replace('?', '')
        .split('&')
        .reduce(function (acc, e) {
        var _a = e.split('='), k = _a[0], v = _a[1];
        acc[k] = v;
        return acc;
    }, {});
    location.query = query;
    return location;
};
