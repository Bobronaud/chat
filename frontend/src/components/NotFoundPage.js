import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { pageRoutes } from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Alert className="text-center" variant="light">
      <Alert.Heading>{t('page404.header')}</Alert.Heading>
      <p>
        {t('page404.body')}
        <Link to={pageRoutes.chat()}>{t('page404.link')}</Link>
      </p>
    </Alert>
  );
};

export default NotFoundPage;
