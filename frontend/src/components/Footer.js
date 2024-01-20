import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { pageRoutes } from '../routes.js';

const Footer = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const path = pathname.slice(1);
  const linkTo = path === 'login' ? 'signup' : 'login';

  return (
    <Card.Footer className="p-4 text-center">
      {t(`${path}.footer.text`)}
      <Link to={pageRoutes[linkTo]()}>{t(`${path}.footer.link`)}</Link>
    </Card.Footer>
  );
};

export default Footer;
