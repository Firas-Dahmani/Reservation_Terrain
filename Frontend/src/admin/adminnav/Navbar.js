import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import  DrawerCom  from './DrawerCom';
import { logout } from "../../Redux-dep/actions/authActions";
import { useDispatch } from 'react-redux';


function AdminNavbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const logoutHandler = () =>{
        dispatch(logout(navigate))
    }

  return (
    <div className="navbar-area">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img className="image" src={require('../../assets/logo.png')} alt="" /></a>
                <DrawerCom />
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link "  to='/' >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link "  to='/addowner' >Add Owner</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link "  to='/ville' >Ville</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link "  to='/stade' >Stade</Link>
                        </li>
                        <li className="nav-item">
                                <Link className="nav-link " onClick={logoutHandler} label="LOGOUT" to='/registerlogin' >LOGOUT</Link>
                        </li> 
                    </ul>
                </div>
            </div>
            </nav>
        </div>
    </div>
  )
}

export default AdminNavbar