import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlices.js';
import channelSlice from './channelSlice';
import viewSlice from './viewSlice.js';
import messageSlice from './messageSlice.js';

export const store = configureStore({
  reducer: {
    // data: dataReducer,
    channels: channelSlice,
    viewSlice,
    messages: messageSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;