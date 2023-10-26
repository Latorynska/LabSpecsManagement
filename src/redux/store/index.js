import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlices';
import ruanganReducer from '../slices/ruanganSlice';
import lablayoutReducer from '../slices/LabLayoutSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ruangan: ruanganReducer,
    lablayout: lablayoutReducer,
  },
});

export default store;
