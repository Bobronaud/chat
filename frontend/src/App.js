import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './loginPage.js';
import Page404 from './page404.js';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
