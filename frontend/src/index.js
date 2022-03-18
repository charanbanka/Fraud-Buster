import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import App from './App';
import reducer from './reducer/reducer.js';

const store = createStore(reducer,compose(applyMiddleware(thunk)))
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,document.getElementById("root"))