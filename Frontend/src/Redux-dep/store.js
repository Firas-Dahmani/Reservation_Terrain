import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducer/userReduces';

const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister: userRegisterReducer
})

const inistialState = {

}

const middleware = [thunk];

const store = createStore(
    reducer, 
    inistialState,
    composeWithDevTools(
    applyMiddleware(...middleware)
    )
);

export default store