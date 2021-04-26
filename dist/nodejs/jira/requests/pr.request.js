"use strict";
var child_process = require('child_process');
var lib = require('./../create');
var log = require("./../utils/log").log;
var request = require('request');
/*создание пр*/
function createPr(callback) {
    if (callback === void 0) { callback = function () { }; }
    var data = {
        method: 'POST',
        url: lib.utils.currentRepoLink(),
        strictSSL: false,
        auth: {
            username: global.auth.USERNAME,
            password: global.auth.PASSWORD
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: "{\n    \"title\": \"" + lib.utils.currentBrunch(true) + "\",\n    \"description\": \"\",\n    \"state\": \"OPEN\",\n    \"open\": true,\n    \"closed\": false,\n    \"fromRef\": {\n        \"id\": \"" + lib.utils.currentBrunch(true) + "\"\n    },\n    \"toRef\": {\n        \"id\": \"develop\"\n    }\n    \n}"
    };
    child_process.execSync('git pull origin develop');
    var tmp = child_process.execSync('git status -s').toString().trim().split('\n').filter(function (i) { return !~i.indexOf('??'); }).filter(function (i) { return !i.indexOf('.'); });
    if (tmp.length) {
        log('error', "\u041D\u0435 \u0437\u0430\u043A\u043E\u043C\u0438\u0447\u0435\u043D\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B");
        console.log(tmp);
        console.log("");
        callback();
    }
    else {
        request(data, function (error, response) {
            if (error)
                throw new Error(error);
            log("info", " Pull request  успешно создан");
            callback();
        });
    }
}
//--------------------------
exports.createPr = createPr;
