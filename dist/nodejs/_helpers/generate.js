"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
/** доступ к файловой системе */
var fs = require('fs');
/** доступ к пути файлой системы */
var path = require('path');
/** colored console */
var chalk = require('chalk');
var generate = function (_filename, _components, _project, _path) {
    //const args = minimist(process.argv);
    //let basicPath = `apps/${PROJECT_PATH}${_project}/src/_store/`;
    var basicPath = "" + _path + _project + "/src/_store/";
    //basicPath = basicPath.replace('$$project$$', args.project);
    var ap = 'actions';
    var ep = 'effects';
    var rp = 'reducers';
    var sp = 'services';
    // const name = args.name;
    var currentArray = [
        basicPath,
        basicPath + ap,
        basicPath + ep,
        basicPath + rp,
        basicPath + sp
    ];
    currentArray.forEach(function (el) {
        if (!fs.existsSync(el)) {
            fs.mkdirSync(el);
        }
    });
    //======================================================================================================================
    var componentPath = [basicPath, ap];
    /** темплейты для экшенов*/
    var commonActionLib = "import { createActions } from 'redux-actions';";
    var commonAction1 = "\nexport enum $$$name$$$  {\n  Pending = '[Pending] $$$name$$$',\n  Success = '[Success] $$$name$$$'\n}\n";
    //const commonActionSep = '//------------------------------------------------------------';
    var commonActionTmp = '\ncreateActions({';
    var commonActionTmp1 = "\n});\n";
    var commonAction2 = "\n  [$$$name$$$.Pending]: undefined,\n  [$$$name$$$.Success]: undefined,";
    //=====================
    _components.split(',').forEach(function (action) {
        action = action.charAt(0).toUpperCase() + action.substr(1);
        if (fs.existsSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".actions.ts"])))) {
            var data = fs.readFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".actions.ts"])), 'utf-8');
            //const d = data.split(commonActionSep);
            var newData = data.replace('createActions({', '##--##' + 'createActions({');
            var d = newData.split(/##--##/);
            if (~data.indexOf("[Pending] " + action)) {
                console.log(chalk.yellow("\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 " + action + " \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"));
            }
            else {
                d[1] = d[1].replace(commonActionTmp, '').replace(commonActionTmp1, '');
                fs.writeFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".actions.ts"])), (d[0] + commonAction1 + commonActionTmp + d[1] + commonAction2 + commonActionTmp1).replaceAll('$$$name$$$', action));
            }
        }
        else {
            fs.writeFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".actions.ts"])), (commonActionLib + commonAction1 + commonActionTmp + commonAction2 + commonActionTmp1).replaceAll('$$$name$$$', action));
        }
    });
    //======================================================================================================================
    /** темплейты для редусеров*/
    var reducersPath = [basicPath, rp];
    var commonReducersLib = "import { Action, handleActions } from 'redux-actions';\nimport * as a from '../actions/" + _filename + ".actions';\n\n";
    var commonReducersRedInterface = "export interface I" + _filename + " {}\n\n";
    var commonReducersStateInterface = "export interface I" + _filename + "State {\n  collection: I" + _filename + "[];\n}\n\n";
    var commonReducersInitState = "const initialState: I" + _filename + "State = { \n  collection: []\n};\n\n";
    var commonReducersTmp = "const " + _filename + "Reducer = handleActions({";
    var commonReducersTemplate = "\n  [a.$$$name$$$.Success]: (state: I" + _filename + "State, action: Action<I" + _filename + "[]>) => ({\n    collection: action.payload\n  }),\n";
    var commonReducersTmp1 = "\n}, initialState);";
    var commonReducersExport = "\nexport default " + _filename + "Reducer;";
    //=====================
    _components.split(',').forEach(function (reducer) {
        reducer = reducer.charAt(0).toUpperCase() + reducer.substr(1);
        if (fs.existsSync(path.resolve.apply(path, __spreadArray(__spreadArray([], reducersPath), [_filename + ".reducer.ts"])))) {
            var data = fs.readFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], reducersPath), [_filename + ".reducer.ts"])), 'utf-8');
            var reducerName = data.match(/const.*Reducer/gi);
            var newData = data.replace(reducerName, '##--##' + reducerName);
            var d = newData.split(/##--##/);
            if (~data.indexOf("[a." + reducer + ".Success]")) {
                console.warn(chalk.yellow("\u0420\u0435\u0434\u0443\u0441\u0435\u0440 " + reducer + " \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"));
            }
            else {
                d[1] = d[1].replace(commonReducersTmp, '').replace(commonReducersTmp1, '').replace(commonReducersTemplate, '').replace(commonReducersExport, '').trim();
                fs.writeFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], reducersPath), [_filename + ".reducer.ts"])), (d[0] + commonReducersTmp + commonReducersTemplate + d[1] + commonReducersTmp1 + '\n' + commonReducersExport).replaceAll('$$$name$$$', reducer));
            }
        }
        else {
            fs.writeFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], reducersPath), [_filename + ".reducer.ts"])), (commonReducersLib + commonReducersRedInterface
                + commonReducersStateInterface + commonReducersInitState + commonReducersTmp
                + commonReducersTemplate + commonReducersTmp1 + '\n' + commonReducersExport).replaceAll('$$$name$$$', reducer));
        }
    });
    //======================================================================================================================
    /** темплейты для эффектов*/
    componentPath = [basicPath, ep];
    var commonEffectLib = "import { ActionsObservable, ofType } from 'redux-observable';\nimport { catchError, map, switchMap, tap } from 'rxjs/operators';\nimport { of } from 'rxjs';\nimport { Action } from 'redux-actions';\nimport * as a from '../actions/$$$namepath$$$.actions';\nimport * as s from '../services/$$$namepath$$$.service';\n";
    var commonEffectSep = '//------------------------------------------------------------';
    var commonEffect = "\nexport const $$$namel$$$Effect$ = (actions$: ActionsObservable<Action<any>>) =>\n  actions$.pipe(\n    ofType(a.$$$name$$$.Pending),\n    switchMap(({ payload }) =>\n      s.$$$namel$$$(payload).pipe(\n        map((result:any) => ({ type: a.$$$name$$$.Success, payload: result })),\n        tap(() =>{}\n        /*  sendNotification({\n            sMessage: `\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0437\u0430\u043F\u0443\u0449\u0435\u043D`,\n            iStatus: 1\n          })*/\n        ),\n        catchError((e: Error) =>(of({type:'error'})/* showErrorMessage(e)*/)\n        )\n      )\n    )\n  );\n";
    _components.split(',').forEach(function (action) {
        action = action.charAt(0).toUpperCase() + action.substr(1);
        var actionl = action.charAt(0).toLowerCase() + action.substr(1);
        if (fs.existsSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".effects.ts"])))) {
            var data = fs.readFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".effects.ts"])), 'utf-8');
            if (~data.indexOf("export const " + actionl)) {
                console.warn(chalk.yellow("\u042D\u0444\u0444\u0435\u043A\u0442 " + actionl + "Effect$ \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"));
            }
            else {
                fs.writeFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".effects.ts"])), (data + commonEffect).replaceAll('$$$name$$$', action).replaceAll('$$$namel$$$', actionl));
            }
        }
        else {
            fs.writeFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".effects.ts"])), (commonEffectLib + commonEffectSep + commonEffect)
                .replaceAll('$$$name$$$', action)
                .replaceAll('$$$namel$$$', actionl)
                .replaceAll('$$$namepath$$$', _filename));
        }
    });
    //======================================================================================================================
    /** темплейты для сервисов*/
    componentPath = [basicPath, sp];
    var commonServiceLib = "import Axios from 'axios-observable';\nimport { map } from 'rxjs/operators';\nimport { Observable } from 'rxjs';\n";
    var commonService = "\nexport const $$$name$$$ = (data:any ={} ): Observable<any> => {\n/* return Axios.get('https://api.github.com/orgs/octokit/repos', {\n    headers: {\n      'NOINTERCEPT':true,\n      'Access-Control-Allow-Origin': '*',\n      'Access-Control-Allow-Headers': 'X-Requested-With'\n    }\n  }).pipe(\n  map(({ data }) => data)\n);*/\n  return Axios.post('---\u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443----',data).pipe(\n    map(({ data }) => data)\n  );\n};\n";
    _components.split(',').forEach(function (action) {
        action = action.charAt(0).toLowerCase() + action.substr(1);
        if (fs.existsSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".service.ts"])))) {
            var data = fs.readFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".service.ts"])), 'utf-8');
            if (~data.indexOf("export const " + action)) {
                console.warn(chalk.yellow("\u0421\u0435\u0440\u0432\u0438\u0441 " + action + " \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"));
            }
            else {
                fs.writeFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".service.ts"])), (data + commonService).replaceAll('$$$name$$$', action));
            }
        }
        else {
            fs.writeFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], componentPath), [_filename + ".service.ts"])), (commonServiceLib + commonService).replaceAll('$$$name$$$', action));
        }
    });
    var content = '';
    if (fs.existsSync(basicPath + "index.ts")) {
        content = fs.readFileSync(basicPath + "index.ts");
        /** Импорт эффектов и итоговая строка импорта */
        var effectsImported = _components.split(',').reduce(function (acc, item, index, arr) {
            if (acc === void 0) { acc = ''; }
            var name = item.charAt(0).toLowerCase() + item.substr(1);
            return acc + (name + "Effect$" + (index === arr.length - 1 ? '' : ', '));
        }, '');
        var effectsImport = "\nimport { " + effectsImported + " } from './effects/" + _filename + ".effects';";
        /** Импорт редьюсера итоговая сторка */
        var reducerName = _filename.charAt(0).toLowerCase() + _filename.substr(1);
        var reducerImport = "\nimport { " + reducerName + "Reducer } from './reducers/" + _filename + ".reducer';\n";
        /** запись импортов в файл */
        var index = content.indexOf('/*[imports:end]');
        content = content.slice(0, index) + effectsImport + reducerImport + content.slice(index, content.length);
        /** запись редьюсеров в файл */
        index = content.indexOf('/*[reducers:end]');
        var injectReducers = "\n  injectAsyncReducer(store, '" + reducerName + "', " + _filename + "Reducer);\n";
        content = content.slice(0, index) + injectReducers + content.slice(index, content.length);
        /** запись эффектов в файл */
        index = content.indexOf('/*[effects:end]');
        var effects = _components.split(',').reduce(function (acc, item) {
            if (acc === void 0) { acc = ''; }
            var name = item.charAt(0).toLowerCase() + item.substr(1);
            return acc + ("\n  addEpics(" + name + "Effect$);");
        }, '');
        content = content.slice(0, index) + effects + '\n' + content.slice(index, content.length);
        fs.writeFileSync(basicPath + "index.ts", content);
    }
    //======================================================================================================================
};
module.exports = generate;
