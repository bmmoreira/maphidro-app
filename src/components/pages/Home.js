import React, { useContext } from 'react';
import Page from './Page';
import StateContext from '../../StateContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
function Home() {
  const appState = useContext(StateContext);
  const { t } = useTranslation();

  return (
    <Page title="Your Map Statistics">
      <h2 className="text-center" style={{ marginTop: '20px' }}>
        <strong>{t('indevelopment')}</strong>
      </h2>
      <h5 className="text-center">
        <Link
          className="mx-1"
          to="/map"
          style={{ textDecoration: 'underline dotted', fontWeight: '600', color: '#595f88' }}>
          {t('mapaccess')}
        </Link>
      </h5>
      <p className="lead text-muted text-center">{t('app_libraries')}</p>
      <Grid
        container
        spacing={0}
        sx={{
          padding: 0,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Image src="./images/libraries/react_small.png" alt="React" />
        <Image src="./images/libraries/maplibre_small.png" alt="Maplibre" />
        <Image src="./images/libraries/recharts_small.png" alt="Strapi" />
        <Image src="./images/libraries/axios2_small.png" alt="Axios" />
        <Image src="./images/libraries/strapi_small.png" alt="Strapi" />
        <Image src="./images/libraries/gmt_small.png" alt="GMT" />
        <Image src="./images/libraries/gdal_small.png" alt="GDAL" />
        <Image src="./images/libraries/node_small.png" alt="Nodejs" />
      </Grid>
      <Container className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
        <p>
          <span className="font-init">{t('intro_text')}</span>
        </p>
      </Container>
      <Grid
        container
        spacing={0}
        sx={{
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
        <Grid
          xs={6}
          spacing={0}
          sx={{
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
          {' '}
          {t('uab_text')}
        </Grid>
        <Grid
          xs={6}
          spacing={0}
          sx={{
            padding: 0,
            display: 'flex',
            justifyContent: 'center'
          }}>
          {' '}
          <Image src="./images/modals/logo_uab.png" alt="Uab_Logo" rounded />
        </Grid>
      </Grid>
    </Page>
  );
}

export default Home;
