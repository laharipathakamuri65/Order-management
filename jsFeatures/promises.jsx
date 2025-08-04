console.log("Hi, we are in promises");

// Fetching data from an API using promises
// This code fetches product data from a dummy JSON API and logs the response to the console.
export function promises() {
  
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res1 => console.log("Response from API: ", res1))
    .catch(err => console.error("Error fetching data: ", err));
}