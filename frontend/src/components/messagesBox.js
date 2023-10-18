import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessages } from '../slices/messagesSlice.js';

const MessagesBox = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  useEffect(() => {
    const { token } = window.localStorage;
    axios
      .get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { messages } = response.data;
        dispatch(addMessages(messages));
      });
  }, [dispatch]);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map((m, i) => (
        <div key={i} className="text-break mb-2">
          <b>Author</b>: {m}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
