import React, { useContext } from 'react';
import Page from './Page';
import StateContext from '../../StateContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Grid from '@mui/material/Grid';

import { useTranslation } from 'react-i18next';
function Home() {
  const appState = useContext(StateContext);
  const { t } = useTranslation();

  return (
    <Page title="Your Map Statistics">
      <h2 className="text-center" style={{ marginTop: '20px' }}>
        <strong>{appState.user.username}</strong>, this is your landing page.
      </h2>
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
      <Container className="d-flex justify-content-center">
        <Row className="d-flex justify-content-center">
          <Col className="col-sm-4 text-left d-flex align-items-center">
            Dissertation project for MSc in Informatics Engineering and Web Technology UAB/UTAD
          </Col>
          <Col className="col-sm-3 text-left">
            <Image src="./images/modals/logo_uab.png" alt="Uab_Logo" rounded />
          </Col>
        </Row>
      </Container>
    </Page>
  );
}

export default Home;
