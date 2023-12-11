import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import NavbarHeader from './NavbarHeader.js';
import { pageRoutes } from '../routes.js';

const Layout = ({ children, withFooter }) => {
  const { t } = useTranslation();

  return (
    <div className="h-100 d-flex flex-column" id="chat">
      <NavbarHeader />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col className="col-12 col-xxl-4 col-md-6 col-xs-12">
            <Card className="shadow-sm">
              <Card.Body>
                <Row className="p-5 justify-content-center align-content-center">
                  {children}
                </Row>
              </Card.Body>
              {withFooter && (
                <Card.Footer className="p-4 text-center">
                  {t('login.footer.text')}
                  <Link to={pageRoutes.signup()}>{t('login.footer.link')}</Link>
                </Card.Footer>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
