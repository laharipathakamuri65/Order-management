import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MaterialBtn from '../materialComponents/MaterialButton.jsx';
import MaterialCard from './MaterialCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogviewContentText from '@mui/material/DialogContentText';

export default function DialogBoxview({
  dialogName, 
  dialogviewButton,
  dialogButton,
  data, 
  formComponent: FormComponent = null,
  dialogviewContentText,
  itemType = 'item',
  formProps = {},
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   const formComponentRef = React.useRef(null);
    const formRef = React.useRef(null);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {dialogviewButton}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{dialogName}</DialogTitle>
        <DialogContent>
          <DialogviewContentText>{dialogviewContentText}</DialogviewContentText>
          <FormComponent
            data={data}
            {...formProps}
          />
        </DialogContent>
        <DialogActions>
            <MaterialBtn buttonName="Cancel" buttonVariant='outlined' buttonFunction={handleClose}/>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


