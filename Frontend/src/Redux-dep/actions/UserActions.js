import  axios  from 'axios';
import { sessionService } from 'redux-react-session';
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
} from '../constant/UserConstant';




//User
export const UserprofileSeenAction = (USER_ID) => async (dispatch) => {
    try {
      let config = {}
        dispatch({ type: USER_PROFILE_SEEN_REQUEST })
        sessionService.loadUser()
          .then(async (Users) => {
            config = {
              headers: {
                Authorization: `Bearer ${Users.token}`,
            }}
  
            await axios.post("http://localhost:5000/user/profile",
              {
                USER_ID
              },
              config
            )
            .then(response => {
                const {data} = response
  
                if(data.status === 'FAILED'){
                  dispatch({
                    type: USER_PROFILE_SEEN_FAIL,
                    payload: data.message})
  
                }else if(data.status === 'SUCCESS') {
                  const { User } = data
                  dispatch({ type: USER_PROFILE_SEEN_SUCCESS, payload: User[0] })
                }
            })
          })
  
        }
        catch (error){
          console.log(error);
            dispatch({
                type: USER_PROFILE_SEEN_FAIL,
                payload:
                    error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
  }
  
  export const UserupdatePicAction = (USER_ID, pic) => async (dispatch) => {
    try {
      let config = {}
        dispatch({ type: USER_UPDATE_PIC_REQUEST })
        sessionService.loadUser()
          .then(async (Users) => {
            config = {
              headers: {
                Authorization: `Bearer ${Users.token}`,
            }}
  
            await axios.post("http://localhost:5000/user/updatepic",
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
                    type: USER_UPDATE_PIC_FAIL,
                    payload: data.message})
  
                }else if(data.status === 'SUCCESS') {
                  dispatch({ type: USER_UPDATE_PIC_SUCCESS, payload: data })
                }
            })
          })
  
        }
        catch (error){
          console.log(error);
            dispatch({
                type: USER_UPDATE_PIC_FAIL,
                payload:
                    error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
  }
  
  export const UserupdateUserProfile = (variableUpdateProfile) => async dispatch => {
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
      dispatch({ type: USER_USER_UPDATE_REQUEST })
  
      sessionService.loadUser()
          .then(async (Users) => {
            config = {
              headers: {
                Authorization: `Bearer ${Users.token}`,
            }}
            await axios.post(
              "http://localhost:5000/user/updateprofile",
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
                  type: USER_USER_UPDATE_FAIL,
                  payload: message
                })
              }else if(data.status === 'SUCCESS') {
                dispatch({ type: USER_USER_UPDATE_SUCCESS, payload: data })
              }
            })
      })
      } catch(error) {
        dispatch({
          type: USER_USER_UPDATE_FAIL,
          payload:
              error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      })
    }
  }

