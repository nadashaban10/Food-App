import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api';


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

// Initial state with a more structured format
const initialState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await api.get('categories/');
    // console.log('API response:', response.data); // Log API response
    return response.data;
  } catch (error) {
    console.error('API error:', error.message); // Log any errors
    return error.message;
  }
});



export const addCategoryWithImg = createAsyncThunk('products/create', async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const uploadResponse = await api.post('/uploads/', info, config);
    const imageUrl = uploadResponse.data.imageUrl; // Get the image URL from the response
    // set new image url
    info.set('imageUrl', imageUrl);
    // create new category
    const formDataObj = Object.fromEntries(info.entries());
    const { data } = await api.post('categories/', formDataObj, config2);
    console.log('product API response:', data); // Log API response
    return fulfillWithValue(data);
  }
  catch (error) {
    console.error('API error:', error.message); // Log any errors
    return rejectWithValue(error.response.data);

  }
});


// Slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log('Action payload:', action.payload); // Log action payload
        state.categories = action.payload;
      })
      .addCase(addCategoryWithImg.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Action payload:', action.payload); // Log action payload
        state.categories = [...state.categories, action.payload];
      });
  },
});

export default categoriesSlice.reducer;