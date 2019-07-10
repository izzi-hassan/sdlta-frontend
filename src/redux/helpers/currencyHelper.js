// Helper file for calculations and fetching the currencyList. Does not deal with state or state changes and therefore relies on dynamic settings (surcharge, min_commission, etc.) to be passed to its functions.

import config from '../../config/app';
import currencies from '../../config/currencies';

const {
    currency_precision: currencyPrecision,
    traded_currencies: tradedCurrencies
} = config;

// Reduce currencyList to the traded currencies
export const currencyList = currencies.filter(currency => tradedCurrencies.some(x => x.code === currency.code));

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
    let homeCurrencyBalanceChange =  -1 * operator * amount * exchangeRate;

    let commission = Math.max(Math.abs(homeCurrencyBalanceChange) * commissionRate / 100 + surchargeAmount, minCommissionAmount);

    // Commission always goes into the home currency balance
    homeCurrencyBalanceChange += commission;

    return {
        transactionCurrencyBalanceChange: transactionCurrencyBalanceChange.toFixed(currencyPrecision),
        homeCurrencyBalanceChange: homeCurrencyBalanceChange.toFixed(currencyPrecision),
        commission: commission.toFixed(currencyPrecision),
        payReceiveAmount: Math.abs(homeCurrencyBalanceChange.toFixed(currencyPrecision))
    };
};