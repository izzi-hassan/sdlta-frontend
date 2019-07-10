import { 
    INIT, 
    LOADING, 
    LOADED, 
    UPDATE_RATES, 
    RATE_ERROR, 
    FETCHING_RATES, 
    UPDATE_SETTINGS, 
    DO_TRANSACTION, 
    TRANSACTION_SUCCESS,
    TRANSACTION_FAILURE,
    SHOW_MESSAGE, 
    HIDE_MESSAGE
} from './actionTypes';
import config from '../../config/app';

const tradedCurrencies = config.traded_currencies.map(x => x.code).join(',');

export const init = () => ({
    type: INIT,
    payload: {}
});

export const loading = () => ({
    type: LOADING,
    payload: {}
});

export const loaded = () => ({
    type: LOADED,
    payload: {}
});

export const showMessage = (message) => ({
    type: SHOW_MESSAGE,
    payload: message
});

export const hideMessage = () => ({
    type: HIDE_MESSAGE,
    payload: {}
})

export const updateRates = rateData => ({
    type: UPDATE_RATES,
    payload: rateData
});

export const rateError = error => ({
    type: RATE_ERROR,
    payload: error
});

export const fetchingRates = () => ({
    type: FETCHING_RATES,
    payload: {}
});

export const refreshRates = () => {
    return (dispatch, getState, axios) => {
        dispatch(fetchingRates());
        return axios.get('http://apilayer.net/api/live', {
                params: {
                    access_key: '3173f4197b9982e63c3b7b08e371e08d',
                    currencies: tradedCurrencies,
                    source: config.home_currency_code,
                    format: 1
                }
            })
            .then(response => {
                dispatch(updateRates(response.data));
                dispatch(showMessage({type: 'info', message: 'Rates Refreshed'}));
                dispatch(loaded());
            })
            .catch(error => {
                dispatch(rateError(error));
                dispatch(loaded());
            });
        };
};

export const updateSettings = settings => ({
    type: UPDATE_SETTINGS,
    payload: settings
});

export const doTransaction = (transaction) => ({
    type: DO_TRANSACTION,
    payload: {
        transaction: transaction
    }
});

export const transactionSuccess = () => ({
    type: TRANSACTION_SUCCESS,
    payload: {}
});

export const transactionFailure = () => ({
    type: TRANSACTION_FAILURE,
    payload: {}
});