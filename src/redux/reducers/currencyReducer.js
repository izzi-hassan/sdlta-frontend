import { BUY_CURRENCY, SELL_CURRENCY, REFRESH_RATES } from '../actions/actionTypes';
import { calculateTransactionResult } from '../helpers/currencyHelper';

const initialState = {
    currencies: {
        "USD": {
            initial_balance: 10000,
            balance: 10000,
            exchange_rate: 1,

        }
    },
    isFetching: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BUY_CURRENCY: {
            // Ensuring that no transaction occurs during a rate refresh
            if (state.isFetching) {
                return false;
            }

            return calculateTransactionResult(state, action.payload, true);
        }
        case SELL_CURRENCY: {
            // Ensuring that no transaction occurs during a rate refresh
            if (state.isFetching) {
                return false;
            }

            return calculateTransactionResult(state, action.payload, false);
        }
        case REFRESH_RATES: {
            return Object.assign(state, { isRefreshing: true });
        }
        default: {
            return state;
        }
    }
}