//Below API is to get products using async/await
// It fetches product data from a dummy JSON API and updates the state accordingly.

export default async function getProducts({setLoading, setProducts}) {
  setLoading(true);
  try {
    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();
    console.log("In getProducts Fetching data using async/await...", data);
    if (data.products && data.products.length > 0) {
      setProducts(data.products);
    }
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  } finally {
    setLoading(false);
  }
}

// Update a single product via API
export async function updateProduct({productId, updatedData}) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) {
      throw new Error(`Failed to update product: ${res.status}`);
    }
    const data = await res.json();
    console.log("Product updated:", data);
    return data;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
}
