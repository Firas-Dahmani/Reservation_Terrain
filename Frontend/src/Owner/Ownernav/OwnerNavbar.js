import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Navbar.css'

import NavbarList from './NavList';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Redux-dep/actions/authActions';
import { useDispatch} from 'react-redux';
import { sessionService } from 'redux-react-session';

const drawerWidthOpen = 240;
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;

export default function OwnerNavbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const [pic, setPic] = useState()
  const [nom, setNom] = useState()
  const [prenom, setprenom] = useState()

  sessionService.loadUser()
        .then((User) => {
            setPic(User.data[0].pic)
            setNom(User.data[0].lastName)
            setprenom(User.data[0].firstName)
        })

  function toogleOpen() {
    setOpen(!open);
  }

  const logoutHandler = () =>{
    dispatch(logout(navigate))
    }


  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '42px',
          width: 'auto',
          backgroundColor: 'transparent',
          margin: '14px 14px',
          padding: '12px 0px',
          borderBottom: '1px solid black',
          alignItems: 'flex-end',
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: open ? 'none' : { xs: 'none', sm: 'initial' },
            marginBottom: '9px',
          }}
        >
        </Box>
        <Typography
          variant="h1"
          noWrap={true}
          gutterBottom
          sx={{
            display: { xs: 'none', sm: 'initial' },
            fontSize: '18px',
            fontWeight: 600,
            color: 'black',
            width: '154px',
            marginLeft: open ? '0px' : '8px',
            paddingBottom: '3px',
          }}
        >
          OWNER PANEL
        </Typography>
      </Box>

      <List dense={true}>
        {NavbarList.map((key, index) => (
          <div key={index}>
            {index === 0 ? (
              <>
                <Divider variant="middle" light={true} />
              </>
            ) : (
              <Tooltip
                title={open ? key.desc : ''}
                placement={'right'}
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: 'gray',
                      color: 'white',
                      marginLeft: '22px !important',
                      boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
                    },
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    margin: '6px 14px',
                    padding: '10px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#26284687',
                    },
                  }}
                  to={key.link} component={Link}
                >
                  <ListItemIcon sx={{ minWidth: '46px' }}>
                    <Badge
                      badgeContent={key.badge}
                      color="secondary"
                      variant="dot"
                    >
                      <key.icon sx={{ fontSize: '20px', color: 'black' }} />
                    </Badge>
                  </ListItemIcon>

                  <ListItemText
                    primary={key.desc}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                    sx={{
                      display: 'inline',
                      margin: '0px',
                      overflowX: 'hidden',
                      color: 'black',
                      whiteSpace: 'nowrap',
                      minWidth: '126px',
                    }}
                  />
                  {key.badge !== 0 ? (
                    <Chip
                      label={key.badge}
                      color={'secondary'}
                      size="small"
                      sx={{ height: 'auto' }}
                    />
                  ) : (
                    <></>
                  )}
                </ListItemButton>
              </Tooltip>
            )}
          </div>
        ))}
        <Divider variant="middle" light={true} />
      </List>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignContents: 'center',
          margin: '14px 14px',
          padding: '12px 4px',
          borderTop: '1px solid black',
        }}
        onClick={logoutHandler}
      >
        <IconButton sx={{ color: 'black' }}>
          <ExitToAppIcon />
        </IconButton>
        
        <Typography
          variant="h1"
          noWrap={true}
          gutterBottom
          sx={{
            display: { xs: 'none', sm: 'initial' },
            fontSize: '18px',
            color: 'black',
            width: '154px',
            marginLeft: open ? '0px' : '8px',
            paddingTop: '10px',
            cursor:'pointer'
          }}
        >
          Deconnecter
        </Typography>
      </Box>
    </>
  );

  return (
    <>
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                width: open
                    ? { xs: '0px', sm: drawerWidthClose }
                    : { xs: drawerWidthClose, sm: drawerWidthOpen },
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: open
                    ? theme.transitions.duration.leavingScreen
                    : theme.transitions.duration.enteringScreen,
                }),
                '& .MuiDrawer-paper': {
                    justifyContent: 'space-between',
                    overflowX: 'hidden',
                    width: open
                    ? { xs: '0px', sm: drawerWidthClose }
                    : { xs: drawerWidthClose, sm: drawerWidthOpen },
                    borderRight: '0px',
                    borderRadius: '0px 10px 10px 0px',
                    boxShadow: theme.shadows[8],
                    backgroundColor: open ? '#fff' : '#fff',
                    transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: open
                        ? theme.transitions.duration.leavingScreen
                        : theme.transitions.duration.enteringScreen,
                    }),
                },
                }}
            >
                {drawerContent}
            </Drawer>
            </Box>
            <header className="header">
            <div className="container-fluid">
            <div className="row">
                <div className="col-lg-5 col-md-5 col-6 ">
                <div className=" header-right d-flex align-items-center">
                    {/* <!-- profile start --> */}
                    <div className="profile-box ml-15">
                    <button
                        className="dropdown-toggle bg-transparent border-0"
                        type="button"
                        id="profile"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <div className="profile-info">
                        <div className="info">
                            
                            <div className="image">
                            <img
                                src={pic}
                                alt=""
                            />
                            <span className="status"></span>
                            </div>
                            <h6>{prenom} {nom}</h6>
                        </div>
                        </div>
                        <i className="lni lni-chevron-down"></i>
                    </button>
                    </div>
                    {/* <!-- profile end --> */}
                </div>
                </div>
                <div className=" col-lg-7 col-md-7 col-6">
                    <div className="header-left">
                        <div className="menu-toggle-btn mr-20">
                            <Button
                                onClick={toogleOpen}
                                sx={{
                                    minWidth: 'initial',
                                    padding: '10px',
                                    color: 'gray',
                                    borderRadius: '8px',
                                    
                                }}
                                >
                                <MenuIcon
                                    sx={{ fontSize: '25px', color: open ? 'black' : 'black' }}
                                ></MenuIcon>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </header>
    </>
  );
}