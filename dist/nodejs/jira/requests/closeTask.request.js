"use strict";
var request = require('request');
/*создание пр*/
function closeTask(taskId, comment, callback) {
    if (comment === void 0) { comment = ''; }
    if (callback === void 0) { callback = function () { }; }
    var data = {
        method: 'POST',
        url: "https://sbtatlas.sigma.sbrf.ru/jira/rest/api/2/issue/" + taskId + "/transitions",
        strictSSL: false,
        auth: {
            username: global.auth.USERNAME,
            password: global.auth.PASSWORD
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: "{\"transition\": {\"id\": \"" + 5 + "\"}, \"update\": {\n        \"comment\": [\n            {\n                \"add\": {\n                    \"body\": \"" + comment + "\"\n                }\n            }\n        ]\n    }}"
    };
    request(data, function (error) {
        if (error)
            throw new Error(error);
        callback();
    });
}
//--------------------------
exports.closeTask = closeTask;
