import { LOG_TRANSACTION } from '../actions/actionTypes';

const initialState = {
    transactions: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_TRANSACTION: {
            return {...state, ...action.payload, id: state.length + 1};
        }
        default: {
            return state;
        }
    }
}