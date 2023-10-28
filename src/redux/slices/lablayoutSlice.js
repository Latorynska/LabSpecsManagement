import { createSlice } from '@reduxjs/toolkit';
import { fetchLayout, addComp, updateComp, deleteComp } from '../thunks/LabLayoutAPI';

const lablayoutSlice = createSlice({
  name: 'lablayout',
  initialState: {
    comps: [],
    server: {},
    selectedComp: null,
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
      })
      .addCase(updateComp.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateComp.fulfilled, (state, action) => {
        const updatedCompIndex = state.comps.findIndex((comp) => comp.id === action.payload.snapshotId);
        if (updatedCompIndex !== -1) {
          state.comps[updatedCompIndex] = action.payload;
        }
        state.loading = false;
        state.error = '';
      })
      .addCase(updateComp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComp.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteComp.fulfilled, (state, action) => {
        const idComp = action.payload;
        state.comps = state.comps.filter((comp) => comp.id !== idComp);
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteComp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedComp, resetSelectedComp } = lablayoutSlice.actions;

export default lablayoutSlice.reducer;
