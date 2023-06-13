import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import getDataUserSlice from '../features/getDataPostSlice';
import getDataProfileSlice from '../features/getDataProfileSlice';
import getDataComments from '../features/getDataComments';
import likedSlice from '../features/likedSlice';

export const store = configureStore({
  reducer: {
    authentication: authSlice,
    postUsers: getDataUserSlice,
    profileUsers: getDataProfileSlice,
    commentUsers: getDataComments,
    likePostUsers: likedSlice
  },
});
