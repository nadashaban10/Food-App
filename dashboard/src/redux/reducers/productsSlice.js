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



// // Add New Product with image
// export const addProductWithImage = createAsyncThunk('products/create', async (info, { rejectWithValue, fulfillWithValue }) => {
//   try {

//     // upload the single image 
//     const singleImageFormData = new FormData();
//     singleImageFormData.append('imageUrl', info.get('imageUrl'));

//     const uploadResponse = await api.post('/uploads/', singleImageFormData, config);
//     const imageUrl = uploadResponse.data.imageUrl;

//     // upload multiple images 
//     const multipleImageFormData = new FormData();
//     const imageFiles = info.getAll('imageUrls');

//     imageFiles.forEach((file) => {
//       multipleImageFormData.append('imageUrls', file);
//     });

//     const uploadMultiple = await api.post('/uploads/upload-multiple', multipleImageFormData, config);
//     const imageUrls = uploadMultiple.data.imageUrls;

    
   
//     info.set('imageUrl', imageUrl);
//     info.set('imageUrls', imageUrls);

//     imageUrls.forEach((url, index) => {
//       info.append(`imageUrls[${index}]`, url);  
//     });


//     const { data } = await api.post('fooditems/', info, config2);
//     console.log('Product API response:', data);

//     return fulfillWithValue(data);
//   } catch (error) {
//     console.error('API error:', error.message);
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });


// Add New Product with image
// export const addProductWithImage = createAsyncThunk('products/create', async (info, { rejectWithValue, fulfillWithValue }) => {
//   try {
//     // Upload the single image
//     const singleImageFormData = new FormData();
//     singleImageFormData.append('imageUrl', info.get('imageUrl'));

//     const uploadResponse = await api.post('/uploads/', singleImageFormData, config);
//     const { imageUrl, public_id: singlePublicId } = uploadResponse.data;  // public_id for single image

//     // Upload multiple images
//     const multipleImageFormData = new FormData();
//     const imageFiles = info.getAll('imageUrls');

//     imageFiles.forEach((file) => {
//       multipleImageFormData.append('imageUrls', file);
//     });

//     const uploadMultiple = await api.post('/uploads/upload-multiple', multipleImageFormData, config);
//     const imageUrls = uploadMultiple.data.imageUrls; // array of image URLs
//     const publicIds = uploadMultiple.data.public_ids; // public_ids for multiple images

    
//     info.set('imageUrl', imageUrl);
//     info.set('public_id', singlePublicId); 

//     info.set('imageUrls', imageUrls);
//     info.set('public_ids', JSON.stringify(publicIds)); 

//     const { data } = await api.post('fooditems/', info, config2);
//     console.log('Product API response:', data);

//     return fulfillWithValue(data);
//   } catch (error) {
//     console.error('API error:', error.message);
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });


export const addProductWithImage = createAsyncThunk('products/create', async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    // Upload single image
    const singleImageFormData = new FormData();
    singleImageFormData.append('imageUrl', info.get('imageUrl'));

    const uploadResponse = await api.post('/uploads/', singleImageFormData, config);
    const imageUrl = uploadResponse.data.imageUrl;
    const public_id = uploadResponse.data.public_id;

    // Upload multiple images
    const multipleImageFormData = new FormData();
    const imageFiles = info.getAll('imageUrls');
    imageFiles.forEach(file => {
      multipleImageFormData.append('imageUrls', file);
    });

    const uploadMultiple = await api.post('/uploads/upload-multiple', multipleImageFormData, config);
    const imageUrls = uploadMultiple.data.imageUrls;
    const public_ids = uploadMultiple.data.public_ids;

<<<<<<< HEAD
    // Set imageUrl, imageUrls, public_id, and public_ids to the info object
    info.set('imageUrl', imageUrl);
    info.set('public_id', public_id);
    info.set('imageUrls', JSON.stringify(imageUrls));
    info.set('public_ids', JSON.stringify(public_ids));
=======

    // if (typeof imageUrls === 'string') {
    //   imageUrls = JSON.parse(imageUrls);
    // }


    //console.log('imageUrls is an array:', imageUrls);



    info.set('imageUrl', imageUrl);
    info.set('imageUrls', imageUrls);

    imageUrls.forEach((url, index) => {
      info.append(`imageUrls[${index}]`, url);
    });
>>>>>>> edee8cf08d4e4726e08264a3be0ae840a6f60e6e


    const { data } = await api.post('fooditems/', info, config2);
    return fulfillWithValue(data);
  } catch (error) {
    console.error('API error:', error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});




const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetLoadingState(state) {
      state.loadingAddProduct = 'idle';
    },
  },
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

export const { resetLoadingState } = productsSlice.actions;

export default productsSlice.reducer;