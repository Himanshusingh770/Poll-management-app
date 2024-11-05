import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import rolesReducer from '../slices/rolesSlice'; 
import pollsReducer from '../slices/pollsSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
    polls: pollsReducer, 
  },
});

export default store;
