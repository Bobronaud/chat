const apiRoutes = {
  login: () => '/api/v1/login',
  getData: () => '/api/v1/data',
  signup: () => '/api/v1/signup',
};

const pageRoutes = {
  login: () => '/login',
  signup: () => '/signup',
  chat: () => '/',
};

export { apiRoutes, pageRoutes };
