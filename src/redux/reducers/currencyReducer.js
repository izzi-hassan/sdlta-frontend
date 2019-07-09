import { INIT, DO_TRANSACTION, UPDATE_RATES, FETCHING_RATES, RATE_ERROR } from '../actions/actionTypes';
import { calculateTransactionEffect, currencyList } from '../helpers/currencyHelper';
import config from '../../config/app';

const {
    home_currency_code: homeCurrencyCode,
    exchange_rate_stochasticity: exchangeRateStochasticity
} = config;

const initialState = {
    currencies: {},
    lastTransaction: null,
    isFetching: null,
    rateRefreshError: null,
    canTransact: null
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
                currencies[tradedCurrencies[key].code].initial_balance = tradedCurrencies[key].initial_balance;
                currencies[tradedCurrencies[key].code].balance = tradedCurrencies[key].initial_balance;
            }

            let nextState = {
                ...state,
                currencies: currencies,
                isFetching: false, 
                rateRefreshError: false, 
                canTransact: false
            }
            return nextState;
        }
        case DO_TRANSACTION: {
            const transaction = action.payload;

            if (! state.canTransact) {
                return state;
            }

            // Calcule changes in currency balances as well as commission
            let result = calculateTransactionEffect(transaction);

            if (! result) {
                return state;
            }

            // Update Balances
            let transactionCurrencyState = state[transaction.currencyCode];
            transactionCurrencyState.balance += result.transactionCurrencyBalanceChange;

            let homeCurrencyState = state[homeCurrencyCode];
            // Commission always goes into the home currency balance
            homeCurrencyState.balance += result.homeCurrencyBalanceChange + result.commission;

            // Apply commission and calculate payout / receipt of funds
            if (transaction.buying) {
                transaction.payout = transaction.amount;                                                //paying out Other Currency
                transaction.receipt = result.homeCurrencyBalanceChange;
            } else {
                transaction.payout = Math.abs(result.homeCurrencyBalanceChange) - result.commission;    //paying out Home Currency
                transaction.receipt = transaction.amount;
            }

            let nextState = {
                ...state,
                lastTransaction: transaction,
                [transaction.currencyCode]: transactionCurrencyState,
                [homeCurrencyCode]: homeCurrencyState
            };

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

                nextState.currencies[otherCurrencyCode].exchangeRate = fetchedRates[key];

                // Add stochasticity
                if (otherCurrencyCode !== homeCurrencyCode) {
                    nextState.currencies[otherCurrencyCode].exchangeRate += ((Math.random() * exchangeRateStochasticity * 2 - exchangeRateStochasticity) * fetchedRates[key]);
                }
            }

            return nextState;
        }
        case RATE_ERROR: {
            let nextState = {...state, isFetching: false, rateRefreshError: true, canTransact: false}
            console.log('Rate Refresh Error', action.payload)
            return nextState;
        }
        default: {
            return state;
        }
    }
}