import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlices';
import ruanganReducer from '../slices/ruanganSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    ruangan: ruanganReducer,
  },
});

export default store;
