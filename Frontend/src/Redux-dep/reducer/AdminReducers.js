import { 
    USERS_SEEN_FAIL, 
    USERS_SEEN_REQUEST, 
    USERS_SEEN_SUCCESS 
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