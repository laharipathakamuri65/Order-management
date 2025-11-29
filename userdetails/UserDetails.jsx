import React from 'react';
import {useEffect} from 'react';
import getUserdetails, { updateuserDetails } from './getUserdetails.js';
import MaterialTable from '../materialComponents/MaterialTable.jsx';


export default function UserDetails() {
  const [loading, setLoading] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState([]);
  const [error, setError] = React.useState(null);

  const handleUpdateUser = async (updatedUser) => {
    try {
      // Call API to update user
      const apiResponse = await updateuserDetails({
        userId: updatedUser.id,
        updatedData: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phone: updatedUser.phone,
          gender: updatedUser.gender,
        },
      });

      // Update local state with API response
      const responseData = { ...updatedUser, ...apiResponse };
      setUserDetails((prev) => prev.map(u => (u.id === responseData.id ? responseData : u)));
    } catch (err) {
      console.error('Error updating user:', err);
      throw err; // Let MDialogBox handle the error display
    }
  };
  
  // Runs once when component mounts
  useEffect(() => {
    getUserdetails({ setLoading, setUserDetails, setError });
  }, []); // Empty dependency array = run once on mount

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
    