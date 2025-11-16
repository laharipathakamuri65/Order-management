import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateuserDetails } from '../userdetails/getUserdetails.js';

export default function UserDialogBox({dialogName, dialogButton, userDetails, onSubmit}) {
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
    const [isSaving, setIsSaving] = React.useState(false);
console.log('userDetails in dialog box:', userDetails);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };

  // Validation schema: title required string max 10, brand/category/description required
    const validationSchema = Yup.object({
      lastName: Yup.string().required('Last name is required').max(30, 'Max 30 characters'),
      firstName: Yup.string().required('First name is required').max(30, 'Max 30 characters'),
      phone: Yup.string().required('Phone is required'),
      email: Yup.string().required('Email is required').email('Invalid email format'),
      gender: Yup.string().required('Gender is required'),
    });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastName: userDetails?.lastName || '',
      firstName: userDetails?.firstName || '',
      phone: userDetails?.phone || '',
      email: userDetails?.email || '',
      gender: userDetails?.gender || '',
    },
    validationSchema,
      onSubmit: async (values) => {
      // Merge values into productData and call API
      const updated = { ...userDetails, ...values };
      setIsSaving(true);
      try {
              // Call updateProduct API with productId and updated data
              const apiResponse = await updateuserDetails({
                userId: userDetails.id,
                updatedData: {
                  lastName: values.lastName,
                  firstName: values.firstName,
                  phone: values.phone,
                  email: values.email,
                  gender: values.gender,
     }
  });
        // Show success snackbar
        setSnackbarMessage('Product updated successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleClose();

        // Call parent callback with API response to update UI with server data
        // Merge API response with local product state to ensure all fields (id, etc.) are preserved
        const responseData = { ...userDetails, ...apiResponse };
        if (typeof onSubmit === 'function') onSubmit(responseData);

        // Close dialog after success
        setTimeout(() => {
          handleClose();
        }, 500);
       } catch (error) {
        // Show error snackbar
        setSnackbarMessage(error.message || 'Failed to update user details');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        console.error('Error updating user details:', error);
      } finally {
        setIsSaving(false);
      }
  },
});

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {dialogButton}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogName}</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit user details and submit.</DialogContentText>
          <form onSubmit={formik.handleSubmit} id="edit-userdetails-form">
            <TextField
              autoFocus
              required
              margin="dense"
              name="lastName"
              label="Lastname"
              type="text"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="firstName"
              label="Firstname"
              type="text"
              fullWidth
              
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="phone"
              label="Phone"
              type="text"
              fullWidth
              
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email"
              type="text"
              fullWidth
              
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="gender"
              label="Gender"
              type="text"
              fullWidth
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSaving}>Cancel</Button>
          <Button 
            type="submit" 
            form="edit-userdetails-form"
            disabled={!formik.isValid || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success/error feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
