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
