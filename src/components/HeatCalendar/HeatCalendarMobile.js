import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './HeatCalendar.css';
import ReactTooltip from 'react-tooltip';
import { useState, useEffect, useContext } from 'react';
import TableValues from '../TableValues/TableValues';
import TableValuesSat from '../TableValues/TableValuesSat';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import StateContext from '../../StateContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { lightBlue } from '../Utils/sytles';

const HeatCalendar = (props) => {
  const appState = useContext(StateContext);

  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [locYear, setLocYear] = useState(props.locYear);
  const [localDaily, setLocalDaily] = useState([]);
  const [satDaily, setSatDaily] = useState([]);
  const [daily, setDaily] = useState(props.dailyPrec);
  const [dailyValues, setDailyValues] = useState([
    { date: '2020-07-01', count: 2 },
    { date: '2020-08-22', count: 4 },
    { date: '2020-09-30', count: 2 },
    { date: '2020-10-30', count: 3 },
    { date: '2020-11-30', count: 4 },
    { date: '2020-12-30', count: 1 }
  ]);
  const [localValues, setYearValues] = useState(props.localValues);
  const [satValues, setSatValues] = useState(props.satValues);

  const setValues = () => {
    // eslint-disable-next-line no-prototype-builtins
    if (localValues.prec.length > 0 && localValues.prec[0].hasOwnProperty('date')) {
      return localValues.prec;
    } else {
      return [];
    }
  };

  const mystyle = {
    marginTop: '20px'
  };

  useEffect(
    () => {
      setLoaded(true);
    },
    // optional dependency array
    [
      props // 0 or more entries
    ]
  );

  return (
    <div style={{ marginTop: '0px', marginLeft: '10px' }}>
      <Box
        sx={{
          width: '100%',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          margin: '20px 0 5px 0',
          backgroundColor: '#8884d8'
        }}>
        <Typography
          sx={{
            ml: 2,
            flex: 1,
            fontSize: '1rem',
            color: 'white'
          }}
          variant="h6"
          component="div">
          IN SITU-(ANA)
        </Typography>
      </Box>
      {loaded && (
        <CalendarHeatmap
          id={654748912}
          horizontal={false}
          startDate={new Date(appState.locHeatmap.year, 0, 1)}
          endDate={new Date(appState.locHeatmap.year, 11, 31)}
          monthLabels={[
            t('Jan'),
            t('Fev'),
            t('Mar'),
            t('Apr'),
            t('May'),
            t('Jun'),
            t('Jul'),
            t('Aug'),
            t('Sep'),
            t('Oct'),
            t('Nov'),
            t('Dec')
          ]}
          values={appState.locHeatmap.prec}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value) => {
            return {
              'data-tip': `${value.date} ` + t('prec') + `: ${value.prec}`
            };
          }}
        />
      )}

      <Box
        sx={{
          width: '100%',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          margin: '20px 0 5px 0',
          backgroundColor: '#8884d8'
        }}>
        <Typography
          sx={{
            ml: 2,
            flex: 1,
            fontSize: '1rem',
            color: 'white'
          }}
          variant="h6"
          component="div">
          IMERGE-(INPE-CPTEC)
        </Typography>
      </Box>
      {loaded && (
        <CalendarHeatmap
          id={123748912}
          horizontal={false}
          gutterSize={1}
          startDate={new Date(`${appState.satHeatmap.year}-01-01`)}
          endDate={new Date(`${appState.satHeatmap.year}-12-30`)}
          monthLabels={[
            t('Jan'),
            t('Fev'),
            t('Mar'),
            t('Apr'),
            t('May'),
            t('Jun'),
            t('Jul'),
            t('Aug'),
            t('Sep'),
            t('Oct'),
            t('Nov'),
            t('Dec')
          ]}
          values={appState.satHeatmap.prec}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value) => {
            return {
              'data-tip': `${value.date} ` + t('prec') + `: ${value.prec}`
            };
          }}
        />
      )}
      {loaded && <ReactTooltip />}
    </div>
  );
};
export default HeatCalendar;
