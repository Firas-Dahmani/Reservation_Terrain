import { 
  USERS_ACCEPTE_FAIL,
  USERS_ACCEPTE_REQUEST,
    USERS_ACCEPTE_SUCCESS,
    USERS_DELETE_FAIL,
    USERS_DELETE_REQUEST,
    USERS_DELETE_SUCCESS,
    USERS_SEEN_FAIL, 
    USERS_SEEN_REQUEST, 
    USERS_SEEN_SUCCESS, 
    USER_REGISTER_OWNER_FAIL, 
    USER_REGISTER_OWNER_REQUEST,
    USER_REGISTER_OWNER_SUCCESS,
    VILLE_SEEN_FAIL,
    VILLE_SEEN_SUCCESS,
    VILLE_SEEN_REQUEST,
    VILLE_DELETE_SUCCESS,
    VILLE_DELETE_REQUEST,
    VILLE_DELETE_FAIL,
    VILLE_ADD_REQUEST,
    VILLE_ADD_FAIL,
    VILLE_ADD_SUCCESS,
    STADE_SEEN_REQUEST,
    STADE_SEEN_FAIL,
    STADE_SEEN_SUCCESS,
    STADE_ADD_REQUEST,
    STADE_ADD_FAIL,
    STADE_ADD_SUCCESS,
    STADE_DELETE_REQUEST,
    STADE_DELETE_FAIL,
    STADE_DELETE_SUCCESS,
    PROFILE_SEEN_REQUEST,
    PROFILE_SEEN_FAIL,
    PROFILE_SEEN_SUCCESS,
    UPDATE_PIC_FAIL,
    UPDATE_PIC_SUCCESS,
    UPDATE_PIC_REQUEST,
    CONTACT_MESSAGE_SEEN_SUCCESS,
    CONTACT_MESSAGE_SEEN_FAIL,
    CONTACT_MESSAGE_SEEN_REQUEST,
    CONTACT_MESSAGE_DELETE_REQUEST,
    CONTACT_MESSAGE_DELETE_FAIL,
    CONTACT_MESSAGE_DELETE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from "../constant/AdminConstant";
import  axios  from 'axios';
import { sessionService } from 'redux-react-session';

// User

export const userSeenAction = () => async (dispatch, getState) => {
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
        {},
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

export const userAccepteAction = (id) => async (dispatch, getState) => {
  try {
      dispatch({ type: USERS_ACCEPTE_REQUEST })
      
      const {
        session: { user },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
      }};

      await axios.post(`http://localhost:5000/admin/acceptUser/${id}`,
      {},
       config 
       ).then(response => {

          const {data} = response

          if(data.status === 'FAILED'){
            dispatch({
              type: USERS_ACCEPTE_FAIL,
              payload: data.message})

          }else if(data.status === 'SUCCESS') {
            dispatch({ type: USERS_ACCEPTE_SUCCESS, payload: data })
          }
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: USERS_ACCEPTE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
      dispatch({ type: USERS_DELETE_REQUEST })
      
      const {
        session: { user },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
      }};

      await axios.post(`http://localhost:5000/admin/deleteUser/${id}`,
      {},
       config 
       ).then(response => {

          const {data} = response

          if(data.status === 'FAILED'){
            dispatch({
              type: USERS_DELETE_FAIL,
              payload: data.message})

          }else if(data.status === 'SUCCESS') {
            dispatch({ type: USERS_DELETE_SUCCESS, payload: data })
          }
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: USERS_DELETE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

//Owner

export const addOwnerAction = (variableRegister) => async (dispatch, getState) => {
  const [
        firstname,
        lastname,
        email,
        tel,
        date,
        genre,
        adress,
        ville
    ] = variableRegister
  try{
    dispatch({ type: USER_REGISTER_OWNER_REQUEST })
    const {
      session: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
    }};
     await axios.post(
      "http://localhost:5000/admin/addOwner",
      {
        firstname,
        lastname,
        email,
        tel,
        date,
        genre,
        adress,
        ville
      },
      config
    ).then(response => {
      const {data} = response

      if(data.status === 'FAILED'){
        const { message } = data

        dispatch({
          type: USER_REGISTER_OWNER_FAIL,
          payload: message
        })
      }else if(data.status === 'SUCCESS') {
        dispatch({ type: USER_REGISTER_OWNER_SUCCESS, payload: data })
      }
    })
    
  }catch(error){
    dispatch({
      type: USER_REGISTER_OWNER_FAIL,
      payload:
          error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
  })
  }
}

//Ville
export const villeSeenAction = () => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: VILLE_SEEN_REQUEST })
      sessionService.loadUser()
        .then(async (User) => {
          config = {
            headers: {
              Authorization: `Bearer ${User.token}`,
          }}

          await axios.post("http://localhost:5000/admin/getVille",
            {},
            config
          )
          .then(response => {
              const {data} = response

              if(data.status === 'FAILED'){
                dispatch({
                  type: VILLE_SEEN_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const {ville} = data
                dispatch({ type: VILLE_SEEN_SUCCESS, payload: ville })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: VILLE_SEEN_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const villeDeleteAction = (id) => async (dispatch, getState) => {
  try {
      dispatch({ type: VILLE_DELETE_REQUEST })
      
      const {
        session: { user },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
      }};

      await axios.post(`http://localhost:5000/admin/removeVille`,
      {
        id
      },
      config

      ).then(response => {
          const {data} = response

          if(data.status === 'FAILED'){
            dispatch({
              type: VILLE_DELETE_FAIL,
              payload: data.message})

          }else if(data.status === 'SUCCESS') {
            const {ville} = data
            dispatch({ type: VILLE_DELETE_SUCCESS, payload: ville })
          }
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: VILLE_DELETE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const villeAddAction = (villeName) => async (dispatch, getState) => {
  try {
      dispatch({ type: VILLE_ADD_REQUEST })
      
      const {
        session: { user },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
      }};

      await axios.post(`http://localhost:5000/admin/addVille`,
      {
        villeName,
      },
      config

      ).then(response => {
          const {data} = response

          if(data.status === 'FAILED'){
            dispatch({
              type: VILLE_ADD_FAIL,
              payload: data.message})

          }else if(data.status === 'SUCCESS') {
            const {ville} = data
            dispatch({ type: VILLE_ADD_SUCCESS, payload: ville })
          }
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: VILLE_ADD_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

//Stade
export const stadeSeenAction = (Ville_ID) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: STADE_SEEN_REQUEST })
      sessionService.loadUser()
        .then(async (User) => {
          config = {
            headers: {
              Authorization: `Bearer ${User.token}`,
          }}

          await axios.post("http://localhost:5000/admin/getstade",
            {
              Ville_ID
            },
            config
          )
          .then(response => {
              const {data} = response

              if(data.status === 'FAILED'){
                dispatch({
                  type: STADE_SEEN_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const {stade} = data
                dispatch({ type: STADE_SEEN_SUCCESS, payload: stade })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: STADE_SEEN_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const stadeAddAction = (User_ID, Ville_ID, stadeName, Tel) => async (dispatch, getState) => {
  try {
      dispatch({ type: STADE_ADD_REQUEST })
      
      const {
        session: { user },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
      }};

      await axios.post(`http://localhost:5000/admin/addstade`,
      {
        User_ID, 
        Ville_ID, 
        stadeName, 
        Tel
      },
      config

      ).then(response => {
          const {data} = response

          if(data.status === 'FAILED'){
            dispatch({
              type: STADE_ADD_FAIL,
              payload: data.message})

          }else if(data.status === 'SUCCESS') {
            const {ville} = data
            dispatch({ type: STADE_ADD_SUCCESS, payload: ville })
          }
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: STADE_ADD_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const stadeDeleteAction = (id) => async (dispatch, getState) => {
  try {
      dispatch({ type: STADE_DELETE_REQUEST })
      
      const {
        session: { user },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
      }};

      await axios.post(`http://localhost:5000/admin/removeStade`,
      {
        id
      },
      config

      ).then(response => {
          const {data} = response

          if(data.status === 'FAILED'){
            dispatch({
              type: STADE_DELETE_FAIL,
              payload: data.message})

          }else if(data.status === 'SUCCESS') {
            const {ville} = data
            dispatch({ type: STADE_DELETE_SUCCESS, payload: ville })
          }
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: STADE_DELETE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}


//User
export const profileSeenAction = (USER_ID) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: PROFILE_SEEN_REQUEST })
      sessionService.loadUser()
        .then(async (Users) => {
          config = {
            headers: {
              Authorization: `Bearer ${Users.token}`,
          }}

          await axios.post("http://localhost:5000/admin/profile",
            {
              USER_ID
            },
            config
          )
          .then(response => {
              const {data} = response

              if(data.status === 'FAILED'){
                dispatch({
                  type: PROFILE_SEEN_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const { User } = data
                dispatch({ type: PROFILE_SEEN_SUCCESS, payload: User[0] })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: PROFILE_SEEN_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const updatePicAction = (USER_ID, pic) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: UPDATE_PIC_REQUEST })
      sessionService.loadUser()
        .then(async (Users) => {
          config = {
            headers: {
              Authorization: `Bearer ${Users.token}`,
          }}

          await axios.post("http://localhost:5000/admin/updatepic",
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
                  type: UPDATE_PIC_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                dispatch({ type: UPDATE_PIC_SUCCESS, payload: data })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: UPDATE_PIC_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const contactMeesageSeenAction = (USER_ID) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: CONTACT_MESSAGE_SEEN_REQUEST })
      sessionService.loadUser()
        .then(async (Users) => {
          config = {
            headers: {
              Authorization: `Bearer ${Users.token}`,
          }}

          await axios.post("http://localhost:5000/admin/messageContact",
            {
              USER_ID
            },
            config
          )
          .then(response => {
              const {data} = response

              if(data.status === 'FAILED'){
                dispatch({
                  type: CONTACT_MESSAGE_SEEN_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                const { messages } = data
                dispatch({ type: CONTACT_MESSAGE_SEEN_SUCCESS, payload: messages })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: CONTACT_MESSAGE_SEEN_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const contactMeesageDeleteAction = (MESSAGE_ID) => async (dispatch) => {
  try {
    let config = {}
      dispatch({ type: CONTACT_MESSAGE_DELETE_REQUEST })
      sessionService.loadUser()
        .then(async (Users) => {
          config = {
            headers: {
              Authorization: `Bearer ${Users.token}`,
          }}

          await axios.post("http://localhost:5000/admin/deletemessageContact",
            {
              MESSAGE_ID
            },
            config
          )
          .then(response => {
              const {data} = response

              if(data.status === 'FAILED'){
                dispatch({
                  type: CONTACT_MESSAGE_DELETE_FAIL,
                  payload: data.message})

              }else if(data.status === 'SUCCESS') {
                dispatch({ type: CONTACT_MESSAGE_DELETE_SUCCESS, payload: data })
              }
          })
        })

      }
      catch (error){
        console.log(error);
          dispatch({
              type: CONTACT_MESSAGE_DELETE_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
      }
}

export const updateUserProfile = (variableUpdateProfile) => async dispatch => {
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
    let config = {}
    dispatch({ type: USER_UPDATE_REQUEST })

    sessionService.loadUser()
        .then(async (Users) => {
          config = {
            headers: {
              Authorization: `Bearer ${Users.token}`,
          }}

          await axios.post(
            "http://localhost:5000/admin/updateprofile",
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
            console.log(data);
      
            if(data.status === 'FAILED'){
              const { message } = data
      
              dispatch({
                type: USER_UPDATE_FAIL,
                payload: message
              })
            }else if(data.status === 'SUCCESS') {
              dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
            }
          })
    })
    } catch(error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
    })
  }
}