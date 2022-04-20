import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userEmailVerifReducer, userResetPasswordReducer } from './reducer/userReduces';
import { sessionReducer, sessionService } from 'redux-react-session' 
import { contactReducer } from './reducer/contactReducer';

const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister: userRegisterReducer,
    userEmailVerif:userEmailVerifReducer,
    userResetPassword: userResetPasswordReducer,
    contact : contactReducer,
    session : sessionReducer
})

const inistialState = {}

const middleware = [thunk];

const store = createStore(
    reducer, 
    inistialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

sessionService.initSessionService(store)

export default store