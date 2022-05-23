import  axios  from 'axios';
import { sessionService } from 'redux-react-session';
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

// Equipe 

export const findUserByIDAction = (id) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: USER_FINDBYID_REQUEST })
      sessionService.loadUser()
        .then(async (Users) => {
          config = {
            headers: {
              Authorization: `Bearer ${Users.token}`,
          }}

          await axios.get(`http://localhost:5000/user/equipe/${id}`,config)
          .then(response => {
              const {data} = response
              if(data.status === 'FAILED'){
                dispatch({
                  type: USER_FINDBYID_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const {User} = data
                dispatch({ type: USER_FINDBYID_SUCCESS, payload: User[0] })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: USER_FINDBYID_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const UserSeeOwnEquipeAction = (USERID) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: USER_SEEOWNEQUIPE_REQUEST })
      sessionService.loadUser()
        .then(async (Users) => {
          config = {
            headers: {
              Authorization: `Bearer ${Users.token}`,
          }}

          await axios.post("http://localhost:5000/user/seeequipe",
            {
              USERID
            },
            config
          )
          .then(response => {
              const {data} = response
              if(data.status === 'FAILED'){
                dispatch({
                  type: USER_SEEOWNEQUIPE_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const {equipe} = data
                dispatch({ type: USER_SEEOWNEQUIPE_SUCCESS, payload: equipe[0] })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: USER_SEEOWNEQUIPE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const UserCreateEquipeAction = (ADMINID,groupeName) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: USER_CREATEEQUIPE_REQUEST })
      sessionService.loadUser()
        .then(async (Users) => {
          config = {
            headers: {
              Authorization: `Bearer ${Users.token}`,
          }}

          await axios.post("http://localhost:5000/user/addequipe",
            {
              ADMINID,
              groupeName
            },
            config
          )
          .then(response => {
              const {data} = response
              if(data.status === 'FAILED'){
                dispatch({
                  type: USER_CREATEEQUIPE_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const {equipe} = data
                dispatch({ type: USER_CREATEEQUIPE_SUCCESS, payload: equipe[0] })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: USER_CREATEEQUIPE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const deleteEquipeAction = (id) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: EQUIPE_DELETE_REQUEST })
      sessionService.loadUser()
        .then(async (Users) => {
          config = {
            headers: {
              Authorization: `Bearer ${Users.token}`,
          }}

          await axios.post(`http://localhost:5000/user/equipe/delete/${id}`,
            {},
            config
          )
          .then(response => {
              const {data} = response
              if(data.status === 'FAILED'){
                dispatch({
                  type: EQUIPE_DELETE_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                dispatch({ type: EQUIPE_DELETE_SUCCESS, payload: true })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: EQUIPE_DELETE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const playerSearchAction = (Poste , playerName , ville , USERID) => async (dispatch) => {
  try {

    let config = {}
      dispatch({ type: PLAYER_SEARCH_REQUEST })
      sessionService.loadUser()
        .then(async (User) => {
          config = {
            headers: {
              Authorization: `Bearer ${User.token}`,
          }}

          await axios.post('http://localhost:5000/user/search',
            {
              USERID,
              Poste, 
              playerName, 
              ville, 
            },
            config
          )
          .then(response => {
              const {data} = response
              if(data.status === 'FAILED'){
                dispatch({
                  type: PLAYER_SEARCH_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const {Users} = data

                dispatch({ type: PLAYER_SEARCH_SUCCESS, payload: Users })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: PLAYER_SEARCH_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const AddMembreAction = (ADMINID, EQUIPEID, USERID) => async (dispatch) => {
  try {

    let config = {}
      dispatch({ type: ADD_MEMBRE_REQUEST })
      sessionService.loadUser()
        .then(async (User) => {
          config = {
            headers: {
              Authorization: `Bearer ${User.token}`,
          }}

          await axios.post('http://localhost:5000/user/addmember',
            {ADMINID, EQUIPEID, USERID},
            config
          )
          .then(response => {
              const {data} = response
              if(data.status === 'FAILED'){
                dispatch({
                  type: ADD_MEMBRE_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {

                dispatch({ type: ADD_MEMBRE_SUCCESS, payload: true })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: ADD_MEMBRE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const deleteUserFromEquipeAction = (USERID,EQUIPEID) => async (dispatch) => {
  try {

    let config = {}
      dispatch({ type: DELETE_USER_FROM_EQUIPE_REQUEST })
      sessionService.loadUser()
        .then(async (User) => {
          config = {
            headers: {
              Authorization: `Bearer ${User.token}`,
          }}

          await axios.post('http://localhost:5000/user/deleteuserfromequipe',
            {USERID, EQUIPEID },
            config
          )
          .then(response => {
              const {data} = response
              if(data.status === 'FAILED'){
                dispatch({
                  type: DELETE_USER_FROM_EQUIPE_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {

                dispatch({ type: DELETE_USER_FROM_EQUIPE_SUCCESS, payload: true })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: DELETE_USER_FROM_EQUIPE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}