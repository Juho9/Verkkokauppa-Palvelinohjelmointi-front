import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import AddNewActor from '../components/AddNewActor'


export default function ActorList() {

    const [open, setOpen] = React.useState(false);
    const [actors, setActors] = React.useState([]);

    React.useEffect(() => fetchData(), ([]));

    const fetchData = () => {
        fetch("https://verkkokauppa-spring.herokuapp.com/actors")
        .then(response => response.json())
        .then(data => {
            setActors(data);
            console.log(actors)
        })    
    }


    const addActor = (actor) => {
        fetch("https://verkkokauppa-spring.herokuapp.com/actors", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actor)
        })
        .then(res => fetchData())
        .then(err => console.error(err))
    }

    const updateActor = (actor, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actor)
        })
        .then(res => fetchData())
        .then(err => console.error(err))
    }

    const deleteActor = (actorid) => {
        if (window.confirm('Are you sure you want to delete actor?')) {
            fetch("https://verkkokauppa-spring.herokuapp.com/actors/"+actorid, {method: "DELETE"})
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
            accessor: "actorid",
            Cell: row =>
                <Button onClick={() => deleteActor(row.value)}
                        color="inherit"
                        variant="outlined" size="small"
                        startIcon={<DeleteIcon />}>Delete</Button>
        }
    ]

    return(
        <div>
            <AddNewActor addActor={addActor} />
            <ReactTable data={actors} columns={columns} />
        </div>
    )
}