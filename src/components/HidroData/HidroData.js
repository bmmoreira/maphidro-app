import React from 'react';
import './hidrodata.css';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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

const HidroData = function () {
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

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <Box sx={{ flexGrow: 1, paddingLeft: '60px' }}>
        <Grid container spacing={1}>
          {payload.map((entry, index) => (
            <Grid item key={`item-${index}`} xs={6} sx={{ backgroundColor: entry.color }}>
              {entry.value} {entry.dataKey.includes('sat') ? 'Sat. (mm)' : 'In Situ (mm)'}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Tabs id="chart-main-tab" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
      <Tab eventKey="home" title={t('monthly')}>
        <ResponsiveContainer width="100%" height={250} margin={{ left: 0 }}>
          <BarChart data={appState.barChart.chartData} margin={{ left: -60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />

            <YAxis margin={{ left: 0 }} tick={false} />
            <Tooltip />
            <Legend content={renderLegend} margin={{ left: 60 }} />
            <Bar
              dataKey={'loc_' + String(appState.barChart.locBarSelectedYear)}
              fill="#8884d8"
              name={String(appState.barChart.locBarSelectedYear)}
            />
            <Bar
              dataKey={'sat_' + String(appState.barChart.satBarSelectedYear)}
              fill="#82ca9d"
              name={String(appState.barChart.satBarSelectedYear)}
            />
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

          locload={appState.dataLocLoaded}
        />
      </Tab>
      <Tab eventKey="insitu" title={t('details')}>
        <StationInfo />
      </Tab>
    </Tabs>
  );
};

export default HidroData;
