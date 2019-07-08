import { combineReducers } from 'redux';

import settingsReducer from './settingsReducer';
import currencyReducer from './currencyReducer';
import transactionsReducer from './transactionsReducer';

export default combineReducers({
    settings: settingsReducer,
    currencies: currencyReducer,
    transactions: transactionsReducer
});