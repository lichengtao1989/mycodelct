// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// // import App from './App';
// // import TodoList from './simple/TodoList';//简单的todolist基础应用，react 基础内容
// import TodoList from './more/TodoList';//
// // import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<TodoList />, document.getElementById('root'));
// // registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import TodoList from './simple/TodoList';//简单的todolist基础应用，react 基础内容
import TodoList from './more/TodoList';//
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store-react-redux/index';
const App=(
  <Provider store={store}>
    <TodoList />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'));
// registerServiceWorker();
