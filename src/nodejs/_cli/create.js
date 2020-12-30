const path = require('path');
const basePath = path.dirname(require.main.filename).split(path.sep).slice(0,-1).join(path.sep);
require(`${basePath}/_helpers/stringExtensions`);

// /** универсальное логирование */
 const log = require(`${basePath}/_helpers/log`);
 const generate = require(`${basePath}/_helpers/generate`);
/** user IO */
const readline = require('readline');
/** парсинг аргументов RAW */
//const args = process.argv.slice(2);
/** парсинг аргументов в виде объекта */
let argv = require('minimist')(process.argv.slice(2));

/** создание интерфейса для IO */
const rl = readline.createInterface({
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
let LIST_OF_REDUX = [];
/** содержит имя создаваемого файла файла */
let FILE_NAME = '';
/** дефолтное имя проекта */
let PROJECT_NAME = '_template';
/** дефолтное имя пути/папки проекта */
let PROJECT_PATH = '';

/** спрашивает имя файла */
const getNameOfFile = () => {
    return new Promise((resolve) => {
        rl.question('Введите имя файла (*имя*.action.ts, *имя*.effect.ts): ', (userInputFilename) => {
            FILE_NAME = userInputFilename;
            log('info', `Файл будет создан с именем: ${FILE_NAME}`);
            resolve()
        })
    })
};
  
const getComponentsNames = () => {
    return new Promise((resolve) => {
        rl.question('Введите наименования cущностей (для actions, reducers, effects, services) через разделитель "," : ', (userInputComponents) => {
            LIST_OF_REDUX = userInputComponents.replaceAll(" ", ""); // убираем все trailing spaces
            log('info', `actions, reducers, effects, services будут созданы для: ${LIST_OF_REDUX}`);
            resolve()
        })
    })
};

const getProjectName = () => {
    return new Promise((resolve) => {
        rl.question('Введите название проекта в котором будет созданы файлы: ', (userInputProject) => {
            PROJECT_NAME = userInputProject;
            log('info', `Имя проекта: ${PROJECT_NAME}`);
            resolve()
        })
    })
}

const getPathName = () => {
    return new Promise((resolve) => {
        rl.question(`Введите путь  *** до src проекта, либо оставьте пустым (root/${PROJECT_NAME}/***/src): `, (userInputPath) => {
            PROJECT_PATH = userInputPath;
            log('info', `Путь задан:root/${PROJECT_NAME}/${(PROJECT_PATH === "")?"":`${PROJECT_PATH}/`}src`);
            resolve()
        })
    })
};


/** асинхроная цепочка нескольких вопросов для userInput  */
const main = async () => {
    (argv.name) ? FILE_NAME = argv.name : await getNameOfFile();
    (argv.components) ? LIST_OF_REDUX = argv.components : await getComponentsNames();
    (argv.project) ? PROJECT_NAME = argv.project : await getProjectName();
    (argv.path || (argv.path === '')) ? PROJECT_PATH = argv.path : await getPathName() ;
    await generate(FILE_NAME, LIST_OF_REDUX, PROJECT_NAME, PROJECT_PATH);
    rl.close()
};

/** старт программы */
main();

/** очистка && goodbye */
rl.on('close', () => {
    log('info',' Файлы успешно созданы');
    process.exit(0);
});
