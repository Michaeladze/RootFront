const { settings } = require("../settings");

/** рекурсивное даление ключа в объекте, на будущее */
const removeRemoveProperty = (obj, prop_to_del) => {
  for (let prop in obj) {
    if (prop === prop_to_del) delete obj[prop];
    else if (typeof obj[prop] === "object")
      removeRemoveProperty(obj[prop], prop_to_del);
  }
};

/**
 * Превращает объект в json на основе swagger api удобный для конвертации бибилиотеки JsToTs и добавления комментариев
 * у каждого объекта defenitions в swagger есть obj.type, по нему и идет селект
 */
let messResolver = obj => {
  for (let prop in obj) {
    switch (obj[prop].type) {
      case "integer":
        /** для каждой проперти создает доп проперти с комментарием */
        if (obj[prop].description) {
          obj[settings.stringForWriteComment + prop] = obj[prop].description;
        }

        // 234 - просто число, чтобы потом библиотека JstoTs - определилиа этот тип как number
        obj[prop] = 234;
        break;
      case "boolean":
        /** для каждой проперти создает доп проперти с комментарием */
        if (obj[prop].description) {
          obj[settings.stringForWriteComment + prop] = obj[prop].description;
        }

        // true - просто boolean, чтобы потом библиотека JstoTs - определилиа этот тип как boolean
        obj[prop] = true;
        break;
      case "string":
        /** для каждой проперти создает доп проперти с комментарием */
        if (obj[prop].description) {
          obj[settings.stringForWriteComment + prop] = obj[prop].description;
        }

        if (obj[prop].enum && obj[prop].enum.length > 0) {
          obj[prop] = obj[prop].enum[0];
        } else {
          obj[prop] = "string";
        }
        break;
      case "object":
        /** для каждой проперти создает доп проперти с комментарием */
        //TODO добавил !obj[prop].properties чтобы у верхнего уровня DTO не брал комментарий. В будущем надо будет и обрабатывать эти комментарии чтобы давать описание самому интерфейсу.
        if (obj[prop].description && !obj[prop].properties) {
          obj[settings.stringForWriteComment + prop] = obj[prop].description;
        }
        obj[prop] = obj[prop].properties;
        break;
      case "array":
        /** для каждой проперти создает доп проперти с комментарием */
        if (obj[prop].description) {
          obj[settings.stringForWriteComment + prop] = obj[prop].description;
        }

        let tmpArray = [];
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

const syncVersionWorkaround = version => {
  let tmpVersion = version.split(".");
  tmpVersion[2] = parseInt(tmpVersion[2]);
  tmpVersion[2] = tmpVersion[2] + 1;
  tmpVersion[2] = tmpVersion[2].toString();
  tmpVersion = tmpVersion.join(".");
  return tmpVersion;
};

// Экспорт вспомогательных функций
exports.removeRemoveProperty = removeRemoveProperty;
exports.messResolver = messResolver;
exports.syncVersionWorkaround = syncVersionWorkaround;
