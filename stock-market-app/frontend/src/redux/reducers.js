import { createReducer } from '@reduxjs/toolkit';
import {
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFailure,
} from './actions';

// Initial State
const initialState = {
  profile: null,
  loading: false,
  error: null,
};

// User Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch User Profile
    .addCase(fetchUserProfileRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserProfileSuccess, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    })
    .addCase(fetchUserProfileFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update User Profile
    .addCase(updateUserProfileRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUserProfileSuccess, (state, action) => {
      state.loading = false;
      state.profile = { ...state.profile, ...action.payload };
    })
    .addCase(updateUserProfileFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default userReducer;
