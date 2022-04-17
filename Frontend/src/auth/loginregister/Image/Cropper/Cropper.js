import {  Button, IconButton, Slider} from "@mui/material";
import { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from '../Utils/cropImage'
import CancelIcon from '@mui/icons-material/Cancel';
import './Cropper.css'
import { makeStyles } from '@mui/styles';
import { dataURLtoFile } from "..//Utils/dataURLtoFile";
import CustomizedSnackbars from './../../../../User/Photo/Snackbar/Snackbar';



const useStyles = makeStyles({
	iconButton: {
		position: "absolute",
		top: "20px",
		right: "20px",
    zIndex:"99999"
	},
	cancelIcon: {
		color: "#00a3c8",
		fontSize: "50px",
		"&:hover": {
			color: "red",
		},
	},
});

export default function RenderCropper({handleCropper, setPicImage, setShowCropper}) {
  const [error, setError] = useState(false); 
  const [message, setMessage] = useState('')
  const classes = useStyles();
    const inputRef = useRef()
    const triggerFileSelectPopup = () => inputRef.current.click();
  
    const [image, setImage] = useState();
      const [croppedArea, setCroppedArea] = useState(null);
      const [crop, setCrop] = useState({ x: 0, y: 0 });
      const [zoom, setZoom] = useState(1);
  
      const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
          setCroppedArea(croppedAreaPixels);
      };

      
  
    const onSelectFile = (e) => {
      if(e.target.files && e.target.files.length > 0){
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.addEventListener("load", () => {
                  setImage(reader.result);
              });
      }
    }


      const onClear = () => {
        if (!image)
         {
          setError(true)
          setMessage("Cannot Clear empty image !")
         }else{
          setImage(null);
         }
    
      };

     

    const onUpload = async () => {
      if (!image)
        {
          setError(true)
          setMessage("Cannot Upload empty image !")
        }
  
      const canvas = await getCroppedImg(image, croppedArea);
      const canvasDataUrl = canvas.toDataURL("image/jpeg");
      const convertedUrlToFile = dataURLtoFile(
        canvasDataUrl,
        "cropped-image.jpeg"
      );

      const readeCovertFile = new FileReader();
        readeCovertFile.readAsDataURL(convertedUrlToFile)
        readeCovertFile.addEventListener("load", () => {
          setPicImage(readeCovertFile.result);
      });
          setShowCropper(false)
    }


    const callback = () => {
      setError(false)
    }
  
    return (
      
        <div className='container'>
          {error ?  <CustomizedSnackbars message = {message} open={error} onClose={callback} /> : <></> }
          <IconButton className={classes.iconButton} onClick={handleCropper}>
            <CancelIcon className={classes.cancelIcon} />
          </IconButton>
          <div className='container-cropper'>
            {image ? (
              <>
                <div className='cropper'>
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
  
                <div className='slider'>
                  <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </div>
              </>
            ) : null}
          </div>
        <div className="container-buttons">
          <input 
            type="file" 
            name="pic"
            accept="image/*"
            ref={inputRef}
            onChange= {onSelectFile}
            style={{ display:"none" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => onClear()}
            style={{ marginRight: "10px" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={triggerFileSelectPopup }
            style={{ marginRight: "10px" }}
          >
            Choose
          </Button>
          <Button
            variant='contained' 
            color='secondary' 
            onClick={onUpload }
            style={{ marginRight: "10px" }}
          >
            Save
          </Button>
        </div>
      </div>
    );
}
