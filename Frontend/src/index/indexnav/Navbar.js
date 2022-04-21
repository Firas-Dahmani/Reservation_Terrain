import {AppBar,Box,Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material"
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import  DrawerCom  from './DrawerCom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../Redux-dep/actions/authActions";


function Navbar() {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const session = useSelector((state) => state.session);
    const { authenticated } = session;

    const logoutHandler = () =>{
        dispatch(logout(navigate))
    }

  return (
    <div className="navbarHome">
        <AppBar sx= {{background : "#0a192f"}} >
            <Toolbar >
                <Typography fontSize="25px" fontWeight="900px">SoccerLand</Typography>
                {
                    isMatch ? (
                        <>
                            <DrawerCom />
                        </>
                    ) 
                    
                    : 
                    
                    (
                        
                        <Box  sx={{ display:'inline-flex', width: 'top', marginLeft:'150px' }}>
                            <Tabs textColor="inherit" value={value} onChange={(e,val)=> setValue(val)} indicatorColor="secondary">
                                <Tab className="tab" label="Home" to='/' component={Link}/>                                
                                <Tab className="tab" label="About" to='/about' component={Link} />                                
                                <Tab className="tab" label="Contact" to='/contact' component={Link} />                                
                                {authenticated && <Tab className="tab" onClick={logoutHandler} label="LOGOUT" /* to='/registerlogin' component={Link} */ /> }                               
                                {!authenticated && <Tab className="tab" label="Register/Login" to='/registerlogin' component={Link} />}                                
                            </Tabs>
                        </Box>
                        
                    )
                }
                
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navbar