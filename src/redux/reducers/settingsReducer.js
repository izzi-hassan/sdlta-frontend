// Handles settings configurable from the UI
import { INIT, LOADING, LOADED, SHOW_MESSAGE, HIDE_MESSAGE, TRANSACTION_FAILURE, TRANSACTION_SUCCESS, UPDATE_SETTINGS } from '../actions/actionTypes';
import config from '../../config/app';

// I know. This should be camelCased but I just realized it and it's too late for me refactor now
const initialState = {
    exchange_refresh_rate: null,
    commission_percentage: null,
    margin_percentage: null,
    minimum_commission: null,
    surcharge: null,
    low_balance_percentage: null,
    showLoading: null,
    message: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT: {
            return { ...state, ...config.defaults };
        }
        case LOADING: {
            return { ...state, showLoading: true };
        }
        case LOADED: {
            return { ...state, showLoading: false };
        }
        case SHOW_MESSAGE: {
            return { ...state, message: action.payload};
        }
        case HIDE_MESSAGE: {
            return { ...state, message: null };
        }
        case TRANSACTION_SUCCESS: {
            return { ...state, message: {
                type: 'success',
                message: 'Transaction Successfully Executed'
            }};
        }
        case TRANSACTION_FAILURE: {
            return { ...state, message: {
                type: 'failure',
                message: 'Not Enough Funds To Execute Transaction'
            }};
        }
        case UPDATE_SETTINGS: {
            return {
                ...state, 
                ...action.payload, 
                message: {
                    type: 'info',
                    message: 'Settings Updated'
                }
            };
        }
        default: {
            return state;
        }
    }
}