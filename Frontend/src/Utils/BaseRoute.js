import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'

const BaseRoute = ({children}) => {
    const session = useSelector((state) => state.session);
    const { authenticated, user } = session;
    let location = useLocation()
    

    if(!authenticated && user.data[0].role === "Admin"){
        return <Navigate
            replace 
            to = "/admin"
            state= {{
                from: location
            }}
        />
    } else {
        return children
    }
    
}

export default BaseRoute