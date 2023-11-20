import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.js';
import resources from './locales/index.js';
import channelsReducer, {
  addChannels,
  renameChannel,
  removeChannel,
  setActive,
} from './slices/channelsSlice.js';
import uiReducer from './slices/uiSlice.js';
import messagesReducer, { addMessages } from './slices/messagesSlice.js';
import { ApiContext } from './contexts.js';

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

  const socket = io();

  const api = {
    connect: () => {
      socket.on('newMessage', (data) => store.dispatch(addMessages(data)));
      socket.on('newChannel', (data) => store.dispatch(addChannels(data)));
      socket.on('renameChannel', (data) => store.dispatch(renameChannel(data)));
      socket.on('removeChannel', (data) => store.dispatch(removeChannel(data)));
    },
    newMessage: (data, errorCallback) => {
      socket.emit('newMessage', data, (res) => {
        errorCallback(res.status !== 'ok');
      });
    },
    newChannel:(data) => {
      socket.emit('newChannel', data, (res) => {
        store.dispatch(setActive(res.data.id));
      });
    },
    removeChannel:(id) => {
      socket.emit('removeChannel', id);
    },
    renameChannel:(data) => {
      socket.emit('renameChannel', data);
    },
  };
  
  api.connect();

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <ApiContext.Provider value={api}>
              <App />
            </ApiContext.Provider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
