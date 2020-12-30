
/** доступ к файловой системе */
const fs = require('fs');
/** доступ к пути файлой системы */
const path = require('path');
/** colored console */
const chalk = require('chalk');

const generate = (_filename, _components, _project, _path) => {

    //const args = minimist(process.argv);
    //let basicPath = `apps/${PROJECT_PATH}${_project}/src/_store/`;
    let basicPath = `${_path}${_project}/src/_store/`;
  
    //basicPath = basicPath.replace('$$project$$', args.project);
    const ap = 'actions';
    const ep = 'effects';
    const rp = 'reducers';
    const sp = 'services';
    // const name = args.name;

    const currentArray = [
        basicPath,
        basicPath + ap,
        basicPath + ep,
        basicPath + rp,
        basicPath + sp
    ];

    currentArray.forEach(el => {
        if (!fs.existsSync(el)) {
            fs.mkdirSync(el);
        }
    });
    //======================================================================================================================
    let componentPath = [basicPath, ap];
    /** темплейты для экшенов*/
    const commonActionLib = `import { createActions } from 'redux-actions';`;
    const commonAction1 = `
export enum $$$name$$$  {
  Pending = '[Pending] $$$name$$$',
  Success = '[Success] $$$name$$$'
}\n`;
    //const commonActionSep = '//------------------------------------------------------------';
    const commonActionTmp = '\ncreateActions({';
    const commonActionTmp1 = `
});\n`;
    const commonAction2 = `
  [$$$name$$$.Pending]: undefined,
  [$$$name$$$.Success]: undefined,`;
    //=====================
    _components.split(',').forEach((action) => {
        action = action.charAt(0).toUpperCase() + action.substr(1);
        if (fs.existsSync(path.resolve(...componentPath, `${_filename}.actions.ts`))) {
            const data = fs.readFileSync(path.resolve(...componentPath, `${_filename}.actions.ts`), 'utf-8');
            //const d = data.split(commonActionSep);

            const newData = data.replace('createActions({', '##--##' + 'createActions({');
            const d = newData.split(/##--##/);

            if (~data.indexOf(`[Pending] ${action}`)) {
                console.log(chalk.yellow(`Действие ${action} уже существует`));
            } else {
                d[1] = d[1].replace(commonActionTmp, '').replace(commonActionTmp1, '');
                fs.writeFileSync(path.resolve(...componentPath, `${_filename}.actions.ts`),
                    (d[0] + commonAction1 + commonActionTmp + d[1] + commonAction2 + commonActionTmp1).replaceAll('$$$name$$$', action));
            }
        } else {
            fs.writeFileSync(path.resolve(...componentPath, `${_filename}.actions.ts`),
                (commonActionLib + commonAction1 + commonActionTmp + commonAction2 + commonActionTmp1).replaceAll('$$$name$$$', action));
        }
    });

    //======================================================================================================================
    /** темплейты для редусеров*/
    const reducersPath = [basicPath, rp];

    const commonReducersLib = `import { Action, handleActions } from 'redux-actions';
import * as a from '../actions/${_filename}.actions';\n\n`;
    const commonReducersRedInterface = `export interface I${_filename} {}\n\n`;
    const commonReducersStateInterface = `export interface I${_filename}State {
  collection: I${_filename}[];
}\n\n`;

    const commonReducersInitState = `const initialState: I${_filename}State = { \n  collection: []\n};\n\n`;
    const commonReducersTmp = `const ${_filename}Reducer = handleActions({`;
    const commonReducersTemplate = `
  [a.$$$name$$$.Success]: (state: I${_filename}State, action: Action<I${_filename}[]>) => ({
    collection: action.payload
  }),\n`;
    const commonReducersTmp1 = `\n}, initialState);`;
    
    const commonReducersExport = `\nexport default ${_filename}Reducer;`;

    //=====================
    _components.split(',').forEach((reducer) => {
        reducer = reducer.charAt(0).toUpperCase() + reducer.substr(1);
        if (fs.existsSync(path.resolve(...reducersPath, `${_filename}.reducer.ts`))) {
            const data = fs.readFileSync(path.resolve(...reducersPath, `${_filename}.reducer.ts`), 'utf-8');
            const reducerName = data.match(/const.*Reducer/gi);
            const newData = data.replace(reducerName, '##--##' + reducerName);
            const d = newData.split(/##--##/);

            if (~data.indexOf(`[a.${reducer}.Success]`)) {
                console.warn(chalk.yellow(`Редусер ${reducer} уже существует`));
            } else {
                d[1] = d[1].replace(commonReducersTmp, '').replace(commonReducersTmp1, '').replace(commonReducersTemplate, '').replace(commonReducersExport, '').trim();
                fs.writeFileSync(path.resolve(...reducersPath, `${_filename}.reducer.ts`),
                    (d[0] + commonReducersTmp + commonReducersTemplate + d[1] + commonReducersTmp1 + '\n' + commonReducersExport).replaceAll('$$$name$$$', reducer));
            }
        } else {
            fs.writeFileSync(path.resolve(...reducersPath, `${_filename}.reducer.ts`),
                (commonReducersLib + commonReducersRedInterface
                  + commonReducersStateInterface + commonReducersInitState + commonReducersTmp
                  + commonReducersTemplate + commonReducersTmp1 + '\n' + commonReducersExport).replaceAll('$$$name$$$', reducer));
        }
    });


    //======================================================================================================================
    /** темплейты для эффектов*/
    componentPath = [basicPath, ep];
    const commonEffectLib =
      `import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Action } from 'redux-actions';
import * as a from '../actions/$$$namepath$$$.actions';
import * as s from '../services/$$$namepath$$$.service';
`;

    const commonEffectSep = '//------------------------------------------------------------';

    const commonEffect = `
export const $$$namel$$$Effect$ = (actions$: ActionsObservable<Action<any>>) =>
  actions$.pipe(
    ofType(a.$$$name$$$.Pending),
    switchMap(({ payload }) =>
      s.$$$namel$$$(payload).pipe(
        map((result:any) => ({ type: a.$$$name$$$.Success, payload: result })),
        tap(() =>{}
        /*  sendNotification({
            sMessage: \`Сценарий запущен\`,
            iStatus: 1
          })*/
        ),
        catchError((e: Error) =>(of({type:'error'})/* showErrorMessage(e)*/)
        )
      )
    )
  );\n`;

    _components.split(',').forEach((action) => {
        action = action.charAt(0).toUpperCase() + action.substr(1);
        const actionl = action.charAt(0).toLowerCase() + action.substr(1);
        if (fs.existsSync(path.resolve(...componentPath, `${_filename}.effects.ts`))) {
            const data = fs.readFileSync(path.resolve(...componentPath, `${_filename}.effects.ts`), 'utf-8');

            if (~data.indexOf(`export const ${actionl}`)) {
                console.warn(chalk.yellow(`Эффект ${actionl}Effect$ уже существует`));
            } else {
                fs.writeFileSync(path.resolve(...componentPath, `${_filename}.effects.ts`),
                    (data + commonEffect).replaceAll('$$$name$$$', action).replaceAll('$$$namel$$$', actionl));
            }
        } else {
            fs.writeFileSync(path.resolve(...componentPath, `${_filename}.effects.ts`),
                (commonEffectLib + commonEffectSep + commonEffect)
                    .replaceAll('$$$name$$$', action)
                    .replaceAll('$$$namel$$$', actionl)
                    .replaceAll('$$$namepath$$$', _filename)
            );
        }
    });
    //======================================================================================================================
    /** темплейты для сервисов*/
    componentPath = [basicPath, sp];
    const commonServiceLib =
      `import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
`;
    const commonService =
      `
export const $$$name$$$ = (data:any ={} ): Observable<any> => {
/* return Axios.get('https://api.github.com/orgs/octokit/repos', {
    headers: {
      'NOINTERCEPT':true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).pipe(
  map(({ data }) => data)
);*/
  return Axios.post('---укажите запрос к серверу----',data).pipe(
    map(({ data }) => data)
  );
};\n`;
    _components.split(',').forEach((action) => {
        action = action.charAt(0).toLowerCase() + action.substr(1);
        if (fs.existsSync(path.resolve(...componentPath, `${_filename}.service.ts`))) {
            const data = fs.readFileSync(path.resolve(...componentPath, `${_filename}.service.ts`), 'utf-8');
            if (~data.indexOf(`export const ${action}`)) {
                console.warn(chalk.yellow(`Сервис ${action} уже существует`));
            } else {
                fs.writeFileSync(path.resolve(...componentPath, `${_filename}.service.ts`),
                    (data + commonService).replaceAll('$$$name$$$', action));
            }
        } else {
            fs.writeFileSync(path.resolve(...componentPath, `${_filename}.service.ts`),
                (commonServiceLib + commonService).replaceAll('$$$name$$$', action));
        }
    });
    
    let content = '';
    if (fs.existsSync(`${basicPath}index.ts`)) {
        content = fs.readFileSync(`${basicPath}index.ts`);

        /** Импорт эффектов и итоговая строка импорта */
        const effectsImported = _components.split(',').reduce((acc = '', item, index, arr) => {
            let name = item.charAt(0).toLowerCase() + item.substr(1);
            return acc + `${name}Effect$${index === arr.length - 1 ? '' : ', '}`;
        }, '');
        const effectsImport = `\nimport { ${effectsImported} } from './effects/${_filename}.effects';`;

        /** Импорт редьюсера итоговая сторка */
        let reducerName = _filename.charAt(0).toLowerCase() + _filename.substr(1);
        const reducerImport = `\nimport { ${reducerName}Reducer } from './reducers/${_filename}.reducer';\n`;

        /** запись импортов в файл */
        let index = content.indexOf('/*[imports:end]');
        content = content.slice(0, index) + effectsImport + reducerImport + content.slice(index, content.length);

        /** запись редьюсеров в файл */
        index = content.indexOf('/*[reducers:end]');
        let injectReducers = `\n  injectAsyncReducer(store, '${reducerName}', ${_filename}Reducer);\n`;
        content = content.slice(0, index) + injectReducers + content.slice(index, content.length);

        /** запись эффектов в файл */
        index = content.indexOf('/*[effects:end]');
        let effects = _components.split(',').reduce((acc = '', item) => {
            let name = item.charAt(0).toLowerCase() + item.substr(1);
            return acc + `\n  addEpics(${name}Effect$);`;
        }, '');
        content = content.slice(0, index) + effects +  '\n' + content.slice(index, content.length);

        fs.writeFileSync(`${basicPath}index.ts`, content);
    }
    //======================================================================================================================
}

module.exports = generate;
