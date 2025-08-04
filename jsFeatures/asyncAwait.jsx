console.log("Hi, we are in asyncAwait");

export async function getdata(getDataFromAsyncAwait) {
  let res = await fetch("https://dummyjson.com/products");
  let data = await res.json();
  console.log("In child Fetching data using async/await...", data);
  if (data.products && data.products.length > 0) {
    getDataFromAsyncAwait(data);
  }
}

console.log("Async/Await example completed.");
console.log("date", new Date().toLocaleString());
