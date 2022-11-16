import * as React from "react"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function AddActorToMovie(props) {

    
    const [actors, setActors] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [actor, setActor] = React.useState({
        actorid: 0
})
    
    

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
        fetch("https://verkkokauppa-spring.herokuapp.com/actors")
        .then(res => res.json())
        .then(data => {
            setActors(data)
            console.log(data)
        });
    }

    const handleChange = (e) => {
        setActor({ ...actor, [e.target.name]: e.target.value })
    }

    const addActor = () => {
        props.addActor(actor);
        console.log(actor)
    }

    
    return(
        <div>
            <Button variant="contained" color="background" onClick={handleClickOpen} >
                Add Actor
            </Button>
            <Dialog className="profile-dialog" open={open} onClose={handleClose} 
                    aria-labelledby="trainings-dialog" fullWidth maxWidth="md" maxheight="xl" >
                
                <DialogContent style={{height: '60%'}} >
                    
                    
                    <div className="actorstable" style={{height: '200', width: '100%'}} >
                        <p>Add actor from list:</p> 

                        <TextField 
                            id="actorselect"
                            select
                            label="Select"
                            name="actorid"
                            type="number"
                            value={actor.actorid}
                            onChange={(e) => handleChange(e)}
                            helperText="Select actor"
                        >
                                {actors.map((option) => (
                                    <MenuItem key={option.actorid} value={option.actorid}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <Button onClick={addActor} >Add actor</Button>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}