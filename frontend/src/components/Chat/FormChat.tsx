/* eslint-disable no-unneeded-ternary */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import { IconButton } from '@mui/material';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';

import dataEmoji from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import useChat from '../../hooks/useChat';

const filter = require('leo-profanity');

const InputChat = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { newMessage } = useChat();

  const [openEmoji, setOpenEmoji] = useState(false);

  const channelId = useSelector((state: any) => state.viewSlice.activeChannelId);
  const { username } = JSON.parse(localStorage.getItem('user') || 'null');

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      const message = {
        body: filter.clean(values.message.trim()),
        channelId,
        username,
      };
      newMessage(message);
      if (ref.current) {
        ref.current.value = '';
      }
      resetForm({ values: { message: '' } });
    },
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const emojiPickerOpen = () => setOpenEmoji(true);

  const emojiPickerClose = () => setOpenEmoji(false);

  return (
    <div className="mt-auto px-5 py-3 position-relative">
      <div className="d-flex flex-row flex_form_chat">
        <Form
          noValidate
          onSubmit={formik.handleSubmit}
          className="py-1 flex-grow-1 border rounded-2"
        >
          <div className="input-group has-validation">
            <input
              name="message"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              className="border-0 p-0 ps-2 form-control"
              onChange={formik.handleChange}
              value={formik.values.message}
              ref={ref}
            />
            <button
              type="submit"
              disabled={
                formik.values.message.trim().length === 0 ? true : false
              }
              className="btn btn-group-vertical"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
                className="hover__input__svg"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </Form>
        <ClickAwayListener onClickAway={emojiPickerClose}>
          <Box>
            <IconButton onClick={emojiPickerOpen}>
              <SentimentSatisfiedAltOutlinedIcon />
            </IconButton>
            {openEmoji ? (
              <Picker
                previewPosition="none"
                data={dataEmoji}
                onEmojiSelect={(emoji: any) => {
                  if (ref.current) {
                    ref.current.value += emoji.native;
                  }
                  formik.values.message += emoji.native;
                }}
                locale="ru"
              />
            ) : null}
          </Box>
        </ClickAwayListener>
      </div>
    </div>
  );
};
export default InputChat;
