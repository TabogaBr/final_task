import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    const [columnDefs] = useState([
        {
            field: 'date', sortable: true, filter: true, width: 180, floatingFilter: true,
            cellRenderer: params => dayjs(params.value).format('DD.MM.YYYY hh:mm')
        },
        {
            field: 'duration', sortable: true, filter: true, width: 150, headerName: 'Duration (min)', floatingFilter: true,
            cellRenderer: params => params.value + ' min'
        },
        { field: 'activity', sortable: true, filter: true, width: 180, floatingFilter: true },
        {
            field: 'customer', sortable: true, filter: true, width: 180, floatingFilter: true,
            cellRenderer: params => params.value.firstname + ' ' + params.value.lastname
        },
        {
            cellRenderer: params =>
                <Button
                    size='small'
                    color='error'
                    onClick={() => deleteTraining(params)}
                >
                    Delete
                </Button>,
            width: 120
        },
    ]);

    const getTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Something went wrong in GET request');
            })
            .then(data => setTrainings(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getTrainings();
    }, []);

    const deleteTraining = (params) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            fetch(`http://traineeapp.azurewebsites.net/api/trainings/${params.data.id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setOpen(true);
                        getTrainings();
                    }
                    else {
                        alert('Something went wrong in DELETE request');
                    };
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Trainings</Typography>
                </Toolbar>
            </AppBar>
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                />
            </div>
            <Snackbar
                open={open}
                message="Training deleted successfully"
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default TrainingList;