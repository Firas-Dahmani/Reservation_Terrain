import React, { useState } from 'react'
import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';


const PAGES = ["Home", "About", "Contact", "Login", "SignUp"];

function DrawerCom() {
    const [openDrawer, setOpenDrawer] = useState(false);
    

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
                <ListItemButton onClick={()=> setOpenDrawer(false) } to='/login' component={Link}>
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