import { 
    OWNER_PROFILE_SEEN_FAIL,
    OWNER_PROFILE_SEEN_REQUEST, 
    OWNER_PROFILE_SEEN_SUCCESS, 
    OWNER_UPDATE_PIC_FAIL, 
    OWNER_UPDATE_PIC_REQUEST,
    OWNER_UPDATE_PIC_SUCCESS,
    OWNER_USER_UPDATE_FAIL,
    OWNER_USER_UPDATE_REQUEST,
    OWNER_USER_UPDATE_SUCCESS
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