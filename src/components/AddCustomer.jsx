import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle, DialogContent, TextField } from "@mui/material";

export default function AddCustomer({ addCustomer }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAdd = () => {
    setOpen(false);
    addCustomer(customer);
    setCustomer({
      ...customer,
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    });
  };
  const handleCancel = () => {
    setOpen(false);
    setCustomer({
        ...customer,
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
      });
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const inputChanged = (event) => {
    console.log("inputti changed");
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>Add Customer</DialogTitle>

          <TextField
            autoFocus={true}
            value={customer.firstname}
            onChange={inputChanged}
            margin="dense"
            label="Firstname"
            name="firstname"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            value={customer.lastname}
            onChange={inputChanged}
            margin="dense"
            label="Lastname"
            name="lastname"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            value={customer.streetaddress}
            onChange={inputChanged}
            margin="dense"
            label="Street address"
            name="streetaddress"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            value={customer.postcode}
            onChange={inputChanged}
            margin="dense"
            label="Postcode"
            name="postcode"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            value={customer.city}
            onChange={inputChanged}
            margin="dense"
            label="City"
            name="city"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            value={customer.email}
            onChange={inputChanged}
            margin="dense"
            label="Email"
            name="email"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            value={customer.phone}
            onChange={inputChanged}
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth={true}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}