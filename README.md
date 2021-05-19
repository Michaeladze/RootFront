# RootFront

Установить проект:
```shell
yarn root-front
```

Запустить проект:
```shell
yarn storybook
```
___
## Логирование
Чтобы подключить логирование, нужно добавить `<Logger/>` и `<LoggerView/>` в `App.tsx`. 

`LoggerView` принимает в качестве пропсов `push` - функция изменения роута, `store` - ссылка на redux store, и `reducers` - ссылка на редьюсеры, которые нужно экспортировать из `/store/index.ts`.

Для логирования состояния редакса нужно добавить `reduxLogMiddleware` в создание `store` в `/store/index.ts`:

```js
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(observableMiddleware, reduxLogMiddleware)));
```

Для логирование сетевых запросов в интерцепторе нужно добавить соответствующий код:
```js
Axios.interceptors.request.use((config: AxiosRequestConfig) => {
  
  // ... какие-то функции
  
  // Логирование
  logRecord({
    timestamp: Date.now(),
    source: 'network',
    snapshot: config
  });
  
  return config;
});

Axios.interceptors.response.use((response: AxiosResponse) => {

    // ... какие-то функции

    // Логирование
    logRecord({
      timestamp: Date.now(),
      source: 'network',
      snapshot: response
    });
    
    return response;
  });
```

Логирование консоли включается автоматически.

___
