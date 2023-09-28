/** @format */

import React, { useEffect } from 'react';
import Page from './Page';
import { useTranslation } from 'react-i18next';

function HelpPage() {
  const { t } = useTranslation();

  return (
    <Page title="Help">
      <h2 style={{ marginTop: '20px' }}>Using MapHidro</h2>
      <p className="lead text-muted">
        This application uses open source libraries to collect and display calibrated satellite data
        and compare them with in situ rainfall stations operated by CRPM(Geological Survey of
        Brazil) from the National Hydrometeorological Network (RHN) coordinated by ANA (National
        Water and Sanitation Agency) in Brazil. Shows 20-year satellite precipitation measurements
        of more than 1500 pluviometric points of interest in Brazil.
      </p>
      <p className="lead text-muted">
        The Satellite precipitation data is provided by the Center for Weather Forecasting and
        Climate Studies (CPTEC), a division of the National Institute for Space Research (INPE). The
        MERGE product has been generated using the Global Precipitation Measurement (GPM) Integrated
        Multi-satellite Retrievals for GPM (IMERG) data. More details on the technique can be found
        at
        <a href="http://ftp.cptec.inpe.br/modelos/tempo/MERGE/rozante_et.al.2010.pdf">
          (Rozante et al.,2010)
        </a>
      </p>
      <p className="lead text-muted">
        NASA's Global Precipitation Measurement Mission (GPM) uses several satellites to measure
        Earth's rain and snowfall for the benefit of humanity. GPM is an international mission
        launched by NASA and JAXA(Japan) that sets the standard for measurements of precipitation in
        space.
      </p>
    </Page>
  );
}

export default HelpPage;
