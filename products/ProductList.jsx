import React from 'react';
import getProducts from './getProducts.js';
import MaterialBtn from '../materialComponents/MaterialButton.jsx';
import Shimmer from '../materialComponents/Shimmer.jsx';
import '../src/index.css';

//this is product list page component
// it will be used to display a list of products
// or a product catalog in the application
export default function ProductList() {
  const [loading, setLoading] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const [products, setProducts] = React.useState([]);

 
  return (
    <div>
     <div>
        Welcome to the Products List page
         </div>
         <div>
        <MaterialBtn 
          buttonName="Get Products" 
          buttonVariant="outlined" 
          buttonFunction={() => getProducts({ setLoading, setDisableButton, setProducts })}
          disableButton={disableButton}
        />
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
            {products.map(product => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        )
        
      )}

    </div>
    </div>
  
  )
}
