// подгружает .env фаил
const JsonToTS = require("json-to-ts"); // создает интерфейсы
const request = require("request"); // работа с API swagger
const fs = require("fs-extra"); // создание папок и файлов
// const VM = require("./versionManager"); // менеджер версий
const chalk = require("chalk"); // цветной терминал
// const stringDiff = require("pretty-string-diff"); // отображение различий в консоли
const SwaggerParser = require("@apidevtools/swagger-parser"); // резолвит $ref в сваггере
const R = require("ramda"); // библиотека с вспомогательными функциями
const {
  messResolver,
  removeRemoveProperty
  // syncVersionWorkaround
} = require("./src/utils"); // вспомогательный функционал
const { testJson } = require("./testData"); //тестовый json на котором отрабатывался функцонила
const { settings } = require("./settings");
require("dotenv").config();

/** SETTINGS */
/** текущая версия архива */
// let version = VM.getVersion();
/** переменная содержит репорт в md */
// let fileMarkdown = "";
/** все измененые интерфейсы */
// let allChanges = "";
/** если нет папки interfaces */
let firstFetch = false;
/** флаг сравнения с архивом */
// let bCompareInterface = true;

// Удаляем папку с интерфейсами, чтобы не оставались артефакты от прошлой сборки интерфейсов.
if (fs.existsSync(settings.dirRecent)) {
  fs.removeSync(settings.dirRecent);
  console.log(chalk.green(`Папка с интерфейсам удалена.`));
  /** создание папки для интерфейсов */
  firstFetch = true;
  fs.mkdirSync(settings.dirRecent);
} else {
  /** создание папки для интерфейсов */
  firstFetch = true;
  fs.mkdirSync(settings.dirRecent);
}

/** запрос к свагеру */
request(settings.requestOption, (err, res) => {
  if (err) console.error(err, "request");

  let dirtyData = JSON.parse(res.body);

  //Преобразуем все refs в json swagger в json в defenitions
  SwaggerParser.validate(dirtyData, (err, tmpData) => {
    if (err) console.error(err, "swaggerParser");

    let definitions = R.prop("definitions", tmpData);
    let cleanerDtoName = R.fromPairs(
      R.map(
        item => [
          R.head(item).replace(settings.regexpSwaggerClean, ""),
          R.last(item)
        ],
        R.toPairs(definitions)
      )
    );

    // console.log(cleanerDtoName);

    /** обязательные проперти для каждого интерфейса [interface: [propOne, propTwo]]  */
    // Сохраняем названия переменных которые required в интерфейсах

    let hashRequiredProps = {};

    for (let DTO in cleanerDtoName) {
      let sKey = `I${DTO}`;
      hashRequiredProps[sKey] = cleanerDtoName[DTO].required || null;
    }

    messResolver(cleanerDtoName);

    /** выборка интерфейсов JAVA из swagger */
    for (let DTO in cleanerDtoName) {
      /** таблица с комментариями */
      let hashTableComment = {};

      /** переменная, которая будет содержать интерфейс для каждого DTO */
      let sFinalInterface = "";

      /** таблица с коментариями */
      for (let comment in cleanerDtoName[DTO]) {
        if (comment.match(settings.stringForWriteComment)) {
          const cleanProperty = comment.substr(
            settings.stringForWriteComment.length
          );
          hashTableComment[DTO + cleanProperty] = cleanerDtoName[DTO][comment];
          removeRemoveProperty(cleanerDtoName[DTO], comment);
        }
      }
      // console.log(hashTableComment, "hashTableComment");

      /** мутирующий JSON для инпута */
      let obj = cleanerDtoName[DTO];
      /** генерация интерфейса DTO из JSON */
      JsonToTS(obj).forEach(typeInterface => {
        /** разделить по строчно */
        let tmpInterface = typeInterface.split(/\r?\n/);

        for (let property in obj) {
          if (obj.hasOwnProperty(property)) {
            for (let i = 0; i < tmpInterface.length; i++) {
              /** меняет стандартное имя объекта на имя интерфейса */
              let regxRootObj = new RegExp("RootObject");
              /** поиск переменных */
              let myReg = new RegExp("  " + property);

              /** поиск и замена regxRootObj */
              if (tmpInterface[i].match(regxRootObj)) {
                /** понятное имя класса */
                tmpInterface[i] = tmpInterface[i].replace(
                  "interface RootObject",
                  `export interface I${DTO}`
                );
              }

              /** обязательные/необязательные интерфейсы */
              if (tmpInterface[i].match(/[a-zA-Z0-9]: /)) {
                /** [0] будет содержать имя проперти '  sProprtyName' */
                let aTmpSplitter = [];
                aTmpSplitter = tmpInterface[i].split(":");

                /** делаем lookup через propertyName, если не находим ее в массиве обязательных, делаем замену с ':' на '?:'*/
                const sInterfaceDtoName = `I${DTO}`;

                if (
                  !(
                    hashRequiredProps[sInterfaceDtoName] &&
                    hashRequiredProps[sInterfaceDtoName].includes(
                      aTmpSplitter[0].trim()
                    )
                  )
                ) {
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

              if (
                hashTableComment[DTO + property] &&
                tmpInterface[i].match(myReg)
              ) {
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
      const sInterfaceFilename = `I${DTO}.${settings.interfaceFileName}`;

      const pathInterfaceFile = `${settings.dirRecent}/${sInterfaceFilename}`;

      try {
        /** создает новый фаил с именем интерфейса */
        fs.writeFile(pathInterfaceFile, sFinalInterface, function(err) {
          if (err) {
            return console.log(err);
          }
          if (settings.verbose)
            console.log(
              chalk.green(
                `интерфейс: ${sInterfaceFilename} был создан в ${settings.dirRecent}`
              )
            );
        });
      } catch (e) {
        console.error(`Не удалось загрузить интерфейс: ${sInterfaceFilename}`);
        console.error(e);
      }
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
  console.log(chalk.green(`Интерфейсы сгенерированы`));
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
