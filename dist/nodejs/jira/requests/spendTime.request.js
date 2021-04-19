"use strict";
var request = require('request');
/*создание пр*/
function spendTime(task, comment, time, callback) {
    if (comment === void 0) { comment = ''; }
    if (time === void 0) { time = '0'; }
    if (callback === void 0) { callback = function () { }; }
    var data = {
        method: 'POST',
        url: "https://sbtatlas.sigma.sbrf.ru/jira/rest/api/2/issue/" + task + "/worklog",
        strictSSL: false,
        auth: {
            username: global.auth.USERNAME,
            password: global.auth.PASSWORD
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: "{\n        \"timeSpentSeconds\": " + (+time.slice(0, 2) * 3600 + (+time.slice(2, 4) * 60)) + ",\n        \"comment\": \"" + comment + "\"\n    }"
    };
    request(data, function (error) {
        if (error)
            throw new Error(error);
        callback();
    });
}
//--------------------------
exports.spendTime = spendTime;
