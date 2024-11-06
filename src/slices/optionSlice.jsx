import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../utils/apiClient"; // Using apiClient for API requests

// Async thunk to add an option to a poll
export const addOption = createAsyncThunk(
  "option/addOption",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post(`/poll/addPollOption/${data.id}`, {
        optionTitle: data.optionTitle,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed to add option"
      );
    }
  }
);





const optionSlice = createSlice({
  name: "option",
  initialState: {
    options: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Option
      .addCase(addOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOption.fulfilled, (state, action) => {
        state.loading = false;
        state.options.push(action.payload);
      })
      .addCase(addOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Option
    

   
  },
});

export default optionSlice.reducer;




