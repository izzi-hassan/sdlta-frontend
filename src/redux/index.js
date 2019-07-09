import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from 'redux-thunk';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

export default createStore(
    rootReducer(history),
    {},
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk.withExtraArgument(axios)
        )
    )
);