import React, { useState } from 'react'
import {Drawer, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux-dep/actions/authActions';




function DrawerCom() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const session = useSelector((state) => state.session);
    const { authenticated } = session;

    const logoutHandler = () =>{
        dispatch(logout(navigate))
    }
    

  return (
    <React.Fragment >
        <Drawer 
        anchor="top"
        open={openDrawer}
        onClose={()=> setOpenDrawer(false)}
        
        >
            <List className='navbar-nav  align-items-center justify-content-center' sx={{backgroundColor: "#fff", textAlign:'center',alignItems:"center"}}>
                <ListItemButton  onClick={()=> setOpenDrawer(false) } to='/' component={Link}>
                    <ListItemIcon>
                        <ListItemText className="nav-link "  >HOME</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={()=> {setOpenDrawer(false); logoutHandler()} } to='/registerlogin'  component={Link}>
                    <ListItemIcon>
                        <ListItemText >LOGOUT</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>
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
        </Drawer>
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation" onClick={()=> setOpenDrawer(!openDrawer)}>
        <span className="navbar-toggler-icon "></span>
        </button>
    </React.Fragment>
  )
}

export default DrawerCom