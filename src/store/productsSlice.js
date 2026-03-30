import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products || [];
});

// Async thunk to update a single product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updatedData }, thunkAPI) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error(`Failed to update product: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || String(err));
    }
  }
);

// Async thunk to add a new product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, thunkAPI) => {
    try {
      const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error(`Failed to add product: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || String(err));
    }
  }
);

// Async thunk to fetch products for a given category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category, thunkAPI) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${encodeURIComponent(category)}`);
      const data = await res.json();
      return data.products || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || String(err));
    }
  }
);

// No direct API call here for update; product forms still call API and return response
const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    setProducts(state, action) {  
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load products';
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.items = state.items.map(p => (p.id === updated.id ? updated : p));
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Failed to update product';
      });
      // handle addProduct lifecycle
      builder
        .addCase(addProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.loading = false;
          // push newly created product into items (at start)
          state.items = [action.payload, ...state.items];
        })
        .addCase(addProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error?.message || 'Failed to add product';
        })
        .addCase(fetchProductsByCategory.pending, (state) => {
          // optional: use loading flag
          state.loading = true;
        })
        .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
          state.loading = false;
          // we don't modify state.items here; caller will use the returned list
        })
        .addCase(fetchProductsByCategory.rejected, (state) => {
          state.loading = false;
        });
  }
});



export const  fetchProductscategorylist = createAsyncThunk('getproductscategorylist/fetchProductscategorylist', async () => {
  const res = await fetch('https://dummyjson.com/products/category-list');
  const data = await res.json();
  return data.productscategorylist || [];
});

const productscategorylistSlice = createSlice({
  name: 'productscategorylist',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    setProductscategorylist(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductscategorylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductscategorylist.fulfilled, (state, action) => {
        state.loading = false;
         if (action.payload.status === 304) {
          // Keep existing items, but you can log or flag it
          state.items = state.items; // no overwrite
        } else {
          state.items = action.payload;
        }
      })
      .addCase(fetchProductscategorylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load category list';
      })
  }
});

export const { setProducts } = productsSlice.actions;
export const { setProductscategorylist } = productscategorylistSlice.actions;
export default productsSlice.reducer;