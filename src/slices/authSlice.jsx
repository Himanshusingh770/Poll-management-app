// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock login credentials (replace with real backend later)
const mockUser = {
  email: 'cse4himanshu@gmail.com',
  password: 'Himanshu@123',
  name: 'Test User',
};

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check hardcoded credentials
  if (credentials.email === mockUser.email && credentials.password === mockUser.password) {
    // Store user credentials in localStorage
    localStorage.setItem('user', JSON.stringify({
      email: mockUser.email,
      name: mockUser.name,
    }));

    return {
      email: mockUser.email,
      name: mockUser.name,
    };
  } else {
    return thunkAPI.rejectWithValue('Invalid email or password');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    isLoading: false,
    error: null,
  },
    // Clear localStorage and reset state
  // reducers: {
  //   logout(state) {
  //     localStorage.removeItem('user');
  //     state.user = null;
  //     state.isAuthenticated = false;
  //   }
  // },
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
  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
