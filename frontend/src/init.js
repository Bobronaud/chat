import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.js';
import resources from './locales/index.js';
import channelsReducer, {
  addChannels,
  renameChannel,
  removeChannel,
} from './slices/channelsSlice.js';
import uiReducer from './slices/uiSlice.js';
import messagesReducer, { addMessages } from './slices/messagesSlice.js';
import { ApiContext } from './contexts.js';
import AuthProvider from './components/AuthProvider.js';

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
    newMessage: (data) => socket.timeout(5000).emitWithAck('newMessage', data),
    newChannel: (data) => socket.timeout(5000).emitWithAck('newChannel', data),
    removeChannel: (id) => socket.timeout(5000).emitWithAck('removeChannel', id),
    renameChannel: (data) => socket.timeout(5000).emitWithAck('renameChannel', data),
  };

  socket.on('newMessage', (data) => store.dispatch(addMessages(data)));
  socket.on('newChannel', (data) => store.dispatch(addChannels(data)));
  socket.on('renameChannel', (data) => store.dispatch(renameChannel(data)));
  socket.on('removeChannel', (data) => store.dispatch(removeChannel(data)));

  const concatDictionaries = (coll) => coll.flatMap((lang) => {
      filter.loadDictionary(lang);
      return filter.words;
    });

  filter.addDictionary('en/ru', concatDictionaries(['en', 'ru']));

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
              <AuthProvider>
                <App />
              </AuthProvider>
            </ApiContext.Provider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
