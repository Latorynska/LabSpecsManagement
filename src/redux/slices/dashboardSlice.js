import { createSlice } from '@reduxjs/toolkit';
import { fetchSummary } from '../thunks/dashboardAPI';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    labSummaryData: [], 
    error: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSummary.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchSummary.fulfilled, (state, action) => {
      state.labSummaryData = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchSummary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'error tak terduga'; 
    });
  },
});

export default dashboardSlice.reducer;
