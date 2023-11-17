import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App';
import resources from './locales/index.js';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import uiReducer from './slices/uiSlice.js';
import { addMessages } from './slices/messagesSlice.js';
import {
  addChannels,
  renameChannel,
  removeChannel,
} from './slices/channelsSlice.js';

const SocketContext = React.createContext();

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    lng: 'ru',
    debug: true,
  });

  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      ui: uiReducer,
    },
  });

  // "undefined" means the URL will be computed from the `window.location` object
  const URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : undefined;
  const socket = io(URL);
  socket.on('newMessage', (data) => store.dispatch(addMessages(data)));
  socket.on('newChannel', (data) => store.dispatch(addChannels(data)));
  socket.on('renameChannel', (data) => store.dispatch(renameChannel(data)));
  socket.on('removeChannel', (data) => store.dispatch(removeChannel(data)));

  const rollbarConfig = {
    accessToken: '7ca5f4a300f6478ca01aa0a079fcea74',
    environment: 'production',
  };
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <SocketContext.Provider value={socket}>
              <App />
            </SocketContext.Provider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
export { SocketContext };
