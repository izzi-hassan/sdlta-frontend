// Handles settings configurable from the UI
import { UPDATE_SETTINGS } from '../actions/actionTypes';

const initialState = {
    "exchange_refresh_rate": null,
    "commission_percentage": null,
    "minimum_commission": null,
    "low_balance_percentage": null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS: {
            return {...state, ...action.payload.settings};
        }
        default: {
            return state;
        }
    }
}