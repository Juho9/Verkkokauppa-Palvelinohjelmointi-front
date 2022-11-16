import * as React from "react"
import Button from '@mui/material/Button';
import MovieList from '../pages/MovieList'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';


export default function UpdateMovie(props) {

    const [open, setOpen] = React.useState(false);
    const [movie, setMovie] = React.useState({
        name: '',
        description: '',
        director: '',
        year: '',
        actors: []
    });


    const handleClickOpen = () => {
        console.log(props.movie)
        setMovie({
           name: props.movie.name,
           description: props.movie.description,
           director: props.movie.director,
           year: props.movie.year,
           actors: props.movie.actors
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        console.log(movie)
    }

    const handleInputChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }

    const updateMovie = () => {
        props.updateMovie(movie, "https://verkkokauppa-spring.herokuapp.com/movies/"+props.movie.movieid);
        handleClose();
    }

    return(
        <div>
            <Button color="inherit" variant="outlined" onClick={handleClickOpen} >
                Update
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
                    <Button onClick={updateMovie} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}