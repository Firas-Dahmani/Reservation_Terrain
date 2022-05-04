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
} from "../constant/OwnerConstant"
import  axios  from 'axios';
import { sessionService } from 'redux-react-session';




//User
export const OwnerprofileSeenAction = (USER_ID) => async (dispatch) => {
    try {
      let config = {}
        dispatch({ type: OWNER_PROFILE_SEEN_REQUEST })
        sessionService.loadUser()
          .then(async (Users) => {
            config = {
              headers: {
                Authorization: `Bearer ${Users.token}`,
            }}
  
            await axios.post("http://localhost:5000/owner/profile",
              {
                USER_ID
              },
              config
            )
            .then(response => {
                const {data} = response
  
                if(data.status === 'FAILED'){
                  dispatch({
                    type: OWNER_PROFILE_SEEN_FAIL,
                    payload: data.message})
  
                }else if(data.status === 'SUCCESS') {
                  const { User } = data
                  dispatch({ type: OWNER_PROFILE_SEEN_SUCCESS, payload: User[0] })
                }
            })
          })
  
        }
        catch (error){
          console.log(error);
            dispatch({
                type: OWNER_PROFILE_SEEN_FAIL,
                payload:
                    error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
  }
  
  export const OwnerupdatePicAction = (USER_ID, pic) => async (dispatch) => {
    try {
      let config = {}
        dispatch({ type: OWNER_UPDATE_PIC_REQUEST })
        sessionService.loadUser()
          .then(async (Users) => {
            config = {
              headers: {
                Authorization: `Bearer ${Users.token}`,
            }}
  
            await axios.post("http://localhost:5000/owner/updatepic",
              {
                USER_ID,
                pic
              },
              config
            )
            .then(response => {
                const {data} = response
  
                if(data.status === 'FAILED'){
                  dispatch({
                    type: OWNER_UPDATE_PIC_FAIL,
                    payload: data.message})
  
                }else if(data.status === 'SUCCESS') {
                  dispatch({ type: OWNER_UPDATE_PIC_SUCCESS, payload: data })
                }
            })
          })
  
        }
        catch (error){
          console.log(error);
            dispatch({
                type: OWNER_UPDATE_PIC_FAIL,
                payload:
                    error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
  }
  
  export const OwnerupdateUserProfile = (variableUpdateProfile) => async dispatch => {
      const [
          USER_ID,
          firstName,
          lastName,
          email, 
          tel,
          date,
          genre,
          adress,
          ville,
          password
      ] = variableUpdateProfile
    try{
      console.log(USER_ID)
      let config = {}
      dispatch({ type: OWNER_USER_UPDATE_REQUEST })
  
      sessionService.loadUser()
          .then(async (Users) => {
            config = {
              headers: {
                Authorization: `Bearer ${Users.token}`,
            }}
            await axios.post(
              "http://localhost:5000/owner/updateprofile",
              {
                USER_ID,
                firstName,
                lastName,
                email, 
                tel,
                date,
                genre,
                adress,
                ville,
                password
              },
              config
            ).then(response => {
              const {data} = response
        
              if(data.status === 'FAILED'){
                const { message } = data
        
                dispatch({
                  type: OWNER_USER_UPDATE_FAIL,
                  payload: message
                })
              }else if(data.status === 'SUCCESS') {
                dispatch({ type: OWNER_USER_UPDATE_SUCCESS, payload: data })
              }
            })
      })
      } catch(error) {
        dispatch({
          type: OWNER_USER_UPDATE_FAIL,
          payload:
              error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      })
    }
  }