// Helper file for calculations and fetching the currencyList. Does not deal with state or state changes and therefore relies on dynamic settings (surcharge, min_commission, etc.) to be passed to its functions.

import config from '../../config/app';
import currencies from '../../config/currencies';

const {
    currency_precision: currencyPrecision,
    exchange_rate_precision: exchangeRatePrecision,
    traded_currencies: tradedCurrencies
} = config;

// Reduce currencyList to the traded currencies
currencies = currencies.filter(currency => tradedCurrencies.some(x => x.code === currency.code));

export const currencyList = currencies;

export const calculateTransactionEffect = (transaction) => {
    const {
        amount, 
        exchangeRate,
        commissionRate, 
        surchargeAmount, 
        minCommissionAmount, 
        buying 
    } = transaction;

    const operator = (buying) ? -1 : 1;

    let transactionCurrencyBalanceChange = operator * amount;
    transactionCurrencyBalanceChange = transactionCurrencyBalanceChange.toPrecision(currencyPrecision);

    let homeCurrencyBalanceChange =  operator * amount * exchangeRate.toPrecision(exchangeRatePrecision);
    homeCurrencyBalanceChange = homeCurrencyBalanceChange.toPrecision(currencyPrecision);

    let commission = Math.max(Math.abs(homeCurrencyBalanceChange) * commissionRate + surchargeAmount, minCommissionAmount);
    commission = commission.toPrecision(currencyPrecision);

    return {
        transactionCurrencyBalanceChange: transactionCurrencyBalanceChange,
        homeCurrencyBalanceChange: homeCurrencyBalanceChange,
        commission: commission
    };
};