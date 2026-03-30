import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MDialogBox from './MDialogBox';
import UserForm from '../userdetails/UserForm';
import EditIcon from '@mui/icons-material/Edit';
import DialogBoxview from './DialogBoxview.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function BasicTable({ userDetails, onUpdateUser }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Lastname</TableCell>
            <TableCell align="center">Firstname</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDetails.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {row.lastName}
              </TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">
                <MDialogBox
                  data={row}
                  dialogName={`Edit ${row.firstName} ${row.lastName}`}
                  dialogButton={<EditIcon />}
                  formComponent={UserForm}
                  onSubmit={onUpdateUser}
                  dialogContentText="Update user details and save."
                  itemType="user"
                />
                <DialogBoxview  
                  data={row}         
                  dialogName={`View ${row.firstName} ${row.lastName} details`}
                  dialogButton={<VisibilityIcon />}
                  formComponent={UserForm}
                  onSubmit={onUpdateUser}
                  dialogviewButton={<VisibilityIcon />}
                  dialogviewContentText="User details"
                  itemType="user"
                />
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
