/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { actions as channelActions } from './channelSlice';

export interface Message {
  body: string;
  channelId: number;
  id: number;
  username: string;
}

export type EntitiesMessages = {
  [index: number]: Message
}

const messageAdapter = createEntityAdapter<Message>({
  selectId: (message) => message.id
});

const initialState = messageAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessages: (state, actions: PayloadAction<{ ids: number[], entities: EntitiesMessages }>) => {
      const { entities, ids } = actions.payload;
      state.entities = entities;
      state.ids = ids;
    },
    addNewMessage: messageAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.removeChannel, (state, actions) => {
        messageAdapter.setAll(state, actions.payload.entities);
      });
  },
});
export const selectors = messageAdapter.getSelectors<RootState>((state) => state.messages);
export const { actions } = messageSlice;
export default messageSlice.reducer;
