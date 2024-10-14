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
  selectedProduct: null,
  loadingProducts: 'idle',
  loadingSelectedProduct: 'idle',
  loadingAddProduct: 'idle',
  error: null,
};

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {

  try {
    const response = await api.get('fooditems/');
    console.log('API response:', response.data); // Log API response
    return response.data;
  } catch (error) {
    console.error('API error:', error.message); // Log any errors
    return error.message;
  }
});



// Delete  product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {

  try {
    const response = await api.delete(`fooditems/${id}`);
    console.log('API response:', response.data); // Log API response
    return response.data;
  } catch (error) {
    console.error('API error:', error.message); // Log any errors
    return error.message;
  }
});



// Get product by id
export const getProductById = createAsyncThunk('products/getProductById', async (id) => {

  try {
    const response = await api.get(`fooditems/${id}`);
    console.log('API response:', response.data); // Log API response
    return response.data;
  } catch (error) {
    console.error('API error:', error.message); // Log any errors
    return error.message;
  }
});



// Add New Product with image
export const addProductWithImage = createAsyncThunk('products/create', async (info, { rejectWithValue, fulfillWithValue }) => {
  try {

    // upload the single image 
    const singleImageFormData = new FormData();
    singleImageFormData.append('imageUrl', info.get('imageUrl'));

    const uploadResponse = await api.post('/uploads/', singleImageFormData, config);
    const imageUrl = uploadResponse.data.imageUrl;

    // upload multiple images 
    const multipleImageFormData = new FormData();
    const imageFiles = info.getAll('imageUrls');

    imageFiles.forEach((file) => {
      multipleImageFormData.append('imageUrls', file);
    });

    const uploadMultiple = await api.post('/uploads/upload-multiple', multipleImageFormData, config);
    const imageUrls = uploadMultiple.data.imageUrls;

    
    // if (typeof imageUrls === 'string') {
    //   imageUrls = JSON.parse(imageUrls);
    // }

    
    //console.log('imageUrls is an array:', imageUrls);


   
    info.set('imageUrl', imageUrl);
    info.set('imageUrls', imageUrls);

    imageUrls.forEach((url, index) => {
      info.append(`imageUrls[${index}]`, url);  
    });


    const { data } = await api.post('fooditems/', info, config2);
    console.log('Product API response:', data);

    return fulfillWithValue(data);
  } catch (error) {
    console.error('API error:', error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProducts = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProducts = 'failed';
        state.error = action.payload
      })

      // Get Product by id
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loadingSelectedProduct = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.loadingSelectedProduct = 'loading';
        state.error = null

      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loadingSelectedProduct = 'failed';
        state.error = action.payload;
      })

      // Add Product with image
      .addCase(addProductWithImage.fulfilled, (state, action) => {
        state.loadingAddProduct = 'succeeded';
        // console.log('Action payload:', action.payload); // Log action payload
        state.products = [...state.products, action.payload];
      })
      .addCase(addProductWithImage.pending, (state) => {
        state.loadingAddProduct = 'loading';
        state.error = null
      })
      .addCase(addProductWithImage.rejected, (state, action) => {
        state.loadingAddProduct = 'failed';
        state.error = action.payload

      })
  }

});

export default productsSlice.reducer;