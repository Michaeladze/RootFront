"use strict";
// подгружает .env фаил
var JsonToTS = require("json-to-ts"); // создает интерфейсы
var request = require("request"); // работа с API swagger
var fs = require("fs-extra"); // создание папок и файлов
// const VM = require("./versionManager"); // менеджер версий
var chalk = require("chalk"); // цветной терминал
// const stringDiff = require("pretty-string-diff"); // отображение различий в консоли
var SwaggerParser = require("@apidevtools/swagger-parser"); // резолвит $ref в сваггере
var R = require("ramda"); // библиотека с вспомогательными функциями
var _a = require("./src/utils"), messResolver = _a.messResolver, removeRemoveProperty = _a.removeRemoveProperty
// syncVersionWorkaround
; // вспомогательный функционал
var testJson = require("./testData").testJson; //тестовый json на котором отрабатывался функцонила
var settings = require("./settings").settings;
require("dotenv").config();
/** SETTINGS */
/** текущая версия архива */
// let version = VM.getVersion();
/** переменная содержит репорт в md */
// let fileMarkdown = "";
/** все измененые интерфейсы */
// let allChanges = "";
/** если нет папки interfaces */
var firstFetch = false;
/** флаг сравнения с архивом */
// let bCompareInterface = true;
// Удаляем папку с интерфейсами, чтобы не оставались артефакты от прошлой сборки интерфейсов.
if (fs.existsSync(settings.dirRecent)) {
    fs.removeSync(settings.dirRecent);
    console.log(chalk.green("\u041F\u0430\u043F\u043A\u0430 \u0441 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430\u043C \u0443\u0434\u0430\u043B\u0435\u043D\u0430."));
    /** создание папки для интерфейсов */
    firstFetch = true;
    fs.mkdirSync(settings.dirRecent);
}
else {
    /** создание папки для интерфейсов */
    firstFetch = true;
    fs.mkdirSync(settings.dirRecent);
}
/** запрос к свагеру */
request(settings.requestOption, function (err, res) {
    if (err)
        console.error(err, "request");
    var dirtyData = JSON.parse(res.body);
    //Преобразуем все refs в json swagger в json в defenitions
    SwaggerParser.validate(dirtyData, function (err, tmpData) {
        if (err)
            console.error(err, "swaggerParser");
        var definitions = R.prop("definitions", tmpData);
        var cleanerDtoName = R.fromPairs(R.map(function (item) { return [
            R.head(item).replace(settings.regexpSwaggerClean, ""),
            R.last(item)
        ]; }, R.toPairs(definitions)));
        // console.log(cleanerDtoName);
        /** обязательные проперти для каждого интерфейса [interface: [propOne, propTwo]]  */
        // Сохраняем названия переменных которые required в интерфейсах
        var hashRequiredProps = {};
        for (var DTO in cleanerDtoName) {
            var sKey = "I" + DTO;
            hashRequiredProps[sKey] = cleanerDtoName[DTO].required || null;
        }
        messResolver(cleanerDtoName);
        var _loop_1 = function (DTO) {
            /** таблица с комментариями */
            var hashTableComment = {};
            /** переменная, которая будет содержать интерфейс для каждого DTO */
            var sFinalInterface = "";
            /** таблица с коментариями */
            for (var comment in cleanerDtoName[DTO]) {
                if (comment.match(settings.stringForWriteComment)) {
                    var cleanProperty = comment.substr(settings.stringForWriteComment.length);
                    hashTableComment[DTO + cleanProperty] = cleanerDtoName[DTO][comment];
                    removeRemoveProperty(cleanerDtoName[DTO], comment);
                }
            }
            // console.log(hashTableComment, "hashTableComment");
            /** мутирующий JSON для инпута */
            var obj = cleanerDtoName[DTO];
            /** генерация интерфейса DTO из JSON */
            JsonToTS(obj).forEach(function (typeInterface) {
                /** разделить по строчно */
                var tmpInterface = typeInterface.split(/\r?\n/);
                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        for (var i = 0; i < tmpInterface.length; i++) {
                            /** меняет стандартное имя объекта на имя интерфейса */
                            var regxRootObj = new RegExp("RootObject");
                            /** поиск переменных */
                            var myReg = new RegExp("  " + property);
                            /** поиск и замена regxRootObj */
                            if (tmpInterface[i].match(regxRootObj)) {
                                /** понятное имя класса */
                                tmpInterface[i] = tmpInterface[i].replace("interface RootObject", "export interface I" + DTO);
                            }
                            /** обязательные/необязательные интерфейсы */
                            if (tmpInterface[i].match(/[a-zA-Z0-9]: /)) {
                                /** [0] будет содержать имя проперти '  sProprtyName' */
                                var aTmpSplitter = [];
                                aTmpSplitter = tmpInterface[i].split(":");
                                /** делаем lookup через propertyName, если не находим ее в массиве обязательных, делаем замену с ':' на '?:'*/
                                var sInterfaceDtoName = "I" + DTO;
                                if (!(hashRequiredProps[sInterfaceDtoName] &&
                                    hashRequiredProps[sInterfaceDtoName].includes(aTmpSplitter[0].trim()))) {
                                    tmpInterface[i] = tmpInterface[i].replace(": ", "?: ");
                                }
                            }
                            /** добавляет коментарий */
                            //hashTableComment
                            // AggregateMethodescalias: 'Alias для отображения нормального названия на фронте',
                            // AggregateMethodescid: 'Идентификатор метода агрегации',
                            // AggregateMethodescname: 'Значение метода агрегации'
                            //DTO
                            // AggregateMethodesc
                            //propperty
                            // alias
                            if (hashTableComment[DTO + property] &&
                                tmpInterface[i].match(myReg)) {
                                // проверка на наличие коммента
                                // if (hashTableComment[property]) {
                                tmpInterface[i] =
                                    "  /**" +
                                        hashTableComment[DTO + property] +
                                        "*/" +
                                        settings.NEW_LINE +
                                        tmpInterface[i];
                                // }
                            }
                            /** доп фильтер, хз на скоко норм */
                            //Тут мы удалем то что лежит, если свойсво объект или массив. Так как это не записалось в хеш выше и соответственно не удалилось. И соответственно не добавились комментарии к внутренним объектам.
                            if (tmpInterface[i].match(settings.stringForWriteComment)) {
                                tmpInterface[i] = "}";
                                tmpInterface.splice(i + 1);
                            }
                        }
                    }
                }
                /** соединение массива в большой string. каждый элемент новая строчка. */
                tmpInterface = tmpInterface.join("\r\n");
                /** мутация интерфейса */
                sFinalInterface =
                    sFinalInterface === ""
                        ? tmpInterface
                        : (sFinalInterface += settings.NEW_LINE + tmpInterface);
            });
            /** имя файла и интерфейса без мусора */
            var sInterfaceFilename = "I" + DTO + "." + settings.interfaceFileName;
            var pathInterfaceFile = settings.dirRecent + "/" + sInterfaceFilename;
            try {
                /** создает новый фаил с именем интерфейса */
                fs.writeFile(pathInterfaceFile, sFinalInterface, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    if (settings.verbose)
                        console.log(chalk.green("\u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441: " + sInterfaceFilename + " \u0431\u044B\u043B \u0441\u043E\u0437\u0434\u0430\u043D \u0432 " + settings.dirRecent));
                });
            }
            catch (e) {
                console.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441: " + sInterfaceFilename);
                console.error(e);
            }
        };
        /** выборка интерфейсов JAVA из swagger */
        for (var DTO in cleanerDtoName) {
            _loop_1(DTO);
        } // closes!!
        // try {
        //   fs.writeFile(
        //     `${settings.dirArchive}/${syncVersionWorkaround(version)}/data.json`,
        //     JSON.stringify(dirtyData, null, 2),
        //     function(err) {
        //       if (err) {
        //         // return console.log(err);
        //       }
        //     }
        //   );
        // } catch (e) {
        //   console.log("nothing to write");
        //   // console.log(e)
        // }
    }); // ../request()
    console.log(chalk.green("\u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u044B \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B"));
}); // request
/** создание папки архива */
// if (!firstFetch) {
//   if (fs.existsSync(`${settings.dirRecent}`) && !fs.existsSync(`${settings.dirArchive}`)) {
//     bCompareInterface = false;
//     fs.mkdirSync(`${settings.dirArchive}`);
//     if (!fs.existsSync(`${settings.dirArchive}/${syncVersionWorkaround(version)}`)) {
//       bCompareInterface = false;
//       fs.mkdirSync(`${settings.dirArchive}/${syncVersionWorkaround(version)}`);
//     }
//   }
// }
// let aInterfaces = [];
// let aArchives = [];
/** срабатывает только если есть папка interfaces  */
// if (!firstFetch) {
//   try {
//     /** папка может быть, но в ней может не быть некоторых файлов */
//     fs.readdirSync(`${settings.dirArchive}/${version}`).forEach(file => {
//       aArchives.push(file);
//     });
//   } catch (e) {
//     console.log("no past archives");
//   }
// }
// try {
//   fs.readdirSync(`${settings.dirRecent}`).forEach(file => {
//     aInterfaces.push(file);
//   });
// } catch (e) {
//   console.log("no interfaces");
// }
/**
 * сравнение архива и интерфейса
 * в эту логику можно будет прикруть много фишек (лог старых и новых файлов), нужно решить проблему с версионостью
 */
// if (bCompareInterface && !firstFetch) {
//   //TODO Проверить что за сравнение такое...
//   if (aArchives !== [] && aArchives.length > 0) {
//     for (let interfaceS in aInterfaces) {
//       try {
//         const oldTsFile = fs
//           .readFileSync(
//             `${settings.dirArchive}/${version}/${aInterfaces[interfaceS]}`,
//             "utf8"
//           )
//           .toString()
//           .trim();
//         const newTsFile = fs
//           .readFileSync(`${settings.dirRecent}/${aInterfaces[interfaceS]}`, "utf8")
//           .toString()
//           .trim();
//         if (oldTsFile && !(oldTsFile === newTsFile)) {
//           const diff = stringDiff(oldTsFile, newTsFile);
//           console.log(aInterfaces[interfaceS]);
//           console.log(diff);
//           allChanges += `
//             ### ${aInterfaces[interfaceS]}
//             ***Новый:***
//             \`\`\`typescript
//             ${newTsFile}
//             \`\`\`
//             ***Старый:***
//             \`\`\`typescript
//             ${oldTsFile}
//             \`\`\`
//             ___
//             `;
//         }
//       } catch (e) {
//         console.log(`failed: ${aInterfaces[interfaceS]}`);
//         // console.log(e)
//       }
//     }
//   }
// }
// if (!firstFetch) {
//   fs.copy(
//     settings.dirRecent,
//     `${settings.dirArchive}/${syncVersionWorkaround(version)}`,
//     function(err) {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(
//           `Версия: ${syncVersionWorkaround(version)}, добавлена в архив`
//         );
//         /** финальная структура md */
//         fileMarkdown = `## ДАТА
//                 ${settings.formatDate}
//                 ## ИЗМЕНЕНИЯ
//                 ${allChanges ? allChanges : "Нет изменений, все актуально"}
//                 `;
//         fs.writeFile(
//           `${settings.dirArchive}/${syncVersionWorkaround(version)}/report.md`,
//           fileMarkdown,
//           function(err) {
//             if (err) {
//               return console.log(err);
//             }
//           }
//         );
//       }
//     }
//   );
// }
/** async version up */
// VM.upVersion();
