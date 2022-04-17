import {AppBar,Box,Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material"
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Navbarcss from './Navbar.module.css'
import  DrawerCom  from './DrawerCom';
import MenuNav from './MenuNav';


function Navbar() {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div className={Navbarcss.navbar}>
        <React.Fragment >
        <AppBar sx= {{background : "#0a192f"}}>
            <Toolbar>
                <Typography fontSize="25px" fontWeight="900px">SoccerLand</Typography>
                {
                    isMatch ? (
                        <>
                            <DrawerCom />
                        </>
                    ) 
                    
                    : 
                    
                    (
                        <Box  sx={{ display:'inline-flex', width: '100%', marginLeft:'150px' }}>
                            <Tabs textColor="inherit" value={value} onChange={(e,val)=> setValue(val)} indicatorColor="secondary">
                                <Tab label="Home" to='/' component={Link}/>                                
                                <Tab label="About" to='/about' component={Link} />                                
                                <Tab label="Contact" to='/contact' component={Link} />                                
                                <Tab label="Register/Login" to='/registerlogin' component={Link} />                                
                            </Tabs>
                            <MenuNav />
                        </Box>
                    )
                }
                
            </Toolbar>
        </AppBar>
    </React.Fragment>
    </div>
  )
}

export default Navbar