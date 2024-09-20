import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api.jsx';

const config = {
  headers: {
    'content-type': `multipart/form-data`,
  }
};
const config2 = {
  headers: {
    'Content-Type': 'application/json',
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



// Add a new product with image upload
export const addProductWithImage = createAsyncThunk('products/create', async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const uploadResponse = await api.post('/uploads/', info, config);
    const imageUrl = uploadResponse.data.imageUrl; // Get the image URL from the response
    console.log('imageURL: ', imageUrl)
    // set new image url
    info.set('imageUrl', imageUrl);
    const formDataObj = Object.fromEntries(info.entries());


    const { data } = await api.post('fooditems/', formDataObj, config2);
    console.log('Product API response:', data); // Log API response

    return fulfillWithValue(data);
  } catch (error) {
    console.error('API error:', error.message);
    return rejectWithValue(error.response.data);
  }
});


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
        state.status = 'succeeded';
        console.log('Action payload:', action.payload); // Log action payload
        state.products = [...state.products, action.payload];
      });

  },
});

export default productsSlice.reducer;