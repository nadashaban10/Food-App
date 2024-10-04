import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api';


export const fetchSearch = createAsyncThunk('search/fetchSearch', async (name, { rejectWithValue }) => {
  try {
    const response = await api.get('fooditems/search', { params: { query: name } });
    console.log('response api: ', response)
    return response.data;

  } catch (error) {
    return rejectWithValue(error.response)
  }
})



const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearch.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

  }


});
export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;