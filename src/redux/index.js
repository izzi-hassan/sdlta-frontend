import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from 'redux-thunk';
import axios from 'axios'

export default createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(axios)));