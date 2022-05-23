import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { authLoginReducer, authRegisterReducer, authEmailVerifReducer, authResetPasswordReducer, authVilleSeenReducer } from './reducer/authReduces';
import { sessionReducer, sessionService } from 'redux-react-session' 
import { contactReducer } from './reducer/contactReducer';
import { userAccepteReducer, userSeenReducer, userDeleteReducer, addOwnerReducer, villeSeenReducer, villeDeleteReducer, villeAddReducer, stadeSeenReducer, stadeAddReducer, stadeDeleteReducer, profileSeenReducer, updatePicReducer, contactMessageSeenReducer, contactMessageDeleteReducer, userUpdateReducer } from './reducer/AdminReducers';
import { OwnerprofileSeenReducer, OwnerstadeAddReducer, OwnerstadeDeleteReducer, OwnerstadeSeenReducer, OwnerupdatePicReducer, OwnerUpdateReducer, OwnervilleSeenReducer } from "./reducer/OwnerReducers";
import {  AddMembreReducer, CreateEquipeReducer, DeleteEquipeReducer, deleteUserFromEquipeReducer, playerSearchReducer, UserFindByIDReducer, UserprofileSeenReducer, UserSeeOwnEquipeReducer, UserupdatePicReducer, UserUpdateReducer } from "./reducer/UserReducers";

const reducer = combineReducers({
    // auth Reducers
    authLogin : authLoginReducer,
    authRegister: authRegisterReducer,
    authEmailVerif:authEmailVerifReducer,
    authResetPassword: authResetPasswordReducer,
    authVilleSeen:authVilleSeenReducer,
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
    OwnerstadeSeen:OwnerstadeSeenReducer,
    OwnerstadeAdd:OwnerstadeAddReducer,
    OwnerstadeDelete:OwnerstadeDeleteReducer,
    OwnervilleSeen:OwnervilleSeenReducer,
    // User Reducers
    UserprofileSeen:UserprofileSeenReducer,
    UserupdatePic:UserupdatePicReducer,
    UserUpdate:UserUpdateReducer,
    UserSeeOwnEquipe:UserSeeOwnEquipeReducer,
    UserFindByID:UserFindByIDReducer,
    CreateEquipe:CreateEquipeReducer,
    DeleteEquipe:DeleteEquipeReducer,
    playerSearch:playerSearchReducer,
    AddMembre:AddMembreReducer,
    deleteUserFromEquipe:deleteUserFromEquipeReducer,
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