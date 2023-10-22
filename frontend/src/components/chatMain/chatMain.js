import Header from './header.js';
import Body from './body.js';
import Form from './form.js';

const ChatMain = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Header />
        <Body />
        <Form />
      </div>
    </div>
  );
};

export default ChatMain;
