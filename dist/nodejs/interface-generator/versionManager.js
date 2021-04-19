"use strict";
var exec = require("child_process").exec; // использоваение консоли на host
var pjson = require("./package.json"); // package.json фаил
/** возвращает актуальную версию в package.json */
var getVersion = function () {
    return pjson.version;
};
/** увеличивает версию в package.json */
var upVersion = function () {
    exec("npm version patch --no-git-tag-version", function (error, stdout, stderr) {
        if (error) {
            console.log("\u043E\u0448\u0438\u0431\u043A\u0430 \u043C\u043E\u0434\u0443\u043B\u044F: " + error.message);
            return;
        }
        if (stderr) {
            console.log("\u043E\u0448\u0438\u0431\u043A\u0430 \u0444\u0430\u0439\u043B\u043E\u0432\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B: " + stderr);
            return;
        }
        console.log("\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043E\u0432: " + stdout);
    });
};
/** экспорт функций */
exports.getVersion = getVersion;
exports.upVersion = upVersion;
