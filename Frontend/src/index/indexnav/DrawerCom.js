import React, { useState } from 'react'
import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux-dep/actions/userActions';




function DrawerCom() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = () =>{
        dispatch(logout(navigate))
    }
    

  return (
    <React.Fragment>
        <Drawer open={openDrawer}
        onClose={()=> setOpenDrawer(false)}>
            <List>
                <ListItemButton onClick={()=> setOpenDrawer(false) } to='/' component={Link}>
                    <ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={()=> {setOpenDrawer(false); logoutHandler()} } to='/registerlogin'  component={Link}>
                    <ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>
        </Drawer>

        <IconButton sx={{ color: "white", marginLeft:"auto"}} onClick={()=> setOpenDrawer(!openDrawer)}>
            <MenuIcon />
        </IconButton>
    </React.Fragment>
  )
}

export default DrawerCom