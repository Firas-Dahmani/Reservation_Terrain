import { 
    USERS_SEEN_FAIL, 
    USERS_SEEN_REQUEST, 
    USERS_SEEN_SUCCESS 
} from "../constant/AdminConstant";
import  axios  from 'axios';



export const userSeenAction = (userRole) => async (dispatch, getState) => {
    try {
        dispatch({ type: USERS_SEEN_REQUEST })
        
        const {
          session: { user },
        } = getState();
    
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
        }};

        await axios.post("http://localhost:5000/admin/seeUser", 
        {
          userRole
        },
         config 
         ).then(response => {

            const {data} = response

            if(data.status === 'FAILED'){
              dispatch({
                type: USERS_SEEN_FAIL,
                payload: data.message})

            }else if(data.status === 'SUCCESS') {
              const {users} = data
              dispatch({ type: USERS_SEEN_SUCCESS, payload: users })
            }
          })

        }
        catch (error){
          console.log(error);
            dispatch({
                type: USERS_SEEN_FAIL,
                payload:
                    error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
}