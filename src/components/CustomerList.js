import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { API_URL } from '../constants';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true, width: 130, floatingFilter: true },
        { field: 'lastname', sortable: true, filter: true, width: 130, floatingFilter: true },
        { field: 'streetaddress', sortable: true, filter: true, width: 180, floatingFilter: true },
        { field: 'postcode', sortable: true, filter: true, width: 130, floatingFilter: true },
        { field: 'city', sortable: true, filter: true, width: 130, floatingFilter: true },
        { field: 'email', sortable: true, filter: true, width: 180, floatingFilter: true },
        { field: 'phone', sortable: true, filter: true, width: 180, floatingFilter: true },
        {
            cellRenderer: params =>
                <EditCustomer params={params.data} updateCustomer={updateCustomer} />, width: 120
        },
        {
            cellRenderer: params =>
                <Button
                    size='small'
                    color='error'
                    onClick={() => deleteCustomer(params)}
                >
                    Delete
                </Button>,
            width: 120
        },
    ]);

    const getCustomers = () => {
        fetch(API_URL + 'api/customers')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Something went wrong in GET request');
            })
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err));
    };


    useEffect(() => {
        getCustomers();
    }, []);

    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Customer deleted successfully');
                        setOpen(true);
                        getCustomers();
                    }
                    else {
                        alert('Something went wrong in DELETE request');
                    };
                })
                .catch(err => console.error(err));
        }
    };

    const addCustomer = (newCustomer) => {
        fetch(API_URL + 'api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer added successfully');
                    setOpen(true);
                    getCustomers();
                }
                else {
                    alert('Something went wrong in addition' + response.statusText);
                };
            })
            .catch(err => console.error(err));
    };

    const updateCustomer = (updatedCustomer, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer updated successfully');
                    setOpen(true);
                    getCustomers();
                }
                else {
                    alert('Something went wrong in update' + response.statusText);
                };
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Customers</Typography>
                </Toolbar>
            </AppBar>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                />
            </div>
            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default CustomerList;