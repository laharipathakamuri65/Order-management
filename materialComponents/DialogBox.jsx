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
import { updateProduct } from '../products/getProducts.js';

// DialogBox now exposes a Formik form to edit product details.
// Props:
// - dialogName: string (used as dialog title)
// - dialogButton: node (button/icon to open dialog)
// - productData: object (product to edit)
// - onSubmit: function(updatedProduct) -> called when form submits
export default function DialogBox({ dialogName, dialogButton, productData, onSubmit }) {
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [isSaving, setIsSaving] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Validation schema: title required string max 10, brand/category/description required
  const validationSchema = Yup.object({
    title: Yup.string().required('Product name is required').max(30, 'Max 30 characters'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productData?.title ?? '',
      brand: productData?.brand ?? '',
      category: productData?.category ?? '',
      description: productData?.description ?? '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // Merge values into productData and call API
      const updated = { ...productData, ...values };
      setIsSaving(true);

      try {
        // Call updateProduct API with productId and updated data
        const apiResponse = await updateProduct({
          productId: productData.id,
          updatedData: {
            title: values.title,
            brand: values.brand,
            category: values.category,
            description: values.description,
          },
        });

        // Show success snackbar
        setSnackbarMessage('Product updated successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        // Call parent callback with API response to update UI with server data
        // Merge API response with local product state to ensure all fields (id, etc.) are preserved
        const responseData = { ...productData, ...apiResponse };
        if (typeof onSubmit === 'function') onSubmit(responseData);

        // Close dialog after success
        setTimeout(() => {
          handleClose();
        }, 500);
      } catch (error) {
        // Show error snackbar
        setSnackbarMessage(error.message || 'Failed to update product');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        console.error('Error updating product:', error);
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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{dialogName}</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit product details and submit.</DialogContentText>

          <form onSubmit={formik.handleSubmit} id="edit-product-form">
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="title"
              name="title"
              label="Product Name"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <TextField
              fullWidth
              margin="dense"
              id="brand"
              name="brand"
              label="Brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
            />

            <TextField
              fullWidth
              margin="dense"
              id="category"
              name="category"
              label="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            />

            <TextField
              fullWidth
              margin="dense"
              id="description"
              name="description"
              label="Description"
              multiline
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSaving}>Cancel</Button>
          <Button 
            type="submit" 
            form="edit-product-form"
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
