import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useNavigate } from 'react-router-dom';
import Navbarcss from './Navbar.module.css'
import {  useDispatch } from 'react-redux';
import { logout } from '../../Redux-dep/actions/userActions';

export default function MenuNav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate()



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () =>{
        dispatch(logout())
        navigate('/registerlogin')
    }

  return (
    <div className={Navbarcss.dropdownmenu}>
      <Button
        id="button"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {<ArrowDropDownIcon style = {
          {
            fontSize:'35px',
            color:'white'
          }
        } />}
      </Button>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'button',
        }}
      >
        <MenuItem onClick={handleClose} to='/' component={Link}>Profile</MenuItem>
        <MenuItem onClick={() => {handleClose(); logoutHandler()}} >Logout</MenuItem>
      </Menu>
    </div>
  );
}