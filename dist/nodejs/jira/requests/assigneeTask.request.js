"use strict";
var request = require('request');
var log = require('./../utils/log').log;
function assigneeTaskTo(task, callback, user) {
    if (callback === void 0) { callback = function () {
    }; }
    if (user === void 0) { user = global.auth.USERNAME; }
    var data = {
        method: 'PUT',
        url: "https://sbtatlas.sigma.sbrf.ru/jira/rest/api/2/issue/" + task + "/assignee",
        strictSSL: false,
        auth: {
            username: global.auth.USERNAME,
            password: global.auth.PASSWORD
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: "{\n\"name\":\"" + user + "\"\n}"
    };
    request(data, function (error) {
        if (error)
            throw new Error(error);
        log("info", " задача успешно назначена на вас");
        callback();
    });
}
//--------------------------
exports.assigneeTaskTo = assigneeTaskTo;
