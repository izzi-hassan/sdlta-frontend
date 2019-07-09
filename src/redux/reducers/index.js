import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import settingsReducer from './settingsReducer';
import currencyReducer from './currencyReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    settings: settingsReducer,
    currencies: currencyReducer
});