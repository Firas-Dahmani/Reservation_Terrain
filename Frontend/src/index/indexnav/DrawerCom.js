import React, { useState } from 'react'
import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
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
    <React.Fragment>
        <Drawer 
        anchor="top"
        open={openDrawer}
        onClose={()=> setOpenDrawer(false)}
        
        >
            <List sx={{backgroundColor: "#0a192f", textAlign:'center',alignItems:"center", paddingLeft:'100px'}}>
                <ListItemButton  onClick={()=> setOpenDrawer(false) } to='/' component={Link}>
                    <ListItemIcon>
                        <ListItemText sx={{color:"#fff ", fontWeight:'700', borderBottom:'2px solid #fff', borderLeft:'2px solid #fff', paddingLeft:'5px'}} >HOME</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
                {!authenticated && <ListItemButton onClick={()=> setOpenDrawer(false) } to='/registerlogin' component={Link}>
                    <ListItemIcon>
                        <ListItemText sx={{color:"#fff ", fontWeight:'700', borderBottom:'2px solid #fff', borderLeft:'2px solid #fff', paddingLeft:'5px'}}>REGISTER/LOGIN</ListItemText>
                    </ListItemIcon>
                </ListItemButton>}
                <ListItemButton onClick={()=> setOpenDrawer(false) } to='/about' component={Link}>
                    <ListItemIcon>
                        <ListItemText sx={{color:"#fff ", fontWeight:'700', borderBottom:'2px solid #fff', borderLeft:'2px solid #fff', paddingLeft:'5px'}}>ABOUT</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={()=> setOpenDrawer(false) } to='/contact' component={Link}>
                    <ListItemIcon>
                        <ListItemText sx={{color:"#fff ", fontWeight:'700', borderBottom:'2px solid #fff', borderLeft:'2px solid #fff', paddingLeft:'5px'}}>CONTACT</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
                {authenticated && <ListItemButton onClick={()=> {setOpenDrawer(false); logoutHandler()} } to='/registerlogin'  component={Link}>
                    <ListItemIcon>
                        <ListItemText sx={{color:"#fff ", fontWeight:'700', borderBottom:'2px solid #fff', borderLeft:'2px solid #fff', paddingLeft:'5px'}}>LOGOUT</ListItemText>
                    </ListItemIcon>
                </ListItemButton>}
            </List>
        </Drawer>

        <IconButton sx={{ color: "white", marginLeft:"auto"}} onClick={()=> setOpenDrawer(!openDrawer)}>
            <MenuIcon />
        </IconButton>
    </React.Fragment>
  )
}

export default DrawerCom