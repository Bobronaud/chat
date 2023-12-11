import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import NavbarHeader from './NavbarHeader.js';
import { pageRoutes } from '../routes.js';

const Layout = ({ children, withFooter }) => {
  const { t } = useTranslation();

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <NavbarHeader />
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-6 col-xs-12">
                <div className="card shadow-sm">
                  <div className="card-body row p-5 justify-content-center align-content-center">
                    {children}
                  </div>
                  {withFooter && (
                    <div className="card-footer p-4">
                      <div className="text-center">
                        {t('login.footer.text')}
                        <Link to={pageRoutes.signup()}>{t('login.footer.link')}</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
