import React, { useState } from 'react'
import {Drawer, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux-dep/actions/authActions';




function DrawerCom() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()


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
                        <ListItemText className="nav-link "  >Accueil</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton  onClick={()=> setOpenDrawer(false) } to='/userprofile' component={Link}>
                    <ListItemIcon>
                        <ListItemText className="nav-link "  >PROFILE</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={()=> {setOpenDrawer(false); logoutHandler()} } to='/registerlogin'  component={Link}>
                    <ListItemIcon>
                        <ListItemText >DÉCONNECTER</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>
        </Drawer>
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation" onClick={()=> setOpenDrawer(!openDrawer)}>
        <span className="navbar-toggler-icon  "><i className="fad fa-bars"></i></span>
        </button>
    </React.Fragment>
  )
}

export default DrawerCom