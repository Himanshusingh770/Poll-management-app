import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import rolesReducer from '../slices/rolesSlice'; 
const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer, 
  },
});

export default store;
