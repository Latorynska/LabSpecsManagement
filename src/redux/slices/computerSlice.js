import { createSlice } from '@reduxjs/toolkit';
import { fetchLaporan, fetchComputerAndRuangData } from '../thunks/computerAPI';

const computerSlice = createSlice({
  name: 'computer',
  initialState: {
    laporanData: [],
    data: {},
    ruanganData: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaporan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLaporan.fulfilled, (state, action) => {
        state.loading = false;
        state.laporanData = action.payload;
        state.error = null;
      })
      .addCase(fetchLaporan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchComputerAndRuangData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComputerAndRuangData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.computer;
        state.ruanganData = action.payload.ruangan;
        state.error = null;
      })
      .addCase(fetchComputerAndRuangData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default computerSlice.reducer;
