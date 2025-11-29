import React from 'react';
import {useEffect} from 'react';
import getProducts from './getProducts.js';
import MaterialBtn from '../materialComponents/MaterialButton.jsx';
import Shimmer from '../materialComponents/Shimmer.jsx';
import '../src/index.css';
import MaterialBasicCard from '../materialComponents/MaterialCard.jsx';

//this is product list page component
// it will be used to display a list of products
// or a product catalog in the application

export default function ProductList() {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);

  // callback to update a product in the products array
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  useEffect(() => {
    getProducts({ setLoading, setProducts });
    }, []);

  
  console.log('Products:', products);
 
 
  return (
    <div>
     
         <div>
    </div>
    <div>
      {loading && <p>Fetching products... pls don't spam the button</p>}
    </div>  
    <div>
      {loading ? (
        <Shimmer />
      ) : ( 
        // Render your actual product list or content here
        products.length > 0 && (
          <ul>
            <div>
        <h3>Welcome to the Products List page</h3>
         </div>
            {products.map(product => (
              <div key={product.id} >
                <MaterialBasicCard
                  productData={product}
                  onUpdateProduct={handleUpdateProduct}
                />
              </div>

            ))}
          </ul>
        )

      )}

    </div>

    </div>
  
  )
}


