
import * as React from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';




export default function AddNewMovie(props) {

    

    const [actors, setActors] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [movie, setMovie] = React.useState({
        name: '',
        description: '',
        director: '',
        year: ''
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
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }

    const addMovie = () => {
        props.addMovie(movie)
        console.log(movie)
        handleClose();
    }

    


    return(
        <div>
            <Button color="inherit" variant="outlined" onClick={handleClickOpen} >
                Add new movie
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="addmovie-dialog" >
                <DialogTitle>New Movie</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        value={movie.name}
                        label="Name:"
                        type="text"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        value={movie.description}
                        label="Description:"
                        type="text"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="director"
                        value={movie.director}
                        label="Director:"
                        type="text"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        value={movie.year}
                        label="Year:"
                        type="number"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cancel
                    </Button>
                    <Button onClick={addMovie} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}