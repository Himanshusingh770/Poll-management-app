import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';
// Async thunk for login

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      // Make an API call to your login endpoint using the Axios instance
      const response = await apiClient.post('/user/login', {
        email: credentials.email,
        password: credentials.password
      });
      const userData = response.data;

      // Return the user data as the fulfilled action payload
      return {
        email: userData.email,
        name: userData.name
      };
    } catch (error) {
      console.error('API call failed: ', error); // Log the full error

      // Log detailed error response if available
      if (error.response) {
        console.log('Error response data: ', error.response.data);
        console.log('Error status: ', error.response.status);
        console.log('Error headers: ', error.response.headers);
        return thunkAPI.rejectWithValue(
          error.response.data.message || 'Login failed'
        );
      } else {
        return thunkAPI.rejectWithValue(
          'Something went wrong. Please try again.'
        );
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Initially, no user is stored
    isAuthenticated: false, // User is not authenticated by default
    isLoading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  }
});
export default authSlice.reducer;
