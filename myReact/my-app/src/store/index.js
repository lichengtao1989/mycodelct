//redux-thunk
// import {
//   createStore,
//   applyMiddleware,
//   compose
// } from 'redux';
// import reducer from './reducer';
// import thunk from 'redux-thunk';
// //即支持redux devtools  同时 支持redux-thunk
// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//   }) : compose;
// const enhancer = composeEnhancers(
//   applyMiddleware(thunk),
// );
// const store = createStore(reducer, enhancer);

// export default store;


//redux-thunk,redux-saga 更方便合理的处理复杂的异步数据

import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import TodoSagas from './sagas';
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;
const enhancer = composeEnhancers(
applyMiddleware(sagaMiddleware),
);
const store = createStore(reducer, enhancer);
sagaMiddleware.run(TodoSagas);

export default store;