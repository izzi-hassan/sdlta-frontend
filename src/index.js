import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import store, { history } from './redux';
import config from './config/app';

import App from './components/App';

// Init Redux Store
const root = document.getElementById('root');

ReactDOM.render(
    <div>
        <Provider store={store} context={ReactReduxContext}>
            <App history={history} context={ReactReduxContext} />
        </Provider>
    </div>,
    root
);

// Set Title
document.getElementsByTagName('title')[0].innerHTML = config.app_full_name;

serviceWorker.unregister();