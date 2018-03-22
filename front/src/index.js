import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'containers';
import reducer from 'reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const client = axios.create({
  baseURL: 'http://localhost:3001',
  responseType: 'json',
  headers: {
    Authorization: 'anything'
  }
});

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(axiosMiddleware(client)))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
