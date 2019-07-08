import config from '../config/app';
import currencies from '../config/currencies';

const {
    home_currency_code: homeCurrencyCode,
    currency_precision: currencyPrecision,
    exchange_rate_precision: exchangeRatePrecision,
    traded_currencies: tradedCurrencies
} = config;

// Reduce currencyList to the traded currencies
currencies = currencies.filter(currency => tradedCurrencies.some(x => x.code === currency.code))

export const currencyList = currencies;

export const calculateTransactionResult = (state, transaction, buying = true) => {
    // Cannot buy home currency (Force agent to use sell with a traded currency instead)
    if (homeCurrencyCode === transaction.currencyCode){
        return false;
    }
    let currencyState = state[transaction.currencyCode];
    let homeCurrencyState = state[homeCurrencyCode];

    let operator = (buying) ? -1 : 1;
    currencyState.balance = currencyState.balance + (operator * transaction.amount);
    homeCurrencyState.balance = (homeCurrencyState.balance - operator * transaction.amount * transaction.exchange_rate.toPrecision(exchangeRatePrecision)).toPrecision(currencyPrecision);
    
    // Make sure enough currency is available
    if (currencyState.balance < 0 || homeCurrencyState.balance < 0) {
        return false;
    }

    return {
        ...state,
        [transaction.currencyCode]: currencyState,
        [homeCurrencyCode]: homeCurrencyState
    };
};