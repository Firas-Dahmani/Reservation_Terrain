import { 
    EVENT_SEEN_FAIL,
    EVENT_SEEN_REQUEST,
    EVENT_SEEN_SUCCESS,
    OWNER_DELETE_EVENT_FAIL,
    OWNER_DELETE_EVENT_REQUEST,
    OWNER_DELETE_EVENT_SUCCESS,
    OWNER_PROFILE_SEEN_FAIL,
    OWNER_PROFILE_SEEN_REQUEST, 
    OWNER_PROFILE_SEEN_SUCCESS, 
    OWNER_STADE_ADD_FAIL, 
    OWNER_STADE_ADD_REQUEST, 
    OWNER_STADE_ADD_SUCCESS, 
    OWNER_STADE_DELETE_FAIL, 
    OWNER_STADE_DELETE_REQUEST, 
    OWNER_STADE_DELETE_SUCCESS, 
    OWNER_STADE_SEEN_FAIL, 
    OWNER_STADE_SEEN_REQUEST, 
    OWNER_STADE_SEEN_SUCCESS, 
    OWNER_UPDATE_PIC_FAIL, 
    OWNER_UPDATE_PIC_REQUEST,
    OWNER_UPDATE_PIC_SUCCESS,
    OWNER_USER_UPDATE_FAIL,
    OWNER_USER_UPDATE_REQUEST,
    OWNER_USER_UPDATE_SUCCESS,
    OWNER_VILLE_SEEN_FAIL,
    OWNER_VILLE_SEEN_REQUEST,
    OWNER_VILLE_SEEN_SUCCESS
} from "../constant/OwnerConstant";


export const OwnerprofileSeenReducer = (state = {}, action) => {
    switch (action.type){
        case OWNER_PROFILE_SEEN_REQUEST:
            return {loading : true};
        
        case OWNER_PROFILE_SEEN_SUCCESS:
            return {loading : false, seeProfile : action.payload};
        
        case OWNER_PROFILE_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const OwnerupdatePicReducer = (state = {}, action) => {
    switch (action.type){
        case OWNER_UPDATE_PIC_REQUEST:
            return {loading : true};
        
        case OWNER_UPDATE_PIC_SUCCESS:
            return {loading : false, success: true};
        
        case OWNER_UPDATE_PIC_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const OwnerUpdateReducer = (state = {}, action) => {
    switch (action.type){
        case OWNER_USER_UPDATE_REQUEST:
            return {loading : true};
        
        case OWNER_USER_UPDATE_SUCCESS:
            return {loading : false, success: true};
        
        case OWNER_USER_UPDATE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const OwnerstadeSeenReducer = (state = {}, action) => {
    switch (action.type){
        case OWNER_STADE_SEEN_REQUEST:
            return {loading : true};
        
        case OWNER_STADE_SEEN_SUCCESS:
            return {loading : false, stade: action.payload};
        
        case OWNER_STADE_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const OwnerstadeAddReducer = (state = {}, action) => {
    switch (action.type){
        case OWNER_STADE_ADD_REQUEST:
            return {loading : true};
        
        case OWNER_STADE_ADD_SUCCESS:
            return {loading : false, success: true};
        
        case OWNER_STADE_ADD_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const OwnerstadeDeleteReducer = (state = {}, action) => {
    switch (action.type){
        case OWNER_STADE_DELETE_REQUEST:
            return {loading : true};
        
        case OWNER_STADE_DELETE_SUCCESS:
            return {loading : false, success: true};
        
        case OWNER_STADE_DELETE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const OwnervilleSeenReducer = (state = {}, action) => {
    switch (action.type){
        case OWNER_VILLE_SEEN_REQUEST:
            return {loading : true};
        
        case OWNER_VILLE_SEEN_SUCCESS:
            return {loading : false, ville: action.payload};
        
        case OWNER_VILLE_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const showReservationReducer = (state = {}, action) => {
    switch (action.type){
        case EVENT_SEEN_REQUEST:
            return {loading : true};
        
        case EVENT_SEEN_SUCCESS:
            return {loading : false, event: action.payload};
        
        case EVENT_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const OwnerDeleteEventReducer = (state = {}, action) => {
    switch (action.type){
        case OWNER_DELETE_EVENT_REQUEST:
            return {loading : true};
        
        case OWNER_DELETE_EVENT_SUCCESS:
            return {loading : false, success: true};
        
        case OWNER_DELETE_EVENT_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}