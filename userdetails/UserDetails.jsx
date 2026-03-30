import React from 'react';
import {useEffect} from 'react';
import getUserdetails from './getUserdetails.js';
import MaterialTable from '../materialComponents/MaterialTable.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, userUpdated, updateUser } from '../src/store/usersSlice';

export default function UserDetails() {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.users.items);
  const loading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);

  const handleUpdateUser = async (updatedUser) => {
  
    try {
      // dispatch thunk to perform API update and update store on success
      dispatch(updateUser({ userId: updatedUser.id, updatedData: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
      }}));
    } catch (err) {
      console.error('Failed to dispatch updateUser:', err);
      throw err;
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userDetails || userDetails.length === 0) return <p>No user details found</p>;

  console.log('User Details:', userDetails);
  return (
    <div>
     <MaterialTable userDetails={userDetails} 
     onUpdateUser={handleUpdateUser} />
   </div>
  );

}
    