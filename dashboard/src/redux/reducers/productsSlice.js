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
  selectedProduct: [],
  status: 'idle',
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



// Add a new product with image upload
// export const addProductWithImage = createAsyncThunk('products/create', async (info, { rejectWithValue, fulfillWithValue }) => {
//   try {

//     const uploadResponse = await api.post('/uploads/', info, config);
//     const imageUrl = uploadResponse.data.imageUrl;

//     const uploadMultiple = await api.post('/uploads/upload-multiple', info, config);
//     const imageUrls = uploadMultiple.data.imageUrls;



//     // set new image url
//     info.set('imageUrl', imageUrl);
//     info.set('imageUrls', imageUrls);
//     const formDataObj = Object.fromEntries(info.entries());


//     const { data } = await api.post('fooditems/', formDataObj, config2);
//     console.log('Product API response:', data); // Log API response

//     return fulfillWithValue(data);
//   } catch (error) {
//     console.error('API error:', error.message);
//     return rejectWithValue(error.response.data);
//   }
// });

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

    
    const productFormData = new FormData(info);  
    productFormData.set('imageUrl', imageUrl);   
    productFormData.set('imageUrls', imageUrls); 
    
    const { data } = await api.post('fooditems/', productFormData, config2);
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
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(addProductWithImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log('Action payload:', action.payload); // Log action payload
        state.products = [...state.products, action.payload];
      })
      .addCase(addProductWithImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductWithImage.rejected, (state) => {
        state.status = 'failed';

      })
  }

});

export default productsSlice.reducer;