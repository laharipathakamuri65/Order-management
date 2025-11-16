import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserDialogBox from './UserDialogBox';
import EditIcon from '@mui/icons-material/Edit';

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
            <TableCell align="center">Editoption</TableCell>
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
                <UserDialogBox userDetails={row} dialogName='Update user details' dialogButton={<EditIcon />} onSubmit={onUpdateUser} />
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
