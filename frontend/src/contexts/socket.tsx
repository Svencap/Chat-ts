/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Socket } from 'socket.io-client';

import { actions as messageAction } from '../slices/messageSlice';
import { actions as channelAction } from '../slices/channelSlice';
import { actions as viewAction } from '../slices/viewSlice';

interface SocketProviderProps {
  socket: Socket,
  children: React.ReactNode
}

interface SocketContext {
  newMessage: any,
  newChannel: any,
  removeChannel: any,
  renameChannel: any
}

export const SocketContext = createContext({} as SocketContext);

const SocketProvider = ({ socket, children }: SocketProviderProps) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const messages = useAppSelector(state => state.messages);

  socket.on('newMessage', (payload: { body: string, channelId: number, id: number, username: string }) => {
    dispatch(messageAction.addNewMessage(payload));
  });

  socket.on('newChannel', (payload: { id: number, name: string, removable: boolean }) => {
    dispatch(channelAction.addNewChannel(payload));
    dispatch(viewAction.switchActiveChannel(payload.id));
  });

  socket.on('renameChannel', (payload: { id: number, name: string, removable: boolean }) => {
    const { id } = payload;
    dispatch(channelAction.renameChannel({ id, changes: { ...payload } }));
  });

  socket.on('removeChannel', (payload: { id: number }) => {
    const { id } = payload;
    const restEntities = Object.values<any>(messages.entities).filter((e) => e.channelId !== id);
    dispatch(channelAction.removeChannel({ id, entities: restEntities }));
  });

  const newChannel = (channel: { name: string }) => socket.emit('newChannel', channel, (response: any) => {
    if (response.status !== 'ok') {
      // toast.error(t('tostify.errors.connection'));
    }
  });
  const newMessage = (message: { body: string, channelId: number, username: string }) => socket.emit('newMessage', message, (response: any) => {
    if (response.status !== 'ok') {
      // toast.error(t('tostify.errors.connection'));
    }
  });
  const removeChannel = (id: { id: number }) => socket.emit('removeChannel', { id }, (response: any) => {
    if (response.status !== 'ok') {
      // toast.error(t('tostify.errors.connection'));
    }
  });
  const renameChannel = (channel: { id: number, name: string }) => socket.emit('renameChannel', channel, (response: any) => {
    if (response.status !== 'ok') {
      // toast.error(t('tostify.errors.connection'));
    }
  });

  const socketHandles = {
    newMessage,
    newChannel,
    removeChannel,
    renameChannel,
  };

  return (
    <SocketContext.Provider value={socketHandles}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
