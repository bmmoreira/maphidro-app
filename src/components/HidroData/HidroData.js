import React from 'react';
import './hidrodata.css';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap';
import { useState, useContext } from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import HeatCalendar from '../HeatCalendar/HeatCalendar';
import StationInfo from './StationInfo';
import { useTranslation } from 'react-i18next';
import { Parser } from 'json2csv';
import { CVS_FIELDS } from '../../utils/constants';
import StateContext from '../../StateContext';

/* interface HidroProps {
  sInfo: Station;
  chartData:
  localValues:
  satValues: 
  dataLoad: boolean;
} */

const HidroData = function ({ chartData, localValues, satValues }) {
  const appState = useContext(StateContext);
  const [key, setKey] = useState('home');
  const { t } = useTranslation();

  const exportJsonData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(appState.satData)
    )}`;
    // eslint-disable-next-line no-undef
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = appState.localData._id + '_IMERGE.json';
    link.click();
  };
  const exportCsvData = () => {
    try {
      const parser = new Parser({ CVS_FIELDS });
      const csv = parser.parse(appState.satData._precipitation);
      // eslint-disable-next-line no-undef
      const link = document.createElement('a');
      const csvString = `data:text/json;chatset=utf-8,${encodeURIComponent(csv)}`;
      link.href = csvString;
      link.download = appState.localData._id + '_IMERGE.csv';
      link.click();
    } catch (err) {
      // eslint-disable-next-line no-undef
      console.error(err);
    }
  };

  return (
    <Tabs id="chart-main-tab" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
      <Tab eventKey="home" title={t('monthly')}>
        {appState.dataLocLoaded ? (
          ''
        ) : (
          <div className="container" style={{ maxWidth: '460px', marginTop: '-12px' }}>
            <div className="row">
              <div
                className="col-sm-14"
                style={{
                  backgroundColor: 'orange',
                  color: 'white',
                  fontSize: '0.8rem'
                }}>
                {t('prec_satOnly')}
              </div>
            </div>
          </div>
        )}
        <h5>{t('precipitation')}</h5>

        <Container fluid="md">
          <Row>
            <Col style={{ backgroundColor: '#8884d8', color: 'white' }}>
              {appState.dataLocLoaded ? t('prec_details') : t('prec_overall')}
            </Col>
            <Col style={{ backgroundColor: '#82ca9d', color: 'white' }}> {t('prec_details2')}</Col>
          </Row>
        </Container>

        <ResponsiveContainer
          width="100%"
          height={250}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          /*
        // @ts-ignore */
          margin={{ left: 0 }}>
          <BarChart data={chartData} margin={{ left: -60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />

            <YAxis
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              /*
            // @ts-ignore */
              margin={{ left: 0 }}
              tick={false}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={
                appState.dataLocLoaded
                  ? 'loc_' + localValues.year
                  : 'sat_' + satValues.init + '-' + satValues.end
              }
              fill="#8884d8"
              name={
                appState.dataLocLoaded ? localValues.year : satValues.init + '-' + satValues.end
              }
            />
            <Bar dataKey={'sat_' + satValues.year} fill="#82ca9d" name={satValues.year} />
          </BarChart>
        </ResponsiveContainer>

        <Container fluid>
          <Row className="justify-content-md-center">
            <Col>
              {appState.dataLocLoaded ? (
                <a
                  href={`http://www.snirh.gov.br/hidroweb/rest/api/documento/convencionais?tipo=3&documentos=0${appState.stationData._id}`}
                  download>
                  <Image fluid src="./images/buttons/download_ana_csv.png" alt="downloadANA" />
                </a>
              ) : (
                ''
              )}
            </Col>
            <Col>
              {' '}
              <button className="d-button" type="button" onClick={exportJsonData}>
                <Image fluid src="./images/buttons/download_gpm_json.png" alt="downloadJSON" />
              </button>
            </Col>

            <Col>
              {' '}
              <button className="d-button" type="button" onClick={exportCsvData}>
                <Image fluid src="./images/buttons/download_gpm_csv.png" alt="downloadCSV" />
              </button>
            </Col>
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="profile" title={t('daily')}>
        <HeatCalendar
          //dailyPrec={dailyPrec}
          localValues={localValues}
          satValues={satValues}
          locload={appState.dataLocLoaded}
        />
      </Tab>
      <Tab eventKey="insitu" title={t('details')}>
        <StationInfo sInfo={appState.stationData} dataLoad={appState.dataLocLoaded} />
      </Tab>
    </Tabs>
  );
};

export default HidroData;
