import { REFRESH_RATES, UPDATE_SETTINGS, BUY_CURRENCY, SELL_CURRENCY } from './actionTypes';

export const refreshRates = () => ({
    type: REFRESH_RATES,
    payload: {}
});

export const updateSettings = (settings) => ({
    type: UPDATE_SETTINGS,
    payload: settings
});

export const buyCurrency = (currencyCode, amount, exchangeRate) => ({
    type: BUY_CURRENCY,
    payload: {
        currencyCode: currencyCode,
        amount: amount,
        exchangeRate: exchangeRate
    }
});

export const sellCurrency = (currencyCode, amount, exchangeRate) => ({
    type: SELL_CURRENCY,
    payload: {
        currencyCode: currencyCode,
        amount: amount,
        exchangeRate: exchangeRate
    }
});

export const logTransaction = (currencyCode, amount, exchangeRate, type) => ({
    type: SELL_CURRENCY,
    payload: {
        currencyCode: currencyCode,
        amount: amount,
        exchangeRate: exchangeRate,
        type: type
    }
});