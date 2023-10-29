import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLaporan,
  fetchComputerAndRuangData,
  createLaporan,
  updateLaporan,
  deleteLaporan,
  createPenyelesaian,
} from '../thunks/computerAPI';

const computerSlice = createSlice({
  name: 'computer',
  initialState: {
    laporanData: [],
    selectedLaporan: null,
    data: {},
    ruanganData: {},
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedLaporan: (state, action) => {
      state.selectedLaporan = action.payload;
    },
    resetSelectedLaporan: (state) => {
      state.selectedLaporan = null;
    },
  },
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
        state.error = action.error.message;
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
        state.error = action.error.message; 
      })
      .addCase(createLaporan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLaporan.fulfilled, (state, action) => {
        state.loading = false;
        state.laporanData.push(action.payload);
        state.error = null;
      })
      .addCase(createLaporan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
      .addCase(updateLaporan.fulfilled, (state, action) => {
        const index = state.laporanData.findIndex((laporan) => laporan.id === action.payload.id);
        if (index !== -1) {
          state.laporanData[index] = action.payload;
        }
      })
      .addCase(deleteLaporan.fulfilled, (state, action) => {
        state.laporanData = state.laporanData.filter((laporan) => laporan.id !== action.payload);
      })
      .addCase(createPenyelesaian.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPenyelesaian.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
      .addCase(createPenyelesaian.fulfilled, (state, action) => {
        const laporanToUpdate = state.laporanData.find((laporan) => laporan.id === action.payload.laporanId);
        if (laporanToUpdate) {
          laporanToUpdate.penyelesaian = action.payload.penyelesaianData;
        }
      });
  },
});

export const { setSelectedLaporan, resetSelectedLaporan } = computerSlice.actions;

export default computerSlice.reducer;
