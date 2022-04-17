import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';



export default function CustomizedSnackbars({message, open, onClose}) {
   

  return (

      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert onClose={onClose} severity="warning" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

  );
}
