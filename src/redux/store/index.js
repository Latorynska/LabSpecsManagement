import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlices';
import ruanganReducer from '../slices/ruanganSlice';
import lablayoutReducer from '../slices/lablayoutSlice';
import computerReducer from '../slices/computerSlice';
import dashboardReducer from '../slices/dashboardSlice';
import aiReducer from '../slices/aiSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    ruangan: ruanganReducer,
    lablayout: lablayoutReducer,
    computer: computerReducer,
    dashboard: dashboardReducer,
    ai: aiReducer,
  },
});

export default store;
