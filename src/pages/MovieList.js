import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import AddNewMovie from '../components/AddNewMovie'
import MovieInfoPage from './MovieInfoPage';
import UpdateMovie from '../components/UpdateMovie'


export default function MovieList() {

    const [open, setOpen] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    


    React.useEffect(() => fetchData(), ([]));

    const fetchData = () => {
        fetch("https://verkkokauppa-spring.herokuapp.com/movies")
        .then(response => response.json())
        .then(data => {
            setMovies(data);
            console.log(movies);
        })    
    }


    const movieData = (movie, link) => {
        fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
        .then(res => fetchData())
        .then(err => console.error(err))
    }


    const addMovie = (movie) => {
        fetch("https://verkkokauppa-spring.herokuapp.com/movies", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
        .then(res => fetchData())
        .then(err => console.error(err))
    }
  
    const updateMovie = (movie, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
        .then(res => fetchData())
        .then(err => console.error(err))
    }


    const deleteMovie = (movieid) => {
        if (window.confirm('Are you sure you want to delete movie?')) {
            fetch("https://verkkokauppa-spring.herokuapp.com/movies/"+movieid, {method: "DELETE"})
            .then(res => fetchData())
            .catch(err => console.error(err))
            setOpen(true);
        }
    }


    const columns = [
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Description',
            accessor: 'description'
        },
        {
            Cell: row =>
                <MovieInfoPage movieData={movieData} movie={row.original} />
        },
        {
            Cell: row =>
                <UpdateMovie updateMovie={updateMovie} movie={row.original} />
        },
        {
            accessor: "movieid",
            Cell: row => 
                <Button onClick={() => deleteMovie(row.value)}
                                color="inherit"
                                variant="outlined" size="small"
                                startIcon={<DeleteIcon />}>Delete</Button>
        }
    ]

    return(
        <div width="70%">
            <AddNewMovie addMovie={addMovie} />
            <ReactTable data={movies} columns={columns} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Movie deleted!" />
        </div>
    )
}