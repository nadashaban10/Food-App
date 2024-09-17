import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api.jsx';


const config = {
  headers: {
    'Content-Type': `multipart/form-data`,
  }
};

const initialState = {
  products: [],
  status: 'idle',
};

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.get('products');
  return response.data;
});


export const addProductWithImage = createAsyncThunk('products/create', async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api.post('/fooditems/', info, config);
    console.log('product API response:', data); // Log API response
    return fulfillWithValue(data);
  }
  catch (error) {
    console.error('API error:', error.message); // Log any errors
    return rejectWithValue(error.response.data);

  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addProductWithImage.fulfilled, (state, action) => {
        state.products = action.payload;

      })

  },
});

export default productsSlice.reducer;