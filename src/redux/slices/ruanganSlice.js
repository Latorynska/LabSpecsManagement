import { createSlice } from '@reduxjs/toolkit';
import { addRuanganData, fetchRuanganData, updateRuanganData, deleteRuanganData } from '../thunks/ruanganAPI';

const ruanganSlice = createSlice({
  name: 'ruangan',
  initialState: {
    ruanganData: [],
    selectedRuangan: {
      id: '',
      namaRuangan: '',
      konfigurasi: '',
      posisiServer: '',
      deskripsi: '',
    },
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedRuangan: (state, action) => {
      state.selectedRuangan = action.payload;
    },
    resetSelectedRuangan: (state) => {
      state.selectedRuangan = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRuanganData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRuanganData.fulfilled, (state, action) => {
        state.loading = false;
        state.ruanganData.push(action.payload);
        state.selectedRuangan = {};
      })
      .addCase(addRuanganData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRuanganData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRuanganData.fulfilled, (state, action) => {
        state.loading = false;
        state.ruanganData = action.payload;
      })
      .addCase(fetchRuanganData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRuanganData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRuanganData.fulfilled, (state, action) => {
        state.loading = false;
        state.ruanganData = state.ruanganData.map((ruangan) =>
          ruangan.id === action.payload.id
            ? { ...ruangan, ...action.payload }
            : ruangan
        );
        state.selectedRuangan = { ...state.selectedRuangan, ...action.payload };
      })      
      .addCase(updateRuanganData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRuanganData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRuanganData.fulfilled, (state, action) => {
        state.loading = false;
        state.ruanganData = state.ruanganData.filter((ruangan) => ruangan.id !== action.payload);
      })
      .addCase(deleteRuanganData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedRuangan, resetSelectedRuangan } = ruanganSlice.actions;

export default ruanganSlice.reducer;
