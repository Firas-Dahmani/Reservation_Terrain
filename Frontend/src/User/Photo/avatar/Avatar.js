import './Avatar.css'
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RenderCropper from '../Cropper/Cropper';





export default function RenderAvatar() {
    const [showCropper, setShowCropper] = useState(false)
    const handleCropper = () => setShowCropper((prevValue) => !prevValue)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <>
    <div className="avatar-container">
        
        <div className="avatar">
            <img src=""  alt='avatar' className='avatar-img'/>
        </div>

        <IconButton
        className="cameraIcon"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
            <CameraAltIcon fontSize='large' />
        </IconButton>
        <Menu 
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleClose}>View</MenuItem>
            <MenuItem onClick={() => {
                handleCropper()
                handleClose()
            }}>Change</MenuItem>
            <MenuItem onClick={handleClose}>Remove</MenuItem>
        </Menu>

    </div>
    { showCropper && <RenderCropper handleCropper= {handleCropper} />}
    </>
  )
}
