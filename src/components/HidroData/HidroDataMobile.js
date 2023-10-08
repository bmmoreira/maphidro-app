import React from 'react';
import './hidrodata.css';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import Container from 'react-bootstrap/Container';
import Grid from '@mui/material/Grid';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap';
import { useState, useContext } from 'react';
import Select from 'react-select';

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
import HeatCalendarMobile from '../HeatCalendar/HeatCalendarMobile';
import StationInfo from './StationInfo';
import { useTranslation } from 'react-i18next';
import { Parser } from 'json2csv';
import { CVS_FIELDS } from '../../utils/constants';
import StateContext from '../../StateContext';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import RadarIcon from '@mui/icons-material/Radar';
import CellTowerIcon from '@mui/icons-material/CellTower';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import { lightBlue } from '../Utils/sytles';

/* interface HidroProps {
  sInfo: Station;
  chartData:
  localValues:
  satValues: 
  dataLoad: boolean;
} */

const HidroData = function (props) {
  const [value, setValue] = React.useState(0);
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
      <Box sx={{ flexGrow: 1, paddingLeft: '60px', height: '20px' }}>
        <Grid
          container
          spacing={0}
          sx={{
            height: '20px',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {payload.map((entry, index) => (
            <Grid
              item
              key={`item-${index}`}
              xs={6}
              sx={{ backgroundColor: entry.color, display: 'flex', justifyContent: 'center' }}>
              {entry.value} {entry.dataKey.includes('sat') ? 'Sat. (mm)' : 'In Situ (mm)'}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const theme = useTheme();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}>
        {value === index && children}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  return (
    <Box sx={{ width: '100%', padding: '10px' }}>
      <Box
        sx={{
          flexGrow: 1,

          bgcolor: 'background.paper',
          marginTop: '-5px'
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 }
            }
          }}>
          <Tab
            icon={<CalendarMonthIcon />}
            iconPosition="start"
            label={t('monthly')}
            {...a11yProps(0)}
          />
          <Tab icon={<DateRangeIcon />} iconPosition="start" label={t('daily')} {...a11yProps(1)} />
          <Tab icon={<InfoIcon />} iconPosition="start" label={t('details')} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Box
          sx={{
            width: '100%',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
          <Typography
            sx={{
              ml: 2,
              flex: 1,
              fontSize: '1rem',
              color: lightBlue.titleColor
            }}
            variant="h6"
            component="div">
            {t('series')}
          </Typography>
        </Box>

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
        <Grid
          container
          spacing={0}
          sx={{
            padding: 0,
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            margin: '10px 0 5px 0'
          }}>
          <Grid item xs={12}>
            <Typography sx={{ color: lightBlue.titleColor, fontSize: '1rem' }}>
              {t('select_years')}
            </Typography>
          </Grid>
        </Grid>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col>
              <div className="loc">IN SITU-(ANA-CPRM): </div>

              <Select
                menuPlacement="top"
                defaultValue={{
                  label: `${appState.barChart.locBarSelectedYear}`,
                  value: `${appState.barChart.locBarSelectedYear}`
                }}
                onChange={props.handleChangeLoc}
                options={props.selectLocal}
              />
            </Col>
            <Col>
              <div className="sat">SAT-(IMERGE): </div>

              <Select
                menuPlacement="top"
                defaultValue={{
                  label: `${appState.barChart.satBarSelectedYear}`,
                  value: `${appState.barChart.satBarSelectedYear}`
                }}
                onChange={props.handleChangeSat}
                options={props.selectSat}
              />
            </Col>
          </Row>
        </Container>
        <Box
          sx={{
            width: '100%',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            margin: '20px 0 20px 0'
          }}>
          <Typography
            sx={{
              ml: 2,
              flex: 1,
              fontSize: '1rem',
              color: lightBlue.titleColor
            }}
            variant="h6"
            component="div">
            {t('click_download')}
          </Typography>
        </Box>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col>
              <a
                href={`http://www.snirh.gov.br/hidroweb/rest/api/documento/convencionais?tipo=3&documentos=0${appState.stationData.stCode}`}
                download>
                <Image fluid src="./images/buttons/download_ana_csv.png" alt="downloadANA" />
              </a>
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
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <HeatCalendarMobile
          //dailyPrec={dailyPrec}

          locload={appState.dataLocLoaded}
        />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <StationInfo />
      </TabPanel>
    </Box>
  );
};

export default HidroData;
