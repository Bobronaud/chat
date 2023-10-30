import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarHeader = ({ auth }) => {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <Navbar className="shadow-sm  bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth ? (
          <Button variant="primary" onClick={logout}>
            Выйти
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
