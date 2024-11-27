import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle, DialogContent, TextField } from "@mui/material";

export default function EditCustomer({ editCustomer, params }) {
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
    setCustomer({
      firstname: params.data.firstname,
      lastname: params.data.lastname,
      streetaddress: params.data.streetaddress,
      postcode: params.data.postcode,
      city: params.data.city,
      email: params.data.email,
      phone: params.data.phone,
    });
  };

  const handleEdit = () => {
    setOpen(false);
    editCustomer(customer, params.value);
  };
  const handleCancel = () => {
    setOpen(false);
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
        Edit customer
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>Edit Customer</DialogTitle>

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
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}