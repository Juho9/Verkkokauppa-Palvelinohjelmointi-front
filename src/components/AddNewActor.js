import * as React from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';




export default function AddNewActor(props) {

    

    const [actors, setActors] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [actor, setActor] = React.useState({
        name: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
        fetch("https://verkkokauppa-spring.herokuapp.com/actors")
        .then(res => res.json())
        .then(data => {
            setActors(data)
            console.log(data)
        });
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (e) => {
        setActor({ ...actor, [e.target.name]: e.target.value });
    }

    const addActor = () => {
        props.addActor(actor)
        handleClose();
    }

    


    return(
        <div>
            <Button color="inherit" variant="outlined" onClick={handleClickOpen} >
                Add new actor!
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="addmovie-dialog" >
                <DialogTitle>New Actor</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        value={actor.name}
                        label="Name:"
                        type="text"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cancel
                    </Button>
                    <Button onClick={addActor} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}