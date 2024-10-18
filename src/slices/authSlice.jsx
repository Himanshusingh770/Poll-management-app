import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';
// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post('/user/login', {
        email: credentials.email,
        password: credentials.password
      });
      const userData = response.data;
      return { email: userData.email, name: userData.name };
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message || 'Login failed');
      }
      return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
    }
  }
);
// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userDetails, thunkAPI) => {
    try {
      console.log('Sending user details:', userDetails); // Log user details
      const response = await apiClient.post('/user/register', userDetails);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response); // Log the full error response
        return thunkAPI.rejectWithValue(error.response.data.message || 'Signup failed');
      }
      return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    roles: [],
    rolesError: null, 
  },
  extraReducers: (builder) => {
    // Handle login
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
    // Handle signup
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null; 
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  }
});
export default authSlice.reducer;
