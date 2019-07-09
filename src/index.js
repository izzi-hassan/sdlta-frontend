import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import store, { history } from './redux';

import App from './components/App';

const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store} context={ReactReduxContext}>
        <App history={history} context={ReactReduxContext} />
    </Provider>,
    root,
);

serviceWorker.unregister();