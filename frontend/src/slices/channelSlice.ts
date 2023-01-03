/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index.js";
// Чтобы не хардкодить урлы, делаем модуль, в котором они создаются
import routes from "../routes.js";

import { Message, EntitiesMessages } from "./messageSlice.js";

interface Channel {
  id: number
  name: string
  removable: boolean
  username?: string
}

type Entities = {
  [index: number]: Channel
}


const channelAdapter = createEntityAdapter<Channel>();

const channelSlice = createSlice({
  name: "channel",
  initialState: channelAdapter.getInitialState(),
  reducers: {
    addChannels: (state, actions: PayloadAction<{ ids: number[], entities: Entities }>) => {
      const { entities, ids } = actions.payload;
      state.entities = entities;
      state.ids = ids;
    },
    addNewChannel: channelAdapter.addOne,
    renameChannel: channelAdapter.updateOne,
    removeChannel: (state, actions: PayloadAction<{ id: number, entities: Message[] }>) =>
      channelAdapter.removeOne(state, actions.payload.id),
  },
});
export const selectors = channelAdapter.getSelectors((state: RootState) => state.channels);
export const { actions } = channelSlice;
export default channelSlice.reducer;
