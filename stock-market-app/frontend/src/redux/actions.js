import { createAction } from '@reduxjs/toolkit';
import * as api from '../services/api'; // Import your API service functions

// Action Types
export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';

// Action Creators
export const fetchUserProfileRequest = createAction(FETCH_USER_PROFILE_REQUEST);
export const fetchUserProfileSuccess = createAction(FETCH_USER_PROFILE_SUCCESS, (profile) => ({ payload: profile }));
export const fetchUserProfileFailure = createAction(FETCH_USER_PROFILE_FAILURE, (error) => ({ payload: error }));

export const updateUserProfileRequest = createAction(UPDATE_USER_PROFILE_REQUEST);
export const updateUserProfileSuccess = createAction(UPDATE_USER_PROFILE_SUCCESS, (profile) => ({ payload: profile }));
export const updateUserProfileFailure = createAction(UPDATE_USER_PROFILE_FAILURE, (error) => ({ payload: error }));

// Thunk Actions
export const fetchUserProfile = (userId) => async (dispatch) => {
  dispatch(fetchUserProfileRequest());
  try {
    const response = await api.getUserProfile(userId);
    dispatch(fetchUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserProfileFailure(error.message));
  }
};

export const updateUserProfile = (userId, profileData) => async (dispatch) => {
  dispatch(updateUserProfileRequest());
  try {
    const response = await api.updateUserProfile(userId, profileData);
    dispatch(updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(updateUserProfileFailure(error.message));
  }
};
