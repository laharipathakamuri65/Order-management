import * as React from 'react';
import Button from '@mui/material/Button';
import MaterialBtn from '../materialComponents/MaterialButton.jsx';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// Note: This component only renders a custom `formComponent` passed via props.
// Generic Reusable DialogBox component for editing any data (products, users, etc.)
// Props:
// - dialogName: string (dialog title)
// - dialogButton: node (button/icon to open dialog)
// - data: object (object to edit - can be product, user, etc.)
// - formComponent: React component (custom form with onSuccess/onError/onSavingChange callbacks)
//   If provided, uses this form; otherwise uses field-based form
// - fields: array of field objects [{name, label, required, maxLength, multiline, rows}, ...]
//   Only used if formComponent is NOT provided
// - onSubmit: function(updatedData) -> called on successful form submit (handles API and local state)
// - dialogContentText: string (description text in dialog)
// - itemType: string (e.g., 'product', 'user') - for error/success messages
export default function MDialogBox({ 
  dialogName, 
  dialogButton, 
  data, 
  formComponent: FormComponent = null,
  onSubmit, 
  dialogContentText,
  itemType = 'item',
  dialogMaxWidth = 'sm',
  formProps = {},
  onOpen, // optional callback invoked when dialog actually opens
}) {
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [isSaving, setIsSaving] = React.useState(false);
  const [formIsValid, setFormIsValid] = React.useState(false);
  const formComponentRef = React.useRef(null);
  const formRef = React.useRef(null); // DOM ref to child <form>
  const openedRef = React.useRef(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Call onOpen callback when the dialog transitions to open.
  //Line 50-65 are using for creating products using category list
  React.useEffect(() => {
    if (!open) {
      // reset so onOpen can fire again next time dialog opens
      openedRef.current = false;
      return;
    }
    if (open && typeof onOpen === 'function' && !openedRef.current) {
      try {
        onOpen();
      } catch (err) {
        console.error('onOpen callback error:', err);
      }
      openedRef.current = true;
    }
  }, [open, onOpen]);

  // Callbacks for custom form component to use
  const handleFormSuccess = (responseData) => {
    console.log('Form success responseData:', responseData);
    setSnackbarMessage(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} updated successfully!`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    
    if (typeof onSubmit === 'function') {
      onSubmit(responseData);
    }

    setTimeout(() => {
      handleClose();
    }, 500);
  };

  const handleFormError = (error) => {
    setSnackbarMessage(error.message || `Failed to update ${itemType}`);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
    console.error(`Error updating ${itemType}:`, error);
  };

  const handleFormSavingChange = (saving) => {
    setIsSaving(saving);
  };

  // Callback for form to notify dialog of validation state changes
  const handleFormValidationChange = (isValid) => {
    setFormIsValid(isValid);
  };

  // Handle Save button click - trigger the child form submit. Prefer
  // requestSubmit when available, fall back to dispatchEvent for older
  // environments.
  const handleSaveClick = () => {
    if (!formRef.current) return;
    const el = formRef.current;
    try {
      if (typeof el.requestSubmit === 'function') {
        el.requestSubmit();
      } else {
        // create a cancelable submit event so handlers can prevent default
        el.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    } catch (err) {
      console.error('Error triggering form submit:', err);
    }
  };

  // If custom form component is provided, use it
  if (FormComponent) {
    return (
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          {dialogButton}
        </Button>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={dialogMaxWidth}>
          <DialogTitle>{dialogName}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogContentText}</DialogContentText>

            {/* Render custom form component with callbacks and ref. Only pass the
                single canonical `data` prop and the form ref; avoid duplicate
                props like `userData`/`productData`. The custom form can expose
                validation/saving state via the provided callbacks or via ref. */}
            <FormComponent
              ref={formComponentRef}
              data={data}
              formRef={formRef}
              onSuccess={handleFormSuccess}
              onError={handleFormError}
              onSavingChange={handleFormSavingChange}
              onValidationChange={handleFormValidationChange}
              {...formProps}
            />
          </DialogContent>
          <DialogActions>
            <MaterialBtn buttonName="Cancel" buttonVariant='outlined' buttonFunction={handleClose}/>
            {/* <Button onClick={handleClose} disabled={isSaving}>Cancel</Button> */}
            {/* <Button 
              onClick={handleSaveClick}
              disabled={!formIsValid || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button> */}
            <MaterialBtn buttonName={isSaving ? 'Saving...' : 'Save'} buttonVariant='outlined' buttonFunction={handleSaveClick} disableButton={!formIsValid || isSaving}/>
            {/* <Button 
              onClick={handleSaveClick}
              disabled={!formIsValid || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button> */}
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
  // If no FormComponent was supplied, render nothing. Calling code should
  // always pass a form component into this dialog (keeps the dialog focused).
  return null;
}
