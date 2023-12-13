const ru = {
  translation: {
    navbar: {
      brand: 'Hexlet Chat',
      logout: 'Выйти',
    },
    signup: {
      registration: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      register: 'Зарегистрироваться',
      errors: {
        userAlreadyExist: 'Такой пользователь уже существует',
        notEmpty: 'Обязательное поле',
        passwordConfirmation: 'Пароли должны совпадать',
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
      },
    },
    login: {
      login: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      footer: {
        text: 'Нет аккаунта? ',
        link: 'Регистрация',
      },
      errors: {
        userIsNotExist: 'Неверные имя пользователя или пароль',
        notEmpty: 'Обязательное поле',
      },
    },
    page404: {
      header: 'Страница не найдена',
      body: 'Но вы можете перейти ',
      link: 'на главную страницу',
    },
    chat: {
      modals: {
        buttonClose: 'Отменить',
        buttonSubmit: 'Отправить',
        buttonRemove: 'Удалить',
        headerAdd: 'Добавить канал',
        headerRename: 'Переименовать канал',
        headerRemove: 'Удалить канал?',
        bodyRemove: 'Уверены?',
        inputLabel: 'Имя канала',
        errors: {
          notUnique: 'Должно быть уникальным',
          length: 'От 3 до 20 символов',
        },
      },
      channels: {
        header: 'Каналы',
        dropdown: {
          hiddenLabel: 'Управление каналом',
          remove: 'Удалить',
          rename: 'Переименовать',
        },
      },
      messagesCounter_one: '{{count}} сообщение',
      messagesCounter_few: '{{count}} сообщения',
      messagesCounter_many: '{{count}} сообщений',
      inputTextPlaceholder: 'Введите сообщение...',
      inputLabel: 'Новое сообщение',
      networkError: 'Ошибка сети. Сообщение не доставлено',
    },
    toasts: {
      channelAdd: 'Канал создан',
      channelRename: 'Канал переименован',
      channelRemove: 'Канал удалён',
      networkError: 'Ошибка соединения',
      unknownError: 'Неизвестная ошибка',
    },
  },
};

export default ru;
