import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function DeleteButton({onDelete}:{
    onDelete: () => void
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >

            <Button sx={{p: "0.2rem",
                color: "black",fontSize: '0.7rem',
                float: "right",
                mt: ".3rem"}}
                onClick={handleClickOpen}>
                Delete
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        are you sure you want to delete this Product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(handleClose)}>NO</Button>
                    <Button onClick={() => {
                        onDelete()
                        handleClose()
                    }}>YES</Button>
                </DialogActions>
            </Dialog>


</div>

    );
}
