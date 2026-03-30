import React from 'react';
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateProduct, addProduct, fetchProductscategorylist } from '../src/store/productsSlice';
import ProductForm from './ProductForm.jsx';
import Shimmer from '../materialComponents/Shimmer.jsx';
import '../src/index.css';
import MaterialBasicCard from '../materialComponents/MaterialCard.jsx';
import MDialogBox from '../materialComponents/MDialogBox.jsx';

//this is product list page component
// it will be used to display a list of products
// or a product catalog in the application

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  console.log('state', useSelector(state => state));
  const loading = useSelector(state => state.products.loading);
  const handleClickOpen = () => setOpen(true);
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [open, setOpen] = React.useState(false);


  // callback to update a product in the products array
  const handleUpdateProduct = (updatedProduct) => {
    // Dispatch thunk to update product via API and update store
    dispatch(updateProduct({ productId: updatedProduct.id, updatedData: {
      title: updatedProduct.title,
      brand: updatedProduct.brand,
      category: updatedProduct.category,
      description: updatedProduct.description,
    }}));
  };
  useEffect(() => {
    dispatch(fetchProducts());
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
             
        <h3>
          <span>
            Welcome to the Products List page
            <MDialogBox
              dialogButton={"Add Product"}
              dialogName={"Add Product details"}
              formComponent={ProductForm} 
              dialogContentText={"Create a new product"}
              itemType={"product"}
              dialogMaxWidth={'lg'}
              formProps={{ mode: 'add' }}
              onOpen={() => dispatch(fetchProductscategorylist())}
              onSubmit={(newProduct) => dispatch(addProduct(newProduct))}
            />
          </span>
        </h3>
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


