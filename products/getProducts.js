//Below API is to get products using async/await
// It fetches product data from a dummy JSON API and updates the state accordingly.

export default async function getProducts({setLoading, setDisableButton, setProducts}) {
  setLoading(true);
  setDisableButton(true);
  let res = await fetch("https://dummyjson.com/products");
  let data = await res.json();
  console.log("In getProducts Fetching data using async/await...", data);
  if (data.products && data.products.length > 0) {
    setProducts(data.products);
    setLoading(false);
    setDisableButton(false);
  }
  return data;
}

