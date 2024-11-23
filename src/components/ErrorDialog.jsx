
import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const ErrorDialog = ({text, onClose}) => {
    return(
        <Dialog open onClose={onClose}>
            <DialogTitle variant='h5' color="Red" id="dialog-error-title">
                Error
            </DialogTitle>
            <DialogContent sx={{display:"flex", flexDirection:"column",alignItems:"center", gap:"1.2rem"}}>
                <Typography>{text}</Typography>
                <img width={120} src='logoError.png' alt='Error Img'></img>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose}>
                    cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ErrorDialog;