import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { API_ADD_TRAINING_CUSTOMERID } from '../constants';
import { MenuItem, InputLabel, FormControl, Select } from '@mui/material';

export default function AddTraining({ addTraining, customers }) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: null,
        duration: '',
        activity: '',
        customer: API_ADD_TRAINING_CUSTOMERID + '3664'
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        addTraining(training);
        handleClose();
        setTraining({
            date: null,
            duration: '',
            activity: '',
            customer: API_ADD_TRAINING_CUSTOMERID + '3664'
        });
    };

    const onChange = (e) => {
        setTraining({ ...training, customer: e.target.value });
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                New Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date"
                            date={training.date}
                            onChange={(newDate) => {
                                setTraining({ ...training, date: newDate.toISOString() });
                            }}
                            renderInput={(params) => <TextField autofocus label="Date" fullWidth {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                    <FormControl fullWidth>
                        <InputLabel id="Customer URL">Customer</InputLabel>
                        <Select
                            labelId="Customer URL"
                            id="Customer URL"
                            value={training.customer}
                            label="Customer URL"
                            onChange={onChange}
                        >
                            {customers.map((customer) => (
                                <MenuItem key={customer.links[0].href} value={customer.links[0].href}>
                                    {customer.firstname} {customer.lastname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
