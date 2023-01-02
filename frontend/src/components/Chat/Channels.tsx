/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import Channel from './Channel';
import { selectors as channelSelectors } from '../../slices/channelSlice';

const Channels = () => {
  const channels = useAppSelector(channelSelectors.selectAll);
  const { username } = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map((channel) => <Channel key={channel.id} channel={channel} user={username} />)}
    </ul>
  );
};
export default Channels;
