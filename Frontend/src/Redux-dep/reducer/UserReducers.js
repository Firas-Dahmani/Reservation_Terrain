import { 
    USER_PROFILE_SEEN_FAIL,
    USER_PROFILE_SEEN_REQUEST,
    USER_PROFILE_SEEN_SUCCESS,
    USER_UPDATE_PIC_FAIL,
    USER_UPDATE_PIC_REQUEST,
    USER_UPDATE_PIC_SUCCESS,
    USER_USER_UPDATE_FAIL, 
    USER_USER_UPDATE_REQUEST, 
    USER_USER_UPDATE_SUCCESS 
} from "../constant/UserConstant";



export const UserprofileSeenReducer = (state = {}, action) => {
    switch (action.type){
        case USER_PROFILE_SEEN_REQUEST:
            return {loading : true};
        
        case USER_PROFILE_SEEN_SUCCESS:
            return {loading : false, seeProfile : action.payload};
        
        case USER_PROFILE_SEEN_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const UserupdatePicReducer = (state = {}, action) => {
    switch (action.type){
        case USER_UPDATE_PIC_REQUEST:
            return {loading : true};
        
        case USER_UPDATE_PIC_SUCCESS:
            return {loading : false, success: true};
        
        case USER_UPDATE_PIC_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const UserUpdateReducer = (state = {}, action) => {
    switch (action.type){
        case USER_USER_UPDATE_REQUEST:
            return {loading : true};
        
        case USER_USER_UPDATE_SUCCESS:
            return {loading : false, success: true};
        
        case USER_USER_UPDATE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}