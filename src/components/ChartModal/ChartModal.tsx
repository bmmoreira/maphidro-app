import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HidroData from '../HidroData/HidroData';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LocalData from '../DataModels/LocalData.js';
import SatData from '../DataModels/LocalData.js';
import Station from '../DataModels/Station4';
import Spinner from 'react-bootstrap/Spinner';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import { useImmer } from 'use-immer';
import { cloneDeep, groupBy } from 'lodash';

import './chartmodal.css';

interface AllYearsOptions {
  value: string;
  label: string;
}

interface ChartProps {
  //stationObj: Station | undefined;
  show: boolean;
  onHide(): void;
}

export interface MonthNames {
  name: string;
}

type MeanPerMonth = {
  initialYear: string;
  endYear: string;
  months: number[];
};

export type LocalYearValues = {
  faultDays?: number;
  faultMonths?: number;
  max: number[];
  prec: HeatSquareValue[];
  total: number[];
  year: number;
};

export type SatYearValues = {
  max: number[];
  prec: HeatSquareValue[];
  total: number[];
  year: number;
};

type HeatSquareValue = {
  count: number;
  date: string;
  prec: string;
};

const ChartModal = function (props: ChartProps) {
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    barChart: {
      yearSelectSatData: 0,
      yearSelectLocData: 0,
      chartData: [
        { name: t('Jan') },
        { name: t('Fev') },
        { name: t('Mar') },
        { name: t('Apr') },
        { name: t('May') },
        { name: t('Jun') },
        { name: t('Jul') },
        { name: t('Aug') },
        { name: t('Sep') },
        { name: t('Oct') },
        { name: t('Nov') },
        { name: t('Dec') }
      ]
    }
  });

  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const monthNames: MonthNames[] = [
    { name: t('Jan') },
    { name: t('Fev') },
    { name: t('Mar') },
    { name: t('Apr') },
    { name: t('May') },
    { name: t('Jun') },
    { name: t('Jul') },
    { name: t('Aug') },
    { name: t('Sep') },
    { name: t('Oct') },
    { name: t('Nov') },
    { name: t('Dec') }
  ];

  const [locObj, setLocObject] = useState<LocalData | null>(
    new LocalData(appState.localData, appState.stationData._coordinates)
  );
  const [satObj, setSatObject] = useState<SatData | null>(
    new LocalData(appState.satData, appState.stationData._coordinates)
  );
  const [selectLocal, setSelectLocal] = useState<AllYearsOptions[]>([]);
  const [selectSat, setSelectSat] = useState<AllYearsOptions[]>([]);
  // const [sumYear, setSumYears] = useState({});

  // State 8
  // const [stObj, setStObj] = useState<Station>();
  // State 9
  const [loading, setLoading] = useState(true);
  // State 10
  const [error, setError] = useState(null);
  // State 11
  //const [loadData, dataIsOn] = useState(false);
  // State 12

  // State 14
  // State 7
  // State 15
  const [chartData, setChartData] = useState<MonthNames[]>(monthNames);
  // State 16
  const [chartDataLabels, setChartDataLabels] = useState({
    firstLabel: 0,
    secondLabel: 0,
    firstName: '',
    secondName: ''
  });
  // State 10 - list of files already with history on public directory for demonstration
  // const [histData,setHistData] = useState([]);
  const [optionsYears, setOptionsYears] = useState<AllYearsOptions[] | undefined>(undefined);
  const [optionsYearsLocal, setOptionsYearsLocal] = useState<AllYearsOptions[] | undefined>(
    undefined
  );
  const [selectedYear, setSelectedYear] = useState<string>('2021');
  const [selectedYearLocal, setSelectedYearLocal] = useState<string>('2020');
  const [locYear, setLocYear] = useState<string>('2020');
  const [localObj, setLocalObj] = useState<LocalData | null>(null);
  // const [satObj, setSatObj] = useState<SatData | null>(null);

  const [satStatus, setSatStatus] = useState(false);
  //const [monthLocalDays,setLocalDays] = useState([]);
  const [localYearValues, setLocalValues] = useState({});
  const [satYearValues, setSatValues] = useState({});
  //const [loadLocal, setLocal] = useState(false);
  //const [loadSat, setSat] = useState(false);
  const [debug, setDebug] = useState(false);
  //const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (locObj) {
      populateSelectOptions();
    }
  }, []);

  useEffect(() => {
    //setStationObj(props.stobj);
    //const stObjJSON = props.stationObj;
    /*     if (stObjJSON != undefined) {
      const stationType = stObjJSON._type;

      setStObj(stObjJSON);

      if (stationType == 'Pluviométrica') {
        getLocData();
      }

      getSatData();
    } */
    getLocData();
    getSatData();

    return () => {
      //setStObj(undefined);
      //setSatObject(null);
      //setLocObject(null);
      setLocalObj(null);
      setLocalValues({});
      setSatValues({});
      setChartDataLabels({
        firstLabel: 0,
        secondLabel: 0,
        firstName: '',
        secondName: ''
      });
      setChartData(monthNames);
      setSelectedYear('2021');
      //setLocal(false);
    };
  }, [appState.stationData._id]);

  const getLocData = async () => {
    try {
      // Create Local Object with the JSON Data object from the response with station data
      //const localRainData = new LocalData(appState.localData, appState.stationData._coordinates);
      //console.log(appState);
      //stObj._faultDays = response.data._faultDays;
      //stObj._faultMonths = response.data._faultMonths.length;
      const selectedYear = appState.barChart.locBarSelectedYear;
      const precipitation = locObj!.getYear(selectedYear);
      console.log(precipitation);
      for (let i = 0; i < 12; i++) {
        Object.assign(chartData[i], {
          ['loc_' + selectedYear]: precipitation[i]
        });
      }
      /*
      //Populate Bar Chart Data with the Overall Years and the Last Year by default.

      //calculate last year average to display in BarChart
      const lastMonths: number[] = localRainData.getLastYear().reverse();

      //calculate average of each month for all years
      const averagePerMonth: MeanPerMonth = localRainData.getMeanPerMonth();
      const precpAverage: number[] = averagePerMonth.months;
      const arrayLength = precpAverage.length;
      const firstYear: string = averagePerMonth.initialYear;
      const lastYear: string = averagePerMonth.endYear;
      
         ## Add to the array of Months - Precipitation Data
         { name: t('Jan') }
         Ex:
         { name: "Jan", 
           [`loc_${firstYear}-${lastYear}`]: dMedian.toFixed(2),
           ['loc_' + lastYear]: lastMonths[i]
         Result:
          Month Name -----  Year -------- Average -- Year -- Average
         { name: "Jan",  "loc_1981-2020": "393.61", loc_2020: 206.7,}
      
      for (let i = 0; i < arrayLength; i++) {
        const dMedian: number = precpAverage[i];
        Object.assign(chartData[i], {
          [`loc_${firstYear}-${lastYear}`]: dMedian.toFixed(2)
        });
        Object.assign(chartData[i], {
          ['loc_' + lastYear]: lastMonths[i]
        });
      }
      */

      //const deep = cloneDeep(chartData);

      /*  appDispatch({
        type: 'chart',
        locBar: deep
      }); */

      //var bdata = localRainData.getBarData(chartData);
      setChartData(chartData);

      //const cloneUser = JSON.parse(JSON.stringify(chartData));
      /*
       setState((draft) => {
        draft.barChart.chartData = JSON.parse(JSON.stringify(deep));
      });
      //populate Select Box with Labels and Values from the Local Data
      const years: number[] = localRainData.getAllYears().sort();
      const allYearsOptions: AllYearsOptions[] = [];
      years.forEach((item) => {
        allYearsOptions.push({
          value: `${item}`,
          label: `${item}`
        });
      });
       Add Overal Values from Start Data to Last Date
      allYearsOptions.push({
        value: `${firstYear}-${lastYear}`,
        label: `${firstYear}-${lastYear}`
      });
     

      setLocYear(`${lastYear}`);
      setOptionsYearsLocal(allYearsOptions);
      setSelectedYearLocal(`${firstYear}-${lastYear}`);
 
      setChartDataLabels({
        firstLabel: parseInt(firstYear),
        secondLabel: parseInt(String(lastYear)),
        firstName: String(firstYear + '-' + lastYear),
        secondName: lastYear
      });
*/
      //setLocalObj(localRainData);

      //Data for Daily Heatmap Tab
      //let datesValues = localRainData.getLocalDailyValues(lastYear);
      const locValues: LocalYearValues = locObj!.getLocalYearValues(selectedYear);
      // adds the initial daily rain for the Tab Daily Precipitation
      //setLocalDays(datesValues);
      Object.assign(locValues, {
        faultDays: appState.localData._faultDays,
        faultMonths: appState.localData._faultMonths.length
      });
      setLocalValues(locValues);

      //setLocal(true);
      //setLoaded(true);
    } catch (error: any) {
      console.log('ChartModal-getLocData-error: ' + error.message);
      //setLocal(false);
      setChartData(monthNames);
      getSatData();
    } finally {
      setLoading(false);
    }
  };

  const getSatData = async () => {
    try {
      // Create Local Object with the JSON Data object from the response with station data
      const satRainData = new SatData(appState.satData, appState.stationData._coordinates);

      //var barData = satRainData.getBarData(chartData);
      //Populate Bar Chart Data with the Overall Years and the Last Year by default.
      const firstYear = satRainData._meanPerMonth.initialYear;
      const lastYear = satRainData._meanPerMonth.endYear;
      const lastYearPrec = satRainData.getLastYear();
      const overallAverage = satRainData._meanPerMonth.months;
      // add new entries to the Month Name Bar Data in BarChart
      // get previous valor and add to the entries
      setChartData((prevValue) => {
        for (let i = 0; i < overallAverage.length; i++) {
          const monthMedianValue: number = parseFloat(overallAverage[i]);
          Object.assign(prevValue[i], {
            [`sat_${firstYear}-${lastYear}`]: monthMedianValue.toFixed(2),
            ['sat_' + lastYear]: parseFloat(lastYearPrec[i])
          });
        }
        /*   appDispatch({
          type: 'setChart',
          valueChart: cloneDeep(prevValue)
        }); */
        return prevValue;
      });

      const years = satRainData.getAllYears().sort();
      const allYearsOptions: AllYearsOptions[] = [];
      years.forEach((item) => {
        allYearsOptions.push({
          value: `${item}`,
          label: `${item}`
        });
      });
      setOptionsYears(allYearsOptions);
      setSelectedYear(lastYear);

      // adds the initial daily rain for the Tab Daily Precipitation
      const satValues: SatYearValues = satRainData.getYearValues(lastYear);
      Object.assign(satValues, { init: firstYear, end: lastYear });
      setSatValues(satValues);

      // if data is loaded from JSON set load true for children to display fields
      //setLocal(true);
      //setLoaded(true);

      //setSatObj(satRainData);
      //setChartData(chartData);
    } catch (err: any) {
      console.log('error' + err);
      /*  if (props.stationObj != undefined) {
        //setChartData(null);
      } */
    } finally {
      setLoading(false);
    }
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionLocal, setSelectedOptionLocal] = useState(null);
  const [mValues, setMValues] = useState(null);

  const handleChangeSat = (event: any) => {
    //console.log('Satobj');
    //console.log(satObj);
    //console.log(chartData);
    //console.log('event: ' + event.value);
    /*
      Get values from Station Object(satObj) to the year 
      selected returns array of precipitation values of 
      the months of that year ex.:
      [ 165.7, 338.1, 276.3, 242.8, 97.6, 35.1, 19.4, 75.8, 100.6, 188.2, 146.1, 201.3]
    */
    const monthValues: number[] = [];
    if (satObj != undefined) {
      satObj.getYear(event.value).forEach((item) => {
        monthValues.push(item);
      });
      //console.log(monthValues);
      /*
        Change current chartData to add new property year
        ex. { name "Jan", loc_1993-2018: "289.76" }
        adding selected year value 2022(sat_2022:136)
        { name "Jan", loc_1993-2018: "289.76", sat_2022: 136 }
      */
      const chartValue = chartData;
      for (let i = 0; i < 12; i++) {
        Object.assign(chartValue[i], { ['sat_' + event.value]: monthValues[i] });
      }

      const satValues = satObj.getYearValues(event.value);
      Object.assign(satValues, {
        init: satObj.getInitYear(),
        end: satObj.getEndYear()
      });
      // adds the initial daily rain for the Tab Daily Precipitation
      setSatValues(satValues);

      setChartData(chartValue);
      /*  appDispatch({
        type: 'setChart',
        valueBarChart: cloneDeep(chartValue)
      }); */
      setSelectedYear(event.value);
      setSelectedOption((prevValue: any) => ({
        ...prevValue
      }));

      setState((draft) => {
        draft.barChart.yearSelectSatData = event.value;
        draft.barChart.chartData = JSON.parse(JSON.stringify(chartValue));
      });
      console.log(event.value);
      appDispatch({
        type: 'setSatBarSelectedYear',
        valueSelecetedSatBar: event.value
      });
    }
  };

  function populateSelectOptions() {
    /*
      Populate Select Satellite and Local with Labels and Values 
      from the Local Data Object and Sat Data Object calling 
      the functions to get all precipitations year
    */
    const yearsLoc: number[] = locObj!.getAllYears().sort();
    const selectOptionsLoc: AllYearsOptions[] = [];

    yearsLoc.forEach((item) => {
      selectOptionsLoc.push({
        value: `${item}`,
        label: `${item}`
      });
    });

    const yearsSat: number[] = satObj!.getAllYears().sort();
    const selectOptionsSat: AllYearsOptions[] = [];

    yearsSat.forEach((item) => {
      selectOptionsSat.push({
        value: `${item}`,
        label: `${item}`
      });
    });

    /* Add options values from Start Data - Last Date
    const firstYear = appState.barChart.locFirstYear;
    const lastYear = appState.barChart.locLastYear;
    selectOptions.push({
      value: `${firstYear + 1}-${lastYear - 1}`,
      label: `${firstYear + 1}-${lastYear - 1}`
    });
    */
    // Set Select Component Options for Local

    setSelectLocal(selectOptionsLoc);
    setSelectSat(selectOptionsSat);
    console.log(selectLocal);
  }

  const handleChangeLoc = (event: any) => {
    //console.log('Locobj');
    //console.log(localObj);

    const firstYear = appState.barChart.locFirstYear + 1;
    const lastYear = appState.barChart.locLastYear - 1;
    const eventString = firstYear + '-' + lastYear;
    console.log(event.value + ' ' + eventString);
    if (event.value == eventString) {
      appDispatch({
        type: 'setLocBarSelectedYear',
        valueSelecetedLocBar: event.value
      });
    } else {
      const selectedYear = event.value;
      const precipitation = locObj!.getYear(selectedYear);
      console.log(precipitation);
      for (let i = 0; i < 12; i++) {
        Object.assign(chartData[i], {
          ['loc_' + selectedYear]: precipitation[i]
        });
      }
      setChartData(chartData);

      const locValues = locObj!.getYearValues(event.value);
      console.log(locValues);
      // adds the initial daily rain for the Tab Daily Precipitation
      setLocalValues(locValues);

      console.log(event.value);
      appDispatch({
        type: 'setLocBarSelectedYear',
        valueSelecetedLocBar: event.value
      });
    }
  };

  const { height, width } = useWindowDimensions();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={
        width > 480
          ? {
              maxWidth: 800,
              left: '50%',
              right: '50%',
              transform: 'translate(-50%, 0%)'
            }
          : { maxWidth: 480 }
      }>
      {appState.dataLocLoaded ? (
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-center"
            style={{ color: '#3887be' }}>
            <span style={{ fontWeight: '700' }}>
              {appState.stationData._stationName} &#40;{appState.stationData._stationOperator}&#41;
            </span>
          </Modal.Title>
        </Modal.Header>
      ) : (
        ''
      )}

      <Modal.Body className="text-center">
        {debug ? <div className="debug">Debug screen width: {width}</div> : null}

        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {error && <div>{`There is a problem fetching the post data - ${error}`}</div>}

        <HidroData chartData={chartData} localValues={localYearValues} satValues={satYearValues} />
      </Modal.Body>

      <Modal.Footer>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col>
              {' '}
              {appState.dataLocLoaded ? <div className="loc">IN SITU-(ANA): </div> : ''}
              {appState.dataLocLoaded ? (
                <Select
                  menuPlacement="top"
                  defaultValue={{
                    label: `${appState.barChart.locBarSelectedYear}`,
                    value: `${appState.barChart.locBarSelectedYear}`
                  }}
                  onChange={handleChangeLoc}
                  options={selectLocal}
                />
              ) : (
                ''
              )}{' '}
            </Col>
            <Col>
              {' '}
              {appState.dataLocLoaded ? <div className="sat">SAT-(IMERGE): </div> : ''}
              {appState.dataLocLoaded ? (
                <Select
                  menuPlacement="top"
                  defaultValue={{
                    label: `${appState.barChart.satBarSelectedYear}`,
                    value: `${appState.barChart.satBarSelectedYear}`
                  }}
                  onChange={handleChangeSat}
                  options={selectSat}
                />
              ) : (
                ''
              )}{' '}
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default ChartModal;
