import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer({ addCustomer }) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        addCustomer(customer);
        handleClose();
        setCustomer({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: ''
        });
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                New Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        value={customer.firstname}
                        onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                        margin="dense"
                        label="First Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={customer.lastname}
                        onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={customer.phone}
                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                        margin="dense"
                        label="Phone"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={customer.streetaddress}
                        onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
                        margin="dense"
                        label="Street Address"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={customer.postcode}
                        onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
                        margin="dense"
                        label="Post Code"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={customer.city}
                        onChange={e => setCustomer({ ...customer, city: e.target.value })}
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
