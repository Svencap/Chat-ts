/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

interface MessageProps {
  message: { body: string; channelId: number; username: string; id: number };
}

const Message = ({ message }: MessageProps) => {
  const { body, id, username } = message;
  return (
    <div className="text-break mb-2">
      <b>{username}</b>: {body}
    </div>
  );
};
export default Message;
