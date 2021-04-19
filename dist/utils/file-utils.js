"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFile = exports.getBase64 = void 0;
var executablesList = [
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
var getBase64 = function (file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            return resolve({
                file: file,
                base64: reader.result
            });
        };
        reader.onerror = function (error) { return reject(error); };
    });
};
exports.getBase64 = getBase64;
/**
 * Валидация файла
 * @param file
 * @param options - параметры валидации {maxSize: number, accept: string}
 *
 */
var validateFile = function (file, options) {
    var valid = true;
    var error = '';
    if (file && options) {
        if (options.maxSize !== undefined && file.size / 1024 > options.maxSize) {
            valid = false;
            error = 'Превышен максимальный размер файла';
            console.log('%c [Ошибка] Превышен максимальный размер файла', 'color: #FF5722');
        }
        var ext_1 = file.name.split('.');
        var isExecutable = executablesList.some(function (x) {
            return ext_1.length > 0 && ext_1[ext_1.length - 1] === x;
        });
        if (isExecutable) {
            console.log("%c [\u041E\u0448\u0438\u0431\u043A\u0430] \u0412\u044B \u043F\u044B\u0442\u0430\u0435\u0442\u0435\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u043D\u044F\u0435\u043C\u044B\u0439 \u0444\u0430\u0439\u043B (" + file.name + ")", 'color: #FF5722');
            return {
                valid: false,
                error: "\u0412\u044B \u043F\u044B\u0442\u0430\u0435\u0442\u0435\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u043D\u044F\u0435\u043C\u044B\u0439 \u0444\u0430\u0439\u043B (" + file.name + ")"
            };
        }
        if (options.accept !== undefined && options.accept !== '*') {
            var ext_2 = file.type.split('/');
            if (!options.accept.includes("" + ext_2[0])) {
                valid = false;
                error = "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u043F \u0444\u0430\u0439\u043B\u0430 (" + file.name + ")";
                console.log("%c [\u041E\u0448\u0438\u0431\u043A\u0430] \u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u043F \u0444\u0430\u0439\u043B\u0430 (" + file.name + ")", 'color: #FF5722');
            }
            else {
                var t = options.accept.split('/');
                if (t[1] !== '*' && !options.accept.includes("" + ext_2[1])) {
                    valid = false;
                    error = "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u043F \u0444\u0430\u0439\u043B\u0430 (" + file.name + ")";
                    console.log("%c [\u041E\u0448\u0438\u0431\u043A\u0430] \u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u043F \u0444\u0430\u0439\u043B\u0430 (" + file.name + ")", 'color: #FF5722');
                }
            }
        }
    }
    return {
        valid: valid,
        error: error
    };
};
exports.validateFile = validateFile;
