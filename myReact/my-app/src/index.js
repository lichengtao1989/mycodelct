import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import TodoList from './simple/TodoList';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TodoList />, document.getElementById('root'));
registerServiceWorker();
