module.exports = {
  extends: ['@ptsecurity/commitlint-config'],
  rules: {
    'header-max-length': [2, 'always', 150],
    'body-max-line-length': [2, 'always', 72],
    'footer-max-line-length': [2, 'always', 72],
    'scope-case': [2, 'always', ['lower-case']],
    'subject-case': [0, 'never', ['upper-case', 'sentence-case', 'start-case', 'pascal-case']],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'ci',
        'chore',
        'fix',
        'build',
        'release',
        'docs',
        'refactor',
        'revert',
        'style',
        'test',
        'perf',
        'merge',
        'wip'
      ]
    ]
  }
};
