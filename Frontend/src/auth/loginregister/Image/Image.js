import './Image.css'
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState , useEffect} from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RenderCropper from './Cropper/Cropper';



export default function RenderImage({setPicRegister, pic}) {
    const [showCropper, setShowCropper] = useState(false)
    const [picImage, setPicImage] = useState(null);
    
    const handleCropper = () => setShowCropper((prevValue) => !prevValue)
    
    useEffect(() => {
        if(picImage !== null) {
            setPicRegister(picImage)
        }
    },[picImage])


  return (
    <>
    <div className="avatar-container">
        
        <div className="avatar">
            <img src={pic}  className='avatar-img'/>
        </div>

        <IconButton
        className="cameraIcon"
        id="basic-button"
        onClick={ handleCropper}
        >
            <CameraAltIcon fontSize='large' />
        </IconButton>

    </div>
    { showCropper && <RenderCropper handleCropper= {handleCropper} setPicImage = {setPicImage} setShowCropper = {setShowCropper} /> }
    </>
  )
}
