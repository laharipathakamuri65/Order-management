export default async function getUserdetails({setLoading, setUserDetails,setError}) { 
    setLoading(true);
  let res = await fetch("https://dummyjson.com/users");
  let data = await res.json();
  console.log("Fetching user data", data);
  if (data.users && data.users.length > 0) {
    setUserDetails(data.users);
    setLoading(false);
  } else {
    setError("Failed to fetch user details");
    setLoading(false);
  }
}

// Update a single product via API
export async function updateuserDetails({userId, updatedData}) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) {
      throw new Error(`Failed to update product: ${res.status}`);
    }
    const data = await res.json();
    console.log("User updated:", data);
    return data;
  } catch (err) {
    console.error("Error while updating user details:", err);
    throw err;
  }
}
