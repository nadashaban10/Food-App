import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api';


const config = {
  headers: {
    'Content-Type': `multipart/form-data`,
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

    //  Upload the image
    const formData = new FormData();
    formData.append('image', info.get('image')); // Assuming info.image is the image file object

    const uploadResponse = await api.post('/uploads/', formData, config);
    const imageUrl = uploadResponse.data.imageUrl; // Get the image URL from the response

    // Update info object with imageUrl
    const formData2 = new FormData();
    formData2.append('image', imageUrl);
    formData2.append('name', info.get('name'));
    formData2.append('description', info.get('description'));
    const { data } = await api.post('categories/', formData2, config);
    console.log('product API response:', data); // Log API response
    return fulfillWithValue(data);
  }
  catch (error) {
    console.error('API error:', error.message); // Log any errors
    return rejectWithValue(error.response.data);

  }
})


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
        state.categories = action.payload;
      });
  },
});

export default categoriesSlice.reducer;