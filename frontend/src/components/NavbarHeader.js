import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearChannels } from '../slices/channelsSlice.js';
import { clearMessages } from '../slices/messagesSlice.js';
import { useAuth } from '../contexts.js';
import { pageRoutes } from '../routes.js';

const NavbarHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authorization = useAuth();
  const logout = () => {
    authorization.logout();
    dispatch(clearChannels());
    dispatch(clearMessages());
  };
  return (
    <Navbar className="shadow-sm  bg-white">
      <Container>
        <Navbar.Brand href={pageRoutes.chat()}>{t('navbar.brand')}</Navbar.Brand>
        {authorization.user ? (
          <Button variant="primary" onClick={logout}>
            {t('navbar.logout')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
