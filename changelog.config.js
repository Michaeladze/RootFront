'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const childProcess = require('child_process');
const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  .split('/')
  .slice(-1);

module.exports = {
  disableEmoji: false,
  list: ['feat', 'fix', 'merge', 'refactor'],
  maxMessageLength: 100,
  minMessageLength: 3,
  questions: ['type', 'subject'],
  types: {
    feat: {
      description: 'Добавление нового функционала',
      emoji: '[' + branch + ']',
      value: 'feat'
    },
    fix: {
      description: 'Исправление ошибок',
      value: 'fix',
      emoji: '[' + branch + ']',
    },
    merge: {
      description: 'Слияние веток',
      emoji: '[' + branch + ']',
      value: 'merge'

    },
    refactor: {
      description: 'Правки кода без исправления ошибок или добавления новых функций',
      emoji: '[' + branch + ']',
      value: 'refactor'
    }
  }
};
