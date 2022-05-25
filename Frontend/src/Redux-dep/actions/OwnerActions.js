import { 
  EVENT_SEEN_FAIL,
    EVENT_SEEN_REQUEST,
    EVENT_SEEN_SUCCESS,
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

  //Stade
export const OwnerstadeSeenAction = (Ville_ID,User_ID) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: OWNER_STADE_SEEN_REQUEST })
      sessionService.loadUser()
        .then(async (User) => {
          config = {
            headers: {
              Authorization: `Bearer ${User.token}`,
          }}

          await axios.post("http://localhost:5000/owner/getOwnerstade",
            {
              User_ID,
              Ville_ID
            },
            config
          )
          .then(response => {
              const {data} = response

              if(data.status === 'FAILED'){
                dispatch({
                  type: OWNER_STADE_SEEN_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const {stade} = data
                dispatch({ type: OWNER_STADE_SEEN_SUCCESS, payload: stade })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: OWNER_STADE_SEEN_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const OwnerstadeAddAction = (User_ID, Ville_ID, stadeName, Tel,description, prix, adress) => async (dispatch, getState) => {
  try {
      dispatch({ type: OWNER_STADE_ADD_REQUEST })
      
      const {
        session: { user },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
      }};

      await axios.post(`http://localhost:5000/owner/addOwnerstade`,
      {
        User_ID, 
        Ville_ID, 
        stadeName, 
        Tel,
        description,
        prix,
        adress
      },
      config

      ).then(response => {
          const {data} = response

          if(data.status === 'FAILED'){
            dispatch({
              type: OWNER_STADE_ADD_FAIL,
              payload: data.message})

          }else if(data.status === 'SUCCESS') {
            const {ville} = data
            dispatch({ type: OWNER_STADE_ADD_SUCCESS, payload: ville })
          }
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: OWNER_STADE_ADD_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const OwnerstadeDeleteAction = (id) => async (dispatch, getState) => {
  try {
      dispatch({ type: OWNER_STADE_DELETE_REQUEST })
      
      const {
        session: { user },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
      }};

      await axios.post(`http://localhost:5000/owner/removeStade`,
      {
        id
      },
      config

      ).then(response => {
          const {data} = response

          if(data.status === 'FAILED'){
            dispatch({
              type: OWNER_STADE_DELETE_FAIL,
              payload: data.message})

          }else if(data.status === 'SUCCESS') {
            const {ville} = data
            dispatch({ type: OWNER_STADE_DELETE_SUCCESS, payload: ville })
          }
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: OWNER_STADE_DELETE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

//Ville
export const OwnervilleSeenAction = () => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: OWNER_VILLE_SEEN_REQUEST })
      sessionService.loadUser()
        .then(async (User) => {
          config = {
            headers: {
              Authorization: `Bearer ${User.token}`,
          }}

          await axios.post("http://localhost:5000/owner/getVille",
            {},
            config
          )
          .then(response => {
              const {data} = response

              if(data.status === 'FAILED'){
                dispatch({
                  type: OWNER_VILLE_SEEN_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const {ville} = data
                dispatch({ type: OWNER_VILLE_SEEN_SUCCESS, payload: ville })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: OWNER_VILLE_SEEN_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const OwnergetEventAction = (ownerid) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: EVENT_SEEN_REQUEST })
      sessionService.loadUser()
        .then(async (User) => {
          config = {
            headers: {
              Authorization: `Bearer ${User.token}`,
          }}

          await axios.post('http://localhost:5000/owner/OwnergetEvent',
            {ownerid},
            config
          )
          .then(response => {
              const {data} = response
              if(data.status === 'FAILED'){
                dispatch({
                  type: EVENT_SEEN_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const {event} = data
                
                dispatch({ type: EVENT_SEEN_SUCCESS ,payload: event })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: EVENT_SEEN_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}
