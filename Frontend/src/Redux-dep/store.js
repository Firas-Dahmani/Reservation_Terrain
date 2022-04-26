import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { authLoginReducer, authRegisterReducer, authEmailVerifReducer, authResetPasswordReducer } from './reducer/authReduces';
import { sessionReducer, sessionService } from 'redux-react-session' 
import { contactReducer } from './reducer/contactReducer';
import { userAccepteReducer, userSeenReducer, userDeleteReducer, addOwnerReducer } from './reducer/AdminReducers';

const reducer = combineReducers({
    authLogin : authLoginReducer,
    authRegister: authRegisterReducer,
    authEmailVerif:authEmailVerifReducer,
    authResetPassword: authResetPasswordReducer,
    contact : contactReducer,
    userSeen:userSeenReducer,
    userAccepte:userAccepteReducer,
    userDelete:userDeleteReducer,
    addOwner:addOwnerReducer,
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