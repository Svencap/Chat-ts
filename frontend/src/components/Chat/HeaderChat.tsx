/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/channelSlice';
import { selectors as messageSelectors } from '../../slices/messageSlice';

const HeaderChatList = () => {
  const channels = useAppSelector(selectors.selectAll);
  // Пофиксить Redux TS
  const activeChannelId = useSelector(({ viewSlice }: any) => viewSlice.activeChannelId);
  const { t } = useTranslation();
  // fix Message slice
  const messages = useAppSelector(messageSelectors.selectAll).filter(({ channelId }: any) => channelId === activeChannelId);
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
