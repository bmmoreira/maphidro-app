/** @format */

import React, { useEffect } from 'react';
import Page from './Page';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <Page title="About Maphidro">
      <h2 style={{ marginTop: '20px' }}>{t('about_maphidro')}</h2>
      <p className="lead text-muted">{t('about1')}</p>
      <p className="lead text-muted">
        {t('about2')}{' '}
        <a href="http://ftp.cptec.inpe.br/modelos/tempo/MERGE/rozante_et.al.2010.pdf">
          (Rozante et al.,2010)
        </a>
      </p>
      <p className="lead text-muted">{t('about3')}</p>
    </Page>
  );
}

export default About;
