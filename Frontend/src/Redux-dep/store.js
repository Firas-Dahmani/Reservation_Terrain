import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { authLoginReducer, authRegisterReducer, authEmailVerifReducer, authResetPasswordReducer } from './reducer/authReduces';
import { sessionReducer, sessionService } from 'redux-react-session' 
import { contactReducer } from './reducer/contactReducer';
import { userAccepteReducer, userSeenReducer, userDeleteReducer, addOwnerReducer, villeSeenReducer, villeDeleteReducer, villeAddReducer, stadeSeenReducer, stadeAddReducer, stadeDeleteReducer, profileSeenReducer, updatePicReducer, contactMessageSeenReducer, contactMessageDeleteReducer, userUpdateReducer } from './reducer/AdminReducers';
import { OwnerprofileSeenReducer, OwnerupdatePicReducer, OwnerUpdateReducer } from "./reducer/OwnerReducers";
import { UserprofileSeenReducer, UserupdatePicReducer, UserUpdateReducer } from "./reducer/UserReducers";

const reducer = combineReducers({
    // auth Reducers
    authLogin : authLoginReducer,
    authRegister: authRegisterReducer,
    authEmailVerif:authEmailVerifReducer,
    authResetPassword: authResetPasswordReducer,
    // Index reducers
    contact : contactReducer,
    //Admin Reducers
    userSeen:userSeenReducer,
    villeSeen:villeSeenReducer,
    userAccepte:userAccepteReducer,
    userDelete:userDeleteReducer,
    addOwner:addOwnerReducer,
    villeDelete:villeDeleteReducer,
    villeAdd:villeAddReducer,
    stadeSeen:stadeSeenReducer,
    stadeAdd:stadeAddReducer,
    stadeDelete:stadeDeleteReducer,
    profileSeen:profileSeenReducer,
    updatePic:updatePicReducer,
    contactMessageSeen:contactMessageSeenReducer,
    contactMessageDelete:contactMessageDeleteReducer,
    userUpdate:userUpdateReducer,
    //Session Reducer
    session : sessionReducer,
    //Owner Reducers
    OwnerprofileSeen:OwnerprofileSeenReducer,
    OwnerupdatePic:OwnerupdatePicReducer,
    OwnerUpdate:OwnerUpdateReducer,
    // User Reducers
    UserprofileSeen:UserprofileSeenReducer,
    UserupdatePic:UserupdatePicReducer,
    UserUpdate:UserUpdateReducer,

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