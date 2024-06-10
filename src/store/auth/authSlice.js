import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'checking', //  checking, not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated'; //  checking, not-authenticated, authenticated
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoUrl = payload.photoUrl;
      state.errorMessage = payload.errorMessage;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated'; //  checking, not-authenticated, authenticated
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoUrl = null;
      state.errorMessage = payload?.errorMessage ?? null;
    },
    checkingCredentials: state => {
      state.status = 'checking';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoUrl = null;
      state.errorMessage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
