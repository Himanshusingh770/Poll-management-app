// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import apiClient from '../utils/apiClient';
// // Async thunk for login
// export const login = createAsyncThunk(
//   'auth/login',
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await apiClient.post('/user/login', {
//         email: credentials.email,
//         password: credentials.password
//       });
//       const userData = response.data;
//       return { email: userData.email, name: userData.name };
//     } catch (error) {
//       if (error.response) {
//         return thunkAPI.rejectWithValue(error.response.data.message || 'Login failed');
//       }
//       return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
//     }
//   }
// );
// // Async thunk for signup
// export const signup = createAsyncThunk(
//   'auth/signup',
//   async (userDetails, thunkAPI) => {
//     try {
//       console.log('Sending user details:', userDetails); 
//       const response = await apiClient.post('/user/register', userDetails);
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         console.error('Error response:', error.response); 
//         return thunkAPI.rejectWithValue(error.response.data.message || 'Signup failed');
//       }
//       return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
//     }
//   }
// );
// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     isLoading: false,
//     error: null,
//     rolesError: null, 
//   },
//   extraReducers: (builder) => {
//     // Handle login
//     builder
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = false;
//         state.error = action.payload;
//       });
//     // Handle signup
//     builder
//       .addCase(signup.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(signup.fulfilled, (state) => {
//         state.isLoading = false;
//         state.isAuthenticated = false;
//         state.user = null; 
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = false;
//         state.error = action.payload;
//       });
//   }
// });
// export default authSlice.reducer;


// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await apiClient.post('/user/login', {
      email: credentials.email,
      password: credentials.password,
    });
    const userData = response.data;
    localStorage.setItem('user', JSON.stringify(userData)); // Store in LocalStorage
    return userData;
  } catch (error) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Login failed');
    }
    return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
  }
});

// Async thunk for signup
export const signup = createAsyncThunk('auth/signup', async (userDetails, thunkAPI) => {
  try {
    const response = await apiClient.post('/user/register', userDetails);
    const userData = response.data;
    localStorage.setItem('user', JSON.stringify(userData)); // Store in LocalStorage
    return userData;
  } catch (error) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Signup failed');
    }
    return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
  }
});

// Thunk for logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  localStorage.removeItem('user'); // Remove user data from LocalStorage
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Load from LocalStorage
    isAuthenticated: !!localStorage.getItem('user'), // Check if user exists
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Handle login
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
      })

      // Handle signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true; // Automatically log in after signup
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;

