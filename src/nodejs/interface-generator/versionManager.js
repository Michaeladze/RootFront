const { exec } = require("child_process"); // использоваение консоли на host
const pjson = require("./package.json"); // package.json фаил

/** возвращает актуальную версию в package.json */
const getVersion = () => {
  return pjson.version;
};

/** увеличивает версию в package.json */
const upVersion = () => {
  exec("npm version patch --no-git-tag-version", (error, stdout, stderr) => {
    if (error) {
      console.log(`ошибка модуля: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`ошибка файловой системы: ${stderr}`);
      return;
    }

    console.log(`Текущая версия интерфейсов: ${stdout}`);
  });
};

/** экспорт функций */
exports.getVersion = getVersion;
exports.upVersion = upVersion;
