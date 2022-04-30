import { 
    CONTACT_MESSAGE_DELETE_FAIL,
    CONTACT_MESSAGE_DELETE_REQUEST,
    CONTACT_MESSAGE_DELETE_SUCCESS,
    CONTACT_MESSAGE_SEEN_FAIL,
    CONTACT_MESSAGE_SEEN_REQUEST,
    CONTACT_MESSAGE_SEEN_SUCCESS,
    PROFILE_SEEN_FAIL,
    PROFILE_SEEN_REQUEST,
    PROFILE_SEEN_SUCCESS,
    STADE_ADD_FAIL,
    STADE_ADD_REQUEST,
    STADE_ADD_SUCCESS,
    STADE_DELETE_FAIL,
    STADE_DELETE_REQUEST,
    STADE_DELETE_SUCCESS,
    STADE_SEEN_FAIL,
    STADE_SEEN_REQUEST,
    STADE_SEEN_SUCCESS,
    UPDATE_PIC_FAIL,
    UPDATE_PIC_REQUEST,
    UPDATE_PIC_SUCCESS,
    USERS_ACCEPTE_FAIL,
    USERS_ACCEPTE_REQUEST,
    USERS_ACCEPTE_SUCCESS,
    USERS_DELETE_FAIL,
    USERS_DELETE_REQUEST,
    USERS_DELETE_SUCCESS,
    USERS_SEEN_FAIL, 
    USERS_SEEN_REQUEST, 
    USERS_SEEN_SUCCESS, 
    USER_REGISTER_OWNER_FAIL, 
    USER_REGISTER_OWNER_REQUEST,
    USER_REGISTER_OWNER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    VILLE_ADD_FAIL,
    VILLE_ADD_REQUEST,
    VILLE_ADD_SUCCESS,
    VILLE_DELETE_FAIL,
    VILLE_DELETE_REQUEST,
    VILLE_DELETE_SUCCESS,
    VILLE_SEEN_FAIL,
    VILLE_SEEN_REQUEST,
    VILLE_SEEN_SUCCESS
} from "../constant/AdminConstant";


export const userSeenReducer = (state = {}, action) => {
    switch (action.type){
        case USERS_SEEN_REQUEST:
            return {loading : true};
        
        case USERS_SEEN_SUCCESS:
            return {loading : false, userDATA: action.payload};
        
        case USERS_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const userAccepteReducer = (state = {}, action) => {
    switch (action.type){
        case USERS_ACCEPTE_REQUEST:
            return {loading : true};
        
        case USERS_ACCEPTE_SUCCESS:
            return {loading : false, success: true};
        
        case USERS_ACCEPTE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type){
        case USERS_DELETE_REQUEST:
            return {loading : true};
        
        case USERS_DELETE_SUCCESS:
            return {loading : false, success: true};
        
        case USERS_DELETE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const addOwnerReducer = (state = {}, action) => {
    switch (action.type){
        case USER_REGISTER_OWNER_REQUEST:
            return {loading : true};
        
        case USER_REGISTER_OWNER_SUCCESS:
            return {loading : false, userInfo: action.payload};
        
        case USER_REGISTER_OWNER_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const villeSeenReducer = (state = {}, action) => {
    switch (action.type){
        case VILLE_SEEN_REQUEST:
            return {loading : true};
        
        case VILLE_SEEN_SUCCESS:
            return {loading : false, ville: action.payload};
        
        case VILLE_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const villeDeleteReducer = (state = {}, action) => {
    switch (action.type){
        case VILLE_DELETE_REQUEST:
            return {loading : true};
        
        case VILLE_DELETE_SUCCESS:
            return {loading : false, success: true};
        
        case VILLE_DELETE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const villeAddReducer = (state = {}, action) => {
    switch (action.type){
        case VILLE_ADD_REQUEST:
            return {loading : true};
        
        case VILLE_ADD_SUCCESS:
            return {loading : false, success: true};
        
        case VILLE_ADD_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const stadeSeenReducer = (state = {}, action) => {
    switch (action.type){
        case STADE_SEEN_REQUEST:
            return {loading : true};
        
        case STADE_SEEN_SUCCESS:
            return {loading : false, stade: action.payload};
        
        case STADE_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const stadeAddReducer = (state = {}, action) => {
    switch (action.type){
        case STADE_ADD_REQUEST:
            return {loading : true};
        
        case STADE_ADD_SUCCESS:
            return {loading : false, success: true};
        
        case STADE_ADD_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const stadeDeleteReducer = (state = {}, action) => {
    switch (action.type){
        case STADE_DELETE_REQUEST:
            return {loading : true};
        
        case STADE_DELETE_SUCCESS:
            return {loading : false, success: true};
        
        case STADE_DELETE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const profileSeenReducer = (state = {}, action) => {
    switch (action.type){
        case PROFILE_SEEN_REQUEST:
            return {loading : true};
        
        case PROFILE_SEEN_SUCCESS:
            return {loading : false, seeProfile : action.payload};
        
        case PROFILE_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const updatePicReducer = (state = {}, action) => {
    switch (action.type){
        case UPDATE_PIC_REQUEST:
            return {loading : true};
        
        case UPDATE_PIC_SUCCESS:
            return {loading : false, success: true};
        
        case UPDATE_PIC_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const contactMessageSeenReducer = (state = {}, action) => {
    switch (action.type){
        case CONTACT_MESSAGE_SEEN_REQUEST:
            return {loading : true};
        
        case CONTACT_MESSAGE_SEEN_SUCCESS:
            return {loading : false, Message: action.payload};
        
        case CONTACT_MESSAGE_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const contactMessageDeleteReducer = (state = {}, action) => {
    switch (action.type){
        case CONTACT_MESSAGE_DELETE_REQUEST:
            return {loading : true};
        
        case CONTACT_MESSAGE_DELETE_SUCCESS:
            return {loading : false, success: true};
        
        case CONTACT_MESSAGE_DELETE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type){
        case USER_UPDATE_REQUEST:
            return {loading : true};
        
        case USER_UPDATE_SUCCESS:
            return {loading : false, success: true};
        
        case USER_UPDATE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}