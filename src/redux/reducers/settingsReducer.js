// Handles settings configurable from the UI
import { INIT, UPDATE_SETTINGS } from '../actions/actionTypes';
import config from '../../config/app';

// I know. This should be camelCased but I just realized it and it's too late for me refactor now
const initialState = {
    exchange_refresh_rate: null,
    commission_percentage: null,
    margin_percentage: null,
    minimum_commission: null,
    surcharge: null,
    low_balance_percentage: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT: {
            let nextState = { ...state, ...config.defaults };

            return nextState;
        }
        case UPDATE_SETTINGS: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}