import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import NavbarHeader from './NavbarHeader.js';
import Footer from './Footer.js';

const Layout = ({ children, withFooter }) => (
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
            {withFooter && <Footer />}
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Layout;
