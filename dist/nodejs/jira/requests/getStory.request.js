"use strict";
var request = require('request');
/* получение сторей по реквесту*/
function getStory(filter, callback) {
    if (filter === void 0) { filter = 'All'; }
    if (callback === void 0) { callback = function () {
    }; }
    var data = {
        method: 'POST',
        url: 'https://sbtatlas.sigma.sbrf.ru/jira/rest/api/2/search',
        strictSSL: false,
        auth: {
            username: global.auth.USERNAME,
            password: global.auth.PASSWORD
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: "{\n              \"jql\": \"" + global.REQ + "\",\n              \"maxResults\": 100,\n              \"fields\": [\n                \"key\",\n                \"issuetype\",\n                \"description\",\n                \"summary\",\n                \"created\",\n                \"assignee\"\n              ],\n              \"startAt\": 0\n            }"
    };
    request(data, function (error, request, body) {
        if (error)
            throw new Error(error);
        callback(JSON.parse(body).issues.filter(function (i) {
            var result = !!(i.fields.issuetype.subtask);
            result && filter !== 'All' && (result = ~i.fields.summary.indexOf(filter));
            return result;
        }));
    });
}
//--------------------------
exports.getStory = getStory;
