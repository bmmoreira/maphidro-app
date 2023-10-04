import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import { lightBlue } from '../Utils/sytles';
import useWindowDimensions from '../../utils/useWindowDimensions';
import Select from 'react-select';
import { cloneDeep, groupBy } from 'lodash';
import LocalData from '../DataModels/LocalData.js';
import SatData from '../DataModels/LocalData.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HidroDataMobile from '../HidroData/HidroDataMobile';

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

export default function StationDialog() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [open, setOpen] = React.useState(appState.modals.settingsdialog);

  const handleClose = () => {
    appDispatch({
      type: 'toggleStationDialog',
      value: false
    });
    setOpen(false);
  };

  const [locObj, setLocObject] = useState<LocalData | null>(
    new LocalData(appState.localData, appState.stationData._coordinates)
  );
  const [satObj, setSatObject] = useState<SatData | null>(
    new LocalData(appState.satData, appState.stationData._coordinates)
  );
  const [selectLocal, setSelectLocal] = useState<AllYearsOptions[]>([]);
  const [selectSat, setSelectSat] = useState<AllYearsOptions[]>([]);

  const [localYearValues, setLocalValues] = useState({});
  const [satYearValues, setSatValues] = useState({});

  const [debug, setDebug] = useState(false);

  useEffect(() => {
    if (locObj) {
      populateSelectOptions();
    }
  }, []);

  useEffect(() => {
    const selectedYearLoc = appState.barChart.locBarSelectedYear;
    const precipitationLoc = locObj!.getYear(selectedYearLoc);
    const selectedYearSat = appState.barChart.satBarSelectedYear;
    const precipitationSat = satObj!.getYear(selectedYearSat);
    /*
        ## Add to the array of Months - Precipitation Data
         { name: t('Jan') }
         Ex:
         { name: "Jan", 
           [`loc_${firstYear}-${lastYear}`]: dMedian.toFixed(2),
           ['loc_' + lastYear]: lastMonths[i]
         Result:
          Month Name -----  Year -------- Average -- Year -- Average
         { name: "Jan",  "loc_1981-2020": "393.61", loc_2020: 206.7,}
     */
    const chartValue: any = cloneDeep(appState.barChart.chartData);
    for (let i = 0; i < 12; i++) {
      Object.assign(chartValue[i], {
        ['loc_' + selectedYearLoc]: precipitationLoc[i],
        ['sat_' + selectedYearSat]: precipitationSat[i]
      });
    }

    //Data for Daily Heatmap Tab
    const locHeatmap = locObj!.getLocalYearValues(selectedYearLoc);
    const satHeatmap = satObj!.getYearValues(selectedYearSat);
    console.log(locHeatmap);

    appDispatch({
      type: 'setChart',
      valueChart: chartValue
    });
    appDispatch({
      type: 'satHeatmap',
      valueSatHeatmap: satHeatmap
    });
    appDispatch({
      type: 'locHeatmap',
      valueLocHeatmap: locHeatmap
    });

    return () => {
      setLocalValues({});
      setSatValues({});
    };
  }, [appState.stationData._id]);

  const handleChangeSat = (event: any) => {
    const precipitationLoc = satObj!.getYear(event.value);
    const chartValue: any = cloneDeep(appState.barChart.chartData);
    //const chartValue: any = cloneDeep(chartData);
    for (let i = 0; i < 12; i++) {
      Object.assign(chartValue[i], { ['sat_' + event.value]: precipitationLoc[i] });
    }

    // adds the initial daily rain for the Tab Daily Precipitation
    const satHeatmap = satObj!.getYearValues(event.value);

    appDispatch({
      type: 'setChart',
      valueChart: chartValue
    });

    appDispatch({
      type: 'satHeatmap',
      valueSatHeatmap: satHeatmap
    });

    console.log(event.value);
    appDispatch({
      type: 'setSatBarSelectedYear',
      valueSelecetedSatBar: event.value
    });
  };

  function populateSelectOptions() {
    /*
      Populate Select Satellite and Local with Labels and Values 
      from the Local Data Object and Sat Data Object calling 
      the function to get all precipitations year
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

    setSelectLocal(selectOptionsLoc);
    setSelectSat(selectOptionsSat);
    console.log(selectLocal);
  }

  const handleChangeLoc = (event: any) => {
    const selectedYear = event.value;
    const precipitation = locObj!.getYear(selectedYear);
    console.log(precipitation);
    const chartValue: any = cloneDeep(appState.barChart.chartData);

    for (let i = 0; i < 12; i++) {
      Object.assign(chartValue[i], {
        ['loc_' + selectedYear]: precipitation[i]
      });
    }

    appDispatch({
      type: 'setChart',
      valueChart: chartValue
    });

    // adds the initial daily rain for the Tab Daily Precipitation
    const locHeatmap = locObj!.getLocalYearValues(selectedYear);
    appDispatch({
      type: 'locHeatmap',
      valueLocHeatmap: locHeatmap
    });

    console.log(event.value);
    appDispatch({
      type: 'setLocBarSelectedYear',
      valueSelecetedLocBar: event.value
    });
  };

  const { height, width } = useWindowDimensions();

  return (
    <Dialog fullScreen open={appState.modals.stationdialog} onClose={handleClose}>
      <AppBar
        sx={{ position: 'relative', backgroundColor: lightBlue.bg, color: lightBlue.titleColor }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {appState.stationData.stName}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            close
          </Button>
        </Toolbar>
      </AppBar>
      <HidroDataMobile />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col>
            <div className="loc">IN SITU-(ANA): </div>

            <Select
              menuPlacement="top"
              defaultValue={{
                label: `${appState.barChart.locBarSelectedYear}`,
                value: `${appState.barChart.locBarSelectedYear}`
              }}
              onChange={handleChangeLoc}
              options={selectLocal}
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
              onChange={handleChangeSat}
              options={selectSat}
            />
          </Col>
        </Row>
      </Container>
    </Dialog>
  );
}
