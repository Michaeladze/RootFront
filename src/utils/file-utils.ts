import { IFileData } from '../types';

const executablesList: string[] = [
  'action',
  'apk',
  'app',
  'bat',
  'bin',
  'cmd',
  'com',
  'command',
  'cpl',
  'csh',
  'exe',
  'gadget',
  'inf1',
  'ins',
  'inx',
  'ipa',
  'isu',
  'job',
  'jse',
  'ksh',
  'lnk',
  'msc',
  'msi',
  'msp',
  'mst',
  'osx',
  'out',
  'paf',
  'pif',
  'prg',
  'ps1',
  'reg',
  'rgs',
  'run',
  'scr',
  'sct',
  'shb',
  'shs',
  'u3p',
  'vb',
  'vbe',
  'vbs',
  'vbscript',
  'workflow',
  'ws',
  'wsf',
  'wsh',
  '0xe',
  '73',
  '89',
  'a6p',
  'ac',
  'acc',
  'acr',
  'actm',
  'ahk',
  'air',
  'app',
  'arscript',
  'as',
  'asb',
  'awk',
  'azw2',
  'beam',
  'btm',
  'cel',
  'celx',
  'chm',
  'cof',
  'crt',
  'dek',
  'dld',
  'dmc',
  'docm',
  'dotm',
  'dxl',
  'ear',
  'ebm',
  'ebs',
  'ebs2',
  'ecf',
  'eham',
  'elf',
  'es',
  'ex4',
  'exopc',
  'ezs',
  'fas',
  'fky',
  'fpi',
  'frs',
  'fxp',
  'gs',
  'ham',
  'hms',
  'hpf',
  'hta',
  'iim',
  'ipf',
  'isp',
  'jar',
  'js',
  'jsx',
  'ts',
  'tsx',
  'kix',
  'lo',
  'ls',
  'mam',
  'mcr',
  'mel',
  'mpx',
  'mrc',
  'ms',
  'ms',
  'mxe',
  'nexe',
  'obs',
  'ore',
  'otm',
  'pex',
  'plx',
  'potm',
  'ppam',
  'ppsm',
  'pptm',
  'prc',
  'pvd',
  'pwc',
  'pyc',
  'pyo',
  'qpx',
  'rbx',
  'rox',
  'rpj',
  's2a',
  'sbs',
  'sca',
  'scar',
  'scb',
  'script',
  'smm',
  'spr',
  'tcp',
  'thm',
  'tlb',
  'tms',
  'udf',
  'upx',
  'vlx',
  'vpm',
  'wcm',
  'widget',
  'wiz',
  'wpk',
  'wpm',
  'xap',
  'xbap',
  'xlam',
  'xlm',
  'xlsm',
  'xltm',
  'xqt',
  'xys',
  'zl9'
];

/** Конвертация файла в base64 */
export const getBase64 = (file: File): Promise<IFileData> => {
  return new Promise<IFileData>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve({
        file,
        base64: reader.result as string
      });
    reader.onerror = (error) => reject(error);
  });
};

interface IOptions {
  maxSize?: number;
  accept?: string;
}

interface IValidationResult {
  valid: boolean;
  error: string;
}

/**
 * Валидация файла
 * @param file
 * @param options - параметры валидации {maxSize: number, accept: string}
 *
 */

export const validateFile = (file: File, options?: IOptions): IValidationResult => {
  let valid = true;
  let error = '';

  if (file && options) {
    if (options.maxSize !== undefined && file.size / 1024 > options.maxSize) {
      valid = false;
      error = 'Превышен максимальный размер файла';
      console.log('%c [Ошибка] Превышен максимальный размер файла', 'color: #FF5722');
    }

    const ext = file.name.split('.');
    const isExecutable = executablesList.some((x: string) => {
      return ext[1] && ext[1] === x;
    });

    if (isExecutable) {
      console.log(`%c [Ошибка] Вы пытаетесь загрузить исполняемый файл (${file.name})`, 'color: #FF5722');
      return {
        valid: false,
        error: `Вы пытаетесь загрузить исполняемый файл (${file.name})`
      };
    }

    if (options.accept !== undefined && options.accept !== '*') {
      const ext = file.type.split('/');

      if (!options.accept.includes(`${ext[0]}`)) {
        valid = false;
        error = `Неверный тип файла (${file.name})`;
        console.log(`%c [Ошибка] Неверный тип файла (${file.name})`, 'color: #FF5722');
      } else {
        const t = options.accept.split('/');

        if (t[1] !== '*' && !options.accept.includes(`${ext[1]}`)) {
          valid = false;
          error = `Неверный тип файла (${file.name})`;
          console.log(`%c [Ошибка] Неверный тип файла (${file.name})`, 'color: #FF5722');
        }
      }
    }
  }

  return {
    valid,
    error
  };
};
