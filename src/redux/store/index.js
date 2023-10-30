import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlices';
import ruanganReducer from '../slices/ruanganSlice';
import lablayoutReducer from '../slices/LabLayoutSlice';
import computerReducer from '../slices/computerSlice';
import dashboardReducer from '../slices/dashboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ruangan: ruanganReducer,
    lablayout: lablayoutReducer,
    computer: computerReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
