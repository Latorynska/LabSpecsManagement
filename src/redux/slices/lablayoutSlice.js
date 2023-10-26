import { createSlice } from '@reduxjs/toolkit';
import { fetchLayout, addComp } from '../thunks/LabLayoutAPI';

const lablayoutSlice = createSlice({
  name: 'lablayout',
  initialState: {
    comps: [],
    server: {},
    selectedComp: null,
        // nomor: 99,
        // posisi: 99,
        // kodeInventaris: '',
        // prosesor: '',
        // vga: '',
        // ram: {
        //     ukuran: 0,
        //     tipe: '',
        //     konfigurasi: '',
        // },
        // storage: [],
        // motherboard: '',
        // case: '',
        // monitor: '',
        // psu: '',
        // keyboard: '',
        // mouse: '',
        // sound: '',
        // additional: '',
        // status: '',
    // },
    error: '',
    loading: false,
  },
  reducers: {
    setSelectedComp: (state, action) => {
      state.selectedComp = action.payload;
    },
    resetSelectedComp: (state) => {
      state.selectedComp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLayout.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchLayout.fulfilled, (state, action) => {
        state.loading = false;
        state.comps = action.payload;
        state.error = '';
      })
      .addCase(fetchLayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComp.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addComp.fulfilled, (state, action) => {
        state.loading = false;
        state.comps.push(action.payload);
        state.error = '';
      })
      .addCase(addComp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedComp, resetSelectedComp } = lablayoutSlice.actions;

export default lablayoutSlice.reducer;
