'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const childProcess = require('child_process');
const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  .split('/')
  .slice(-1);
console.clear();
module.exports = {
  subjectSeparator: ' ',
  skipQuestions: [
    'body',
    'scope',
    'body',
    'breaking',
    'footer'
  ],
  messages: {
    type: ' \n____________Коммит в ' + branch.toString().toLocaleUpperCase() + '____________\n',
    subject: 'Введите описание:\n',
    confirmCommit: 'Вы уверены?',


  },
  types: [
    // {
    //   name: '✨  feat: Добавление нового функционала',
    //   value: 'feat: [' + branch + '] '
    // },
    {
      name: '🐞 fix: Исправление ошибок',
      value: 'fix: [' + branch + '] ',
    },
    {
      name: '📚 merge: Слияние веток',
      value: 'merge: [' + branch + '] '

    },
    {
      name: '💅 refactor: Правки кода без исправления ошибок или добавления новых функций',
      value: 'refactor: [' + branch + ']'
    }
  ]


};
