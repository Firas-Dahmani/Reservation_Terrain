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
    USER_REGISTER_OWNER_SUCCESS
} from "../constant/AdminConstant";
import  axios  from 'axios';



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