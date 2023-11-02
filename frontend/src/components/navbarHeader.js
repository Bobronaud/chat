import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearChannels } from '../slices/channelsSlice.js';
import { clearMessages } from '../slices/messagesSlice.js';

const NavbarHeader = ({ auth }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    window.localStorage.removeItem('token');
    dispatch(clearChannels());
    dispatch(clearMessages());
    navigate('/login');
  };
  return (
    <Navbar className="shadow-sm  bg-white">
      <Container>
        <Navbar.Brand href="/">{t('navbar.brand')}</Navbar.Brand>
        {auth ? (
          <Button variant="primary" onClick={logout}>
            {t('navbar.logout')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
