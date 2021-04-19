"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var path = require('path');
var basePath = path.dirname(require.main.filename).split(path.sep).slice(0, -1).join(path.sep);
require(basePath + "/_helpers/stringExtensions");
// /** универсальное логирование */
var log = require(basePath + "/_helpers/log");
var generate = require(basePath + "/_helpers/generate");
/** user IO */
var readline = require('readline');
/** парсинг аргументов RAW */
//const args = process.argv.slice(2);
/** парсинг аргументов в виде объекта */
var argv = require('minimist')(process.argv.slice(2));
/** создание интерфейса для IO */
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
/**
 * test usage:
 * yarn redux --name=test --components=copyCat --project=_template
 * ****************
 * --name:
 * --components:
 * --project:
 * --path:
 */
/**
 * Global variables
 */
/** содержит лист actions, reducers, service, effects */
var LIST_OF_REDUX = [];
/** содержит имя создаваемого файла файла */
var FILE_NAME = '';
/** дефолтное имя проекта */
var PROJECT_NAME = '_template';
/** дефолтное имя пути/папки проекта */
var PROJECT_PATH = '';
/** спрашивает имя файла */
var getNameOfFile = function () {
    return new Promise(function (resolve) {
        rl.question('Введите имя файла (*имя*.action.ts, *имя*.effect.ts): ', function (userInputFilename) {
            FILE_NAME = userInputFilename;
            log('info', "\u0424\u0430\u0439\u043B \u0431\u0443\u0434\u0435\u0442 \u0441\u043E\u0437\u0434\u0430\u043D \u0441 \u0438\u043C\u0435\u043D\u0435\u043C: " + FILE_NAME);
            resolve();
        });
    });
};
var getComponentsNames = function () {
    return new Promise(function (resolve) {
        rl.question('Введите наименования cущностей (для actions, reducers, effects, services) через разделитель "," : ', function (userInputComponents) {
            LIST_OF_REDUX = userInputComponents.replaceAll(" ", ""); // убираем все trailing spaces
            log('info', "actions, reducers, effects, services \u0431\u0443\u0434\u0443\u0442 \u0441\u043E\u0437\u0434\u0430\u043D\u044B \u0434\u043B\u044F: " + LIST_OF_REDUX);
            resolve();
        });
    });
};
var getProjectName = function () {
    return new Promise(function (resolve) {
        rl.question('Введите название проекта в котором будет созданы файлы: ', function (userInputProject) {
            PROJECT_NAME = userInputProject;
            log('info', "\u0418\u043C\u044F \u043F\u0440\u043E\u0435\u043A\u0442\u0430: " + PROJECT_NAME);
            resolve();
        });
    });
};
var getPathName = function () {
    return new Promise(function (resolve) {
        rl.question("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0443\u0442\u044C  *** \u0434\u043E src \u043F\u0440\u043E\u0435\u043A\u0442\u0430, \u043B\u0438\u0431\u043E \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u0443\u0441\u0442\u044B\u043C (root/" + PROJECT_NAME + "/***/src): ", function (userInputPath) {
            PROJECT_PATH = userInputPath;
            log('info', "\u041F\u0443\u0442\u044C \u0437\u0430\u0434\u0430\u043D:root/" + PROJECT_NAME + "/" + ((PROJECT_PATH === "") ? "" : PROJECT_PATH + "/") + "src");
            resolve();
        });
    });
};
/** асинхроная цепочка нескольких вопросов для userInput  */
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!(argv.name)) return [3 /*break*/, 1];
                _a = FILE_NAME = argv.name;
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, getNameOfFile()];
            case 2:
                _a = _e.sent();
                _e.label = 3;
            case 3:
                _a;
                if (!(argv.components)) return [3 /*break*/, 4];
                _b = LIST_OF_REDUX = argv.components;
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, getComponentsNames()];
            case 5:
                _b = _e.sent();
                _e.label = 6;
            case 6:
                _b;
                if (!(argv.project)) return [3 /*break*/, 7];
                _c = PROJECT_NAME = argv.project;
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, getProjectName()];
            case 8:
                _c = _e.sent();
                _e.label = 9;
            case 9:
                _c;
                if (!(argv.path || (argv.path === ''))) return [3 /*break*/, 10];
                _d = PROJECT_PATH = argv.path;
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, getPathName()];
            case 11:
                _d = _e.sent();
                _e.label = 12;
            case 12:
                _d;
                return [4 /*yield*/, generate(FILE_NAME, LIST_OF_REDUX, PROJECT_NAME, PROJECT_PATH)];
            case 13:
                _e.sent();
                rl.close();
                return [2 /*return*/];
        }
    });
}); };
/** старт программы */
main();
/** очистка && goodbye */
rl.on('close', function () {
    log('info', ' Файлы успешно созданы');
    process.exit(0);
});
