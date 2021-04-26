"use strict";
var request = require("request"); // работа с API swagger
var fs = require("fs-extra"); // создание папок и файлов
var SwaggerParser = require("swagger-parser"); // резолвит референс на swagger API
var fetch = require("node-fetch"); // крутые реквесты
require("dotenv").config(); // подгружает .env фаил
/** папка из env */
var mockDir = process.env.INTERFACE_MOCKS_FOLDER
    ? process.env.INTERFACE_MOCKS_FOLDER
    : "./mocks";
/** создание папки интерфейсов */
if (!fs.existsSync(mockDir)) {
    fs.mkdirSync(mockDir);
}
/**
 * controller to DTO hashmap
 */
var hashControllerToDTO = {};
/** удаление ключа в объекте, на будущее */
var removeRemoveProperty = function (obj, prop_to_del) {
    for (prop in obj) {
        if (prop === prop_to_del)
            delete obj[prop];
        else if (typeof obj[prop] === "object")
            removeRemoveProperty(obj[prop], prop_to_del);
    }
};
/**
 * Превращает объект в качественный json на основе swagger api
 * у каждого объекта в swagger есть obj.type, по не му и идет селект
 */
var messResolver = function (obj) {
    for (prop in obj) {
        /** невозможно читать, но на всякий оставлю тут */
        // if (obj[prop].type && obj[prop].type == "integer") {
        //   obj[prop] = 234;
        // } else if (obj[prop].type && obj[prop].type == "string") {
        //   if (obj[prop].enum && obj[prop].enum.length > 0) {
        //     // TODO randomizer for enums
        //     obj[prop] = obj[prop].enum[0];
        //   } else if (obj[prop].example) {
        //     obj[prop] = obj[prop].example;
        //   } else {
        //     obj[prop] = "string";
        //   }
        // } else if (obj[prop].type && obj[prop].type == "object") {
        //   obj[prop] = obj[prop].properties;
        // } else if (obj[prop].type && obj[prop].type == "array") {
        //   let tmpArray = [];
        //   tmpArray.push(obj[prop].items);
        //   obj[prop] = tmpArray;
        // }
        switch (obj[prop].type) {
            case "integer":
                obj[prop] = 234;
                break;
            case "boolean":
                obj[prop] = true;
                break;
            case "string":
                if (obj[prop].enum && obj[prop].enum.length > 0) {
                    // TODO randomizer for enums
                    obj[prop] = obj[prop].enum[0];
                }
                else if (obj[prop].example) {
                    obj[prop] = obj[prop].example;
                }
                else {
                    obj[prop] = "string";
                }
                break;
            case "object":
                obj[prop] = obj[prop].properties;
                break;
            case "array":
                var tmpArray = [];
                tmpArray.push(obj[prop].items);
                obj[prop] = tmpArray;
                break;
            default:
                break;
        }
        /** recursion */
        if (typeof obj[prop] === "object") {
            messResolver(obj[prop]);
        }
    }
};
/** другая либа чтобы не запутаться */
var requestOption = {
    method: "GET",
    url: "https://smartpromotionj2dacd8d8.ru1.hana.ondemand.com/smartpromotion/v2/api-docs",
    strictSSL: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
};
/**
 * Грязные данные для создания таблицы и референсов под интерфейсы
 */
request(requestOption, function (err, res) {
    if (err) {
        console.log(err);
    }
    /** превращение в объект */
    var tmpData = JSON.parse(res.body);
    for (var path in tmpData.paths) {
        /** дефолт */
        var value = "any";
        /** ключ - url запроса */
        var key = tmpData.paths[path].post.tags + path;
        if (tmpData.paths[path].post.responses["200"].schema &&
            tmpData.paths[path].post.responses["200"].schema["$ref"]) {
            value =
                "I" +
                    tmpData.paths[path].post.responses["200"].schema["$ref"]
                        .substr(14)
                        .replace(/«|»/g, "");
        }
        /** таблица с мапингом [requestpasth: value] */
        hashControllerToDTO[key] = value;
    }
}); // ./request
/**
 * webUI: https://smartpromotionj2dacd8d8.ru1.hana.ondemand.com/smartpromotion/swagger-ui.html#
 * JSON:  https://smartpromotionj2dacd8d8.ru1.hana.ondemand.com/smartpromotion/v2/
 */
SwaggerParser.validate("https://smartpromotionj2dacd8d8.ru1.hana.ondemand.com/smartpromotion/v2/api-docs", function (err, jAPI) {
    if (err) {
        console.error(err);
    }
    else {
        console.log("API name: %s, Version: %s", jAPI.info.title, jAPI.info.version);
        /** исправляет сам же этот объект */
        messResolver(jAPI);
        /** body для отправки на сервер, чтобы получить json */
        var oTmpBody = {};
        var _loop_1 = function (path) {
            for (var param in jAPI.paths[path].post.parameters) {
                /** защита от неправильных параметров, парсим только body */
                if (jAPI.paths[path].post.parameters[param].in &&
                    jAPI.paths[path].post.parameters[param].in === "body") {
                    oTmpBody = jAPI.paths[path].post.parameters[param].schema;
                }
            }
            /** реквест на получение JSONß */
            fetch("https://smartpromotionj2dacd8d8.ru1.hana.ondemand.com/smartpromotion" +
                path, {
                method: "POST",
                body: JSON.stringify(oTmpBody),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic bWF0dmV5OnBhc3N3b3Jk"
                }
            })
                .then(function (res) {
                return res ? res.json() : {};
            }) // возвращаем json
                .then(function (json) {
                /** название интерфейса */
                var sTmpInterface = hashControllerToDTO[jAPI.paths[path].post.tags + path];
                /** импорт в TS/ES6 */
                var sImportLine = sTmpInterface === "any"
                    ? ""
                    : "import { " + sTmpInterface + " } from '../interfaces/" + sTmpInterface + ".interface'\n\n";
                /** мок данные */
                var sMockSwaggerData = sImportLine +
                    ("export let mock" + sTmpInterface + ": " + sTmpInterface + " = " + JSON.stringify(json, null, 2) + ";");
                /** игнорит все объекты, где нет return type в response 200 */
                if (sTmpInterface !== "any") {
                    fs.writeFile("mocks/" + sTmpInterface + ".mock.ts", sMockSwaggerData, function (err) {
                        if (err)
                            console.log(err);
                    });
                }
            })
                .catch(function (err) {
                // console.log("кривой конфиг сваггера")
            });
        };
        for (var path in jAPI.paths) {
            _loop_1(path);
        }
    }
});
