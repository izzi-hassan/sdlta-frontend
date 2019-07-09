import { INIT, UPDATE_RATES, RATE_ERROR, FETCHING_RATES, UPDATE_SETTINGS, DO_TRANSACTION } from './actionTypes';
import config from '../../config/app';

const tradedCurrencies = config.traded_currencies.map(x => x.code).join(',');

export const init = () => ({
    type: INIT,
    payload: {}
});

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
        dispatch(fetchingRates);
        return axios.get('http://apilayer.net/api/live', {
                params: {
                    access_key: '3173f4197b9982e63c3b7b08e371e08d',
                    currencies: tradedCurrencies,
                    source: config.home_currency_code,
                    format: 1
                }
            })
            .then(response => {
                dispatch(updateRates(response.data))
            })
            .catch(error => {
                dispatch(rateError(error));
            });
        };
};

export const updateSettings = settings => ({
    type: UPDATE_SETTINGS,
    payload: settings
});

export const doTransaction = (currencyCode, amount, exchangeRate, buying) => (dispatch, getState) => {
    const { commissionRate, surchargeAmount, minCommissionAmount } = getState().settings;
    dispatch({ 
        type: DO_TRANSACTION,
        payload: {
            currencyCode: currencyCode,
            amount: amount,
            exchangeRate: exchangeRate,
            commissionRate: commissionRate,
            surchargeAmount: surchargeAmount,
            minCommissionAmount: minCommissionAmount,
            buying: buying
        }
    });
};