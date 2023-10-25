import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, loadUserData } from '../thunks/authAPI';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: '',
    userData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        console.log(action.payload);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.uid = null;
        state.userData = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userData = action.payload;
      });
  },
});


export default authSlice.reducer;
