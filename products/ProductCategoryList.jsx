import React from 'react';
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductscategorylist } from '../src/store/productsSlice';
import MaterialBtn from '../materialComponents/MaterialButton.jsx';
import Shimmer from '../materialComponents/Shimmer.jsx';


export default function ProductCategoryList() {
  const dispatch = useDispatch();
  const productscategorylist = useSelector(state => state.productscategorylist.items);
  const loading = useSelector(state => state.productscategorylist.loading);
  const handleClickOpen = () => setOpen(true);

const AddProduct = () => {
    // Trigger API call via Redux thunk
    dispatch(fetchProductscategorylist());
  };

return (
    <div>
        <div>
            
      {loading && <Shimmer />}
    </div>
    </div>
);

}
            
            