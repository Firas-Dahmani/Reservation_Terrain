import { 
    ADD_MEMBRE_FAIL,
    ADD_MEMBRE_REQUEST,
    ADD_MEMBRE_SUCCESS,
    DELETE_USER_FROM_EQUIPE_FAIL,
    DELETE_USER_FROM_EQUIPE_REQUEST,
    DELETE_USER_FROM_EQUIPE_SUCCESS,
    EQUIPE_DELETE_FAIL,
    EQUIPE_DELETE_REQUEST,
    EQUIPE_DELETE_SUCCESS,
    PLAYER_SEARCH_FAIL,
    PLAYER_SEARCH_REQUEST,
    PLAYER_SEARCH_SUCCESS,
    USER_CREATEEQUIPE_FAIL,
    USER_CREATEEQUIPE_REQUEST,
    USER_CREATEEQUIPE_SUCCESS,
    USER_FINDBYID_FAIL,
    USER_FINDBYID_REQUEST,
    USER_FINDBYID_SUCCESS,
    USER_PROFILE_SEEN_FAIL,
    USER_PROFILE_SEEN_REQUEST,
    USER_PROFILE_SEEN_SUCCESS,
    USER_SEEOWNEQUIPE_FAIL,
    USER_SEEOWNEQUIPE_REQUEST,
    USER_SEEOWNEQUIPE_SUCCESS,
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

export const UserSeeOwnEquipeReducer = (state = {}, action) => {
    switch (action.type){
        case USER_SEEOWNEQUIPE_REQUEST:
            return {loading : true};
        
        case USER_SEEOWNEQUIPE_SUCCESS:
            return {loading : false, seeOwnEquipe : action.payload};
        
        case USER_SEEOWNEQUIPE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const UserFindByIDReducer = (state = {}, action) => {
    switch (action.type){
        case USER_FINDBYID_REQUEST:
            return {loading : true};
        
        case USER_FINDBYID_SUCCESS:
            return {loading : false, User : action.payload};
        
        case USER_FINDBYID_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const CreateEquipeReducer = (state = {}, action) => {
    switch (action.type){
        case USER_CREATEEQUIPE_REQUEST:
            return {loading : true};
        
        case USER_CREATEEQUIPE_SUCCESS:
            return {loading : false, success : true};
        
        case USER_CREATEEQUIPE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const DeleteEquipeReducer = (state = {}, action) => {
    switch (action.type){
        case EQUIPE_DELETE_REQUEST:
            return {loading : true};
        
        case EQUIPE_DELETE_SUCCESS:
            return {loading : false, success : true};
        
        case EQUIPE_DELETE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const playerSearchReducer = (state = {}, action) => {
    switch (action.type){
        case PLAYER_SEARCH_REQUEST:
            return {loading : true};
        
        case PLAYER_SEARCH_SUCCESS:
            return {loading : false, Users : action.payload};
        
        case PLAYER_SEARCH_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const AddMembreReducer = (state = {}, action) => {
    switch (action.type){
        case ADD_MEMBRE_REQUEST:
            return {loading : true};
        
        case ADD_MEMBRE_SUCCESS:
            return {loading : false, success : true};
        
        case ADD_MEMBRE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}

export const deleteUserFromEquipeReducer = (state = {}, action) => {
    switch (action.type){
        case DELETE_USER_FROM_EQUIPE_REQUEST:
            return {loading : true};
        
        case DELETE_USER_FROM_EQUIPE_SUCCESS:
            return {loading : false, success : true};
        
        case DELETE_USER_FROM_EQUIPE_FAIL:
            return {loading : false, error: action.payload};

        default:
            return state;
    }
}
