import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import  DrawerCom  from './DrawerCom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../Redux-dep/actions/authActions";


function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const session = useSelector((state) => state.session);
    const { authenticated } = session;

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
                            <Link className="nav-link "  to='/about' >About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link "  to='/contact' >Contact Us</Link>
                        </li>
                        {authenticated &&
                            <li className="nav-item">
                                <Link className="nav-link " onClick={logoutHandler} label="LOGOUT" to='/registerlogin' >LOGOUT</Link>
                            </li>                  
                        }
                        {!authenticated &&
                            <li className="nav-item">
                                <Link className="nav-link "  to='/registerlogin' >LOG IN</Link>
                            </li>                  
                        }
                    </ul>
                </div>
            </div>
            </nav>
        </div>
    </div>
  )
}

export default Navbar