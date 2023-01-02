import { useContext } from 'react';
import { SocketContext } from '../contexts/socket';

const useChat = () => useContext(SocketContext);

export default useChat;
