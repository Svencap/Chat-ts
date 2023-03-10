/* eslint-disable react/prop-types */
import React from 'react';
import HeaderChannelList from './HeaderChannelList';
import Channels from './Channels';

const ChannelList = () => (
  <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
    <HeaderChannelList />
    <Channels />
  </div>
);
export default ChannelList;
