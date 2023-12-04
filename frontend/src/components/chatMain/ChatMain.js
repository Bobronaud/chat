import Header from './Header.js';
import Body from './Body.js';
import Form from './Form.js';

const ChatMain = () => (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      <Header />
      <Body />
      <Form />
    </div>
  </div>
);

export default ChatMain;
