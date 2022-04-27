import { Navigate, useLocation } from 'react-router-dom'
import { sessionService } from 'redux-react-session';
import { useState } from 'react';

const AdminRoute = ({children}) => {
    const [Role, setRole] = useState("")

    sessionService.loadUser()
      .then((User) => {
        setRole(User.data[0].role)
      })
      .catch(()=> {
        setRole("No User")
      })
  
    let location = useLocation()

    if(Role !== "Admin"){
        return <Navigate
            replace 
            to = "/"
            state= {{
                from: location
            }}
        />
    }else{
        return children
    }

}

export default AdminRoute