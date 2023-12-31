import { createSlice } from '@reduxjs/toolkit';
import { fetchLayout, addComp, updateComp, deleteComp, fetchServerData, switchPosition } from '../thunks/lablayoutAPI';

const lablayoutSlice = createSlice({
  name: 'lablayout',
  initialState: {
    comps: [],
    server: null,
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
    resetCompsAndServer: (state) => {
      state.comps = [];
      state.server = null;
    }
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
        console.log(action.payload);
        state.error = action.payload;
      })
      .addCase(updateComp.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateComp.fulfilled, (state, action) => {
        const updatedCompIndex = state.comps.findIndex((comp) => comp.kodeInventaris === action.payload.snapshotId);
        if (updatedCompIndex !== -1) {
          const updatedComps = [...state.comps];
          updatedComps[updatedCompIndex] = action.payload;
          return {
            ...state,
            comps: updatedComps,
            loading: false,
            error: '',
          };
        }
        return state;
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
      })
      .addCase(fetchServerData.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchServerData.fulfilled, (state, action) => {
        state.server = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchServerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(switchPosition.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(switchPosition.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(switchPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedComp, resetSelectedComp, resetCompsAndServer } = lablayoutSlice.actions;

export default lablayoutSlice.reducer;
