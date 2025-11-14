import React from 'react';
import {useEffect} from 'react';
import getUserdetails from './getUserdetails.js';
import MaterialTable from '../materialComponents/MaterialTable.jsx';


export default function UserDetails() {
  const [loading, setLoading] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState([]);
  const [error, setError] = React.useState(null);

  // Runs once when component mounts
  useEffect(() => {
    getUserdetails({ setLoading, setUserDetails, setError });
  }, []); // Empty dependency array = run once on mount

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userDetails) return <p>No user details found</p>;
  console.log('User Details:', userDetails);
  return (
    <div>
     <MaterialTable userDetails={userDetails} />
   </div>
  );
 
}
    