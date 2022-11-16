import * as React from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import AddActorToMovie from "../components/AddActorToMovie";

export default function MovieInfoPage(props) {

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

    const addActor = (actor) => {
        fetch("https://verkkokauppa-spring.herokuapp.com/movies/"+props.movie.movieid+"/actors", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actor)
        })
        .then(err => console.error(err))
        .then(handleClose)
        .then(window.location.reload(false))
        
    }        

    return(
        <div>
            <Button variant="contained" color="background" onClick={handleClickOpen} >
                Details
            </Button>
            <Dialog className="profile-dialog" open={open} onClose={handleClose} 
                    aria-labelledby="trainings-dialog" fullWidth maxWidth="md" maxheight="xl" >
                <h2 textAlign="center" >{movie.name}</h2>
                <DialogContent style={{height: '60%'}} >
                    
                    <Typography>{movie.description}</Typography>
                    <Typography>Director: {movie.director}</Typography>
                    <Typography>Year: {movie.year}</Typography>
                    <div className="c-traininsTable" style={{height: '200', width: '100%'}} >
                        <p>Actors:</p> 
                        <table>    
                            
                            <tbody>
                            {
                                movie.actors.map((actors, index) => 
                                <tr key={index}>
                                    <td>{actors.name}</td>
                                </tr>
                                )
                            }
                            </tbody>
                         </table>
                    <AddActorToMovie addActor={addActor} />
                    </div>
                </DialogContent>
            </Dialog>
            
        </div>
    )
}