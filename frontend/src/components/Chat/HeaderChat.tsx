/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/channelSlice';
import { selectors as messageSelectors } from '../../slices/messageSlice.js';

const HeaderChatList = () => {
  const channels = useSelector(selectors.selectAll);
  // Пофиксить Redux TS
  const activeChannelId = useSelector(({ viewSlice }: any) => viewSlice.activeChannelId);
  const { t } = useTranslation();
  const messages = useSelector(messageSelectors.selectAll).filter(({ channelId }) => channelId === activeChannelId);
  const channelFind = channels.find(({ id }) => id === activeChannelId);
  const channelName = channelFind ? channelFind.name : null;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {'# '}
          {channelName}
        </b>
      </p>
      <span className="text-muted">{t('chatPage.messages.count', { count: messages.length })}</span>
    </div>
  );
};
export default HeaderChatList;
