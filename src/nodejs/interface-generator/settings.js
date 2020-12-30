exports.settings = {
  /** SETTINGS */

  /** текущая дата */
  currentDate: new Date(),
  /** дата формата dd.mm.yyyy */
  formatDate:
    new Date().getDay().toString() +
    "." +
    new Date().getMonth().toString() +
    "." +
    new Date().getFullYear().toString(),
  /** новая строчка */
  NEW_LINE: "\n",
  /** папка для интерфейсов */
  dirRecent: process.env.INTERFACE_OUTPUT_FOLDER || "./interfaces",
  /** папка для архива */
  dirArchive: process.env.INTERFACE_ARCHIVE_FOLDER || "./archive",
  /** флаг для отключения меседжей в консоле */
  verbose: false,
  /** очищение мусора из свагера в названия DTO*/
  regexpSwaggerClean: new RegExp(/«|»/g),
  // префикс для файлов интерфейсов
  interfaceFileName: `interface.ts`,
  // вспомогательное слово, куда записывается дескрипшн при преобразовании json в объект для jstoTs
  stringForWriteComment: "zzzSmartDesc",
  /**
   * webUI: https://smartpromotionj2dacd8d8.ru1.hana.ondemand.com/smartpromotion/swagger-ui.html#
   * JSON:  https://smartpromotionj2dacd8d8.ru1.hana.ondemand.com/smartpromotion/v2/api-docs
   * http://45.12.73.107:443/v2/api-docs
   */
  requestOption: {
    method: "GET",
    url: "http://45.12.73.107:443/v2/api-docs",
    strictSSL: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic cG11c2VyOi5OW3RVTk1aJzhfXjomcSE="
    }
  }
};
