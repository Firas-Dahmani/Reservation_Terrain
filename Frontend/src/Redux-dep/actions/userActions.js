import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from './../constant/userConstant';
import  axios  from 'axios';
import { sessionService } from 'redux-react-session';




export const login = (email, password, navigate) => async (dispatch) => {
  
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
          headers : {
            "Content-type": "application/json",
          },
        }
        await axios.post(
          "http://localhost:5000/api/login",
          {
            email,
            password,
          },
          config ).then(response => {
            const {data} = response

            if(data.status === 'FAILED'){
              const { message } = data

              dispatch({
                type: USER_LOGIN_FAIL,
                payload: message
              })
            }else if(data.status === 'SUCCESS') {
              const userDATA = data.data[0]
              dispatch({ type: USER_LOGIN_SUCCESS, payload: userDATA })

              const token = userDATA._id

              sessionService.saveSession(token).then(()=> {
                sessionService.saveUser(userDATA).then(()=> {
                  navigate('/')
                })
              })
            }
          })

        }
        catch (error){
          console.log(error);
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
}

export const logout = (navigate) => async (dispatch) => {
    sessionService.deleteSession()
    sessionService.deleteUser()
    navigate('/registerlogin')
    dispatch({ type: USER_LOGOUT });
  };

export const register = (variableRegister) => async dispatch => {
          const [
            firstname,
            lastname,
            email,
            tel,
            date,
            genre,
            adress,
            ville,
            codePostale,
            password,
            role,
            pic,
            navigate
          ] = variableRegister
          try{
            dispatch({ type: USER_REGISTER_REQUEST })
            const config = {
                headers :{
                    "Content-type": "application/json",
                },
            }
             await axios.post(
              "http://localhost:5000/api/register",
              {
                firstname,
                lastname,
                email,
                tel,
                date,
                genre,
                adress,
                ville,
                codePostale,
                password,
                role,
                pic
              },
              config
            ).then(response => {
              const {data} = response
              console.log(data);
  
              if(data.status === 'FAILED'){
                const { message } = data
  
                dispatch({
                  type: USER_REGISTER_FAIL,
                  payload: message
                })
              }else if(data.status === 'PENDING') {
                dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
                navigate(`/emailsent/${email}`)
              }
            })
            
          }catch(error){
            dispatch({
              type: USER_REGISTER_FAIL,
              payload:
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
          }
}