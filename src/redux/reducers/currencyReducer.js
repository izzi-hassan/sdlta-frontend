import { INIT, DO_TRANSACTION, UPDATE_RATES, FETCHING_RATES, RATE_ERROR } from '../actions/actionTypes';
import { calculateTransactionEffect, currencyList } from '../helpers/currencyHelper';
import config from '../../config/app';

const {
    home_currency_code: homeCurrencyCode,
    exchange_rate_stochasticity: exchangeRateStochasticity
} = config;

const initialState = {
    currencies: {},
    lastTransaction: {
        success: false
    },
    isFetching: null,
    rateRefreshError: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT: {
            let currencies = {};
            for (var key in currencyList) {
                currencies[currencyList[key].code] = currencyList[key];
            }

            const tradedCurrencies = config.traded_currencies;
            for (key in tradedCurrencies) {
                let tradedCurr = tradedCurrencies[key];
                let curr = currencies[tradedCurr.code]
                curr.initial_balance = tradedCurr.initial_balance;
                curr.balance = tradedCurr.initial_balance;
            }
           return {
                ...state,
                currencies: currencies,
                isFetching: false, 
                rateRefreshError: false, 
                canTransact: false
            }
        }
        case DO_TRANSACTION: {
            const transaction = action.payload.transaction;

            // Calcule changes in currency balances as well as commission
            let result = calculateTransactionEffect(transaction);

            if (! result) {
                return { ...state, lastTransaction: { success: false } };
            }

            // Update Balances
            let transactionCurrencyState = { ...state.currencies[transaction.code] };
            transactionCurrencyState.balance = Number.parseFloat(transactionCurrencyState.balance) + Number.parseFloat(result.transactionCurrencyBalanceChange);
            
            let homeCurrencyState = { ...state.currencies[homeCurrencyCode] };
            homeCurrencyState.balance = Number.parseFloat(homeCurrencyState.balance) + Number.parseFloat(result.homeCurrencyBalanceChange);

            if (homeCurrencyState.balance < 0 || transactionCurrencyState.balance < 0) {
                return { ...state, lastTransaction: { success: false } };
            }

            transactionCurrencyState.balance = transactionCurrencyState.balance.toFixed(config.currency_precision);
            homeCurrencyState.balance = homeCurrencyState.balance.toFixed(config.currency_precision);

            let nextState = { ...state };
            nextState.lastTransaction = transaction;
            nextState.lastTransaction.success = true;
            nextState.currencies[transaction.code] = transactionCurrencyState;
            nextState.currencies[homeCurrencyCode] = homeCurrencyState;

            return nextState;
        }
        case FETCHING_RATES: {
            return {...state, isFetching: true};
        }
        case UPDATE_RATES: {
            let nextState = {...state, isFetching: false, rateRefreshError: false};
            const fetchedRates = action.payload.quotes;

            for (key in fetchedRates) {
                let otherCurrencyCode = key.substr(-3);

                nextState.currencies[otherCurrencyCode].exchangeRate = 1 / fetchedRates[key];

                // Add stochasticity
                if (otherCurrencyCode !== homeCurrencyCode) {
                    nextState.currencies[otherCurrencyCode].exchangeRate += (Math.random() - 0.5) * exchangeRateStochasticity * (1 / fetchedRates[key]);
                }
            }

            return nextState;
        }
        case RATE_ERROR: {
            return {...state, isFetching: false, rateRefreshError: true, canTransact: false}
        }
        default: {
            return state;
        }
    }
}