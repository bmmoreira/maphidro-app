/** @format */

import React from 'react';
import Page from './Page';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MapGuest() {
  const { t } = useTranslation();

  return (
    <Page title="MapHidro">
      <div className="text-center">
        <h2 style={{ marginTop: '20px' }}>{t('please_register')}</h2>
        <p className="lead text-muted">
          {t('visit_homepage')} <Link to="/">{t('homepage')}</Link>
        </p>
      </div>
    </Page>
  );
}

export default MapGuest;
