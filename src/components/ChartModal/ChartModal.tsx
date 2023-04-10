import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HidroData from "../HidroData/HidroData";
import { useState, useEffect } from "react";
import axios from "axios";
import LocalData from "../DataModels/LocalData.js";
import SatData from "../DataModels/LocalData.js";
import Station from "../DataModels/Station4";
import Spinner from "react-bootstrap/Spinner";
import useWindowDimensions from "../../utils/useWindowDimensions";
import {  useTranslation } from "react-i18next";
import Select from "react-select";
import "./chartmodal.css";


interface AllYearsOptions {
  value: string;
  label: string;
}

interface ChartProps {
  stationObj: Station | undefined;
  show: boolean;
  onHide(): void
}

export interface MonthNames {
  name: string;
}

type MeanPerMonth = {
    initialYear: string;
    endYear: string;
    months: number[],
}

export type LocalYearValues = {
  faultDays?: number;
  faultMonths?: number;
  max: number[];
  prec: HeatSquareValue[];
  total: number[];
  year: number;
}

export type SatYearValues = {
  max: number[];
  prec: HeatSquareValue[];
  total: number[];
  year: number;
}

type HeatSquareValue = {
  count: number;
  date: string;
  prec: string;
}

const ChartModal = function (props: ChartProps) {
  const { t } = useTranslation();


  const monthNames: MonthNames[] = [
    { name: t("Jan") },
    { name: t("Fev") },
    { name: t("Mar") },
    { name: t("Apr") },
    { name: t("May") },
    { name: t("Jun") },
    { name: t("Jul") },
    { name: t("Aug") },
    { name: t("Sep") },
    { name: t("Oct") },
    { name: t("Nov") },
    { name: t("Dec") },
  ];

 // const [sumYear, setSumYears] = useState({});

  // State 8
  const [stObj, setStObj] = useState<Station>();
  // State 9
  const [loading, setLoading] = useState(true);
  // State 10
  const [error, setError] = useState(null);
  // State 11
  const [loadData, dataIsOn] = useState(false);
  // State 12
  const [countM, setCountM] = useState(-1);
  const [countD, setCountD] = useState(-1);
  // State 14
  const [errorS, setErrorS] = useState<string | null>(null);
  // State 7
  // State 15
  const [chartData, setChartData] = useState<MonthNames[]>(monthNames);
  // State 16
  const [chartDataLabels, setChartDataLabels] = useState({
    firstLabel: 0,
    secondLabel: 0,
    firstName: "",
    secondName: "",
  });
  // State 10 - list of files already with history on public directory for demonstration
  // const [histData,setHistData] = useState([]);
  const [optionsYears, setOptionsYears] = useState<AllYearsOptions[] | undefined>(undefined);
  const [optionsYearsLocal, setOptionsYearsLocal] = useState<AllYearsOptions[] | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<string>("2021");
  const [selectedYearLocal, setSelectedYearLocal] = useState<string>("2020");
  const [locYear, setLocYear] = useState<string>("2020");
  const [localObj, setLocalObj] = useState<LocalData | null>(null);
  const [satObj, setSatObj] = useState<SatData | null>(null);

  const [satStatus, setSatStatus] = useState(false);
  //const [monthLocalDays,setLocalDays] = useState([]);
  const [localYearValues, setLocalValues] = useState({});
  const [satYearValues, setSatValues] = useState({});
  const [loadLocal, setLocal] = useState(false);
  const [loadSat, setSat] = useState(false);
  const [debug, setDebug] = useState(false);
  const [test, setTest] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    
    setTest(test);
    setCountM(countM + 1);
    //setStationObj(props.stobj);
    const stationObj = props.stationObj;
    if(stationObj != undefined){
    const stationType = stationObj._type;
   
    setStObj(stationObj);
    
    if (stationType == "Pluviométrica") {
      getLocData(stationObj);
    }

    getSatData(stationObj);

  }
    return () => {
      setStObj(undefined);
      setSatObj(null);
      setLocalObj(null);
      setLocalValues({});
      setSatValues({});
      setCountD(countD + 1);
      setChartDataLabels({
        firstLabel: 0,
        secondLabel: 0,
        firstName: "",
        secondName: "",
      });
      setChartData(monthNames);
      setSelectedYear("2021");
      setLocal(false);
    };
  }, [props.stationObj]);



  const getLocData = async (stationObj: Station) => {
    try {
      const sId = String(stationObj._id).padStart(8, "0");
      const state = stationObj._stationState;
      const latitude = stationObj._latitude;
      const longitude = stationObj._longitude;

      const response = await axios.get(
        `data/BR/${state}/chuvas_L${sId}.json`
      ).then(response => { 
        console.log(response)
        const coordinates = [longitude,latitude];

        // Create Local Object with the JSON Data object from the response with station data
        const localRainData = new LocalData(response.data, coordinates);
  
        //stObj._faultDays = response.data._faultDays;
        //stObj._faultMonths = response.data._faultMonths.length;
        
        setStObj(stationObj);
        //Populate Bar Chart Data with the Overall Years and the Last Year by default.
        const lastMonths : number [] = localRainData.getLastYear();
        lastMonths.reverse();
  
        const meanPerMonth : MeanPerMonth = localRainData.getMeanPerMonth();
        const dataMedian: number[] = meanPerMonth.months;
        const arrayLength = dataMedian.length;
        const firstYear : string = meanPerMonth.initialYear;
        const lastYear : string = meanPerMonth.endYear;
        for (let i = 0; i < arrayLength; i++) {
          const dMedian: number = dataMedian[i];
          Object.assign(chartData[i], {
            [`loc_${firstYear}-${lastYear}`]: 
              dMedian.toFixed(2),
          });
          Object.assign(chartData[i], {
            ["loc_" + lastYear]: lastMonths[i],
          });
        }
        //var bdata = localRainData.getBarData(chartData);
        setChartData(chartData);
  
        //populate Select Box with Labels and Values from the Local Data
        const years : number[] = localRainData.getAllYears().sort();
        const allYearsOptions: AllYearsOptions[] = [];
        years.forEach((item) => {
          allYearsOptions.push({
            value: `${item}`,
            label: `${item}`,
          });
        });
        // Add Overal Values from Start Data to Last Date
        allYearsOptions.push({
          value: `${firstYear}-${lastYear}`,
          label: `${firstYear}-${lastYear}`,
        });
  
        setLocYear(`${lastYear}`);
        setOptionsYearsLocal(allYearsOptions);
        setSelectedYearLocal(`${firstYear}-${lastYear}`);
  
        setChartDataLabels({
          firstLabel: parseInt(firstYear),
          secondLabel: parseInt(String(lastYear)),
          firstName: String(firstYear + "-" + lastYear),
          secondName: lastYear,
        });
  
        setLocalObj(localRainData);
  
        //Data for Daily Heatmap Tab
        //let datesValues = localRainData.getLocalDailyValues(lastYear);
        const locValues : LocalYearValues = localRainData.getLocalYearValues(lastYear);
        // adds the initial daily rain for the Tab Daily Precipitation
        //setLocalDays(datesValues);
        Object.assign(locValues, {
          faultDays: response.data._faultDays,
          faultMonths: response.data._faultMonths.length,
        });
        setLocalValues(locValues);
  
        setErrorS(null);
        setLocal(true);
        setLoaded(true);

      }).catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);

        throw error;
      });
      //setStationObj(props.stobj);

     
    } catch (error:any) {
     console.log("Some error");
     setLocal(false);
     setChartData(monthNames);
     getSatData(stationObj);
     setErrorS(
       "Local " +
         error.message +
         " - Station: Local Data not found"
     ); 
    
    } finally {
      setLoading(false);
    }
  };

  const getSatData = async (stationObj: Station) => {
    const sId = String(stationObj._id).padStart(8, "0");
    const state = stationObj._stationState;
    const latitude = stationObj._latitude;
    const longitude = stationObj._longitude;
    try {
      const response = await axios.get(
        `data/BR/${state}/chuvas_S${sId}.json`
      );

      const coordinates = [longitude,latitude];

      // Create Local Object with the JSON Data object from the response with station data
      const satRainData = new SatData(response.data._satData, coordinates);

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
            [`sat_${firstYear}-${lastYear}`]: 
              monthMedianValue.toFixed(2),
            ["sat_" + lastYear]: parseFloat(lastYearPrec[i]),
          });
        }
        return prevValue;
      });

      const years = satRainData.getAllYears().sort();
      const allYearsOptions: AllYearsOptions[] = [];
      years.forEach((item) => {
        allYearsOptions.push({
          value: `${item}`,
          label: `${item}`,
        });
      });
      setOptionsYears(allYearsOptions);
      setSelectedYear(lastYear);

      // adds the initial daily rain for the Tab Daily Precipitation
      const satValues: SatYearValues = satRainData.getYearValues(lastYear);
      Object.assign(satValues, { init: firstYear, end: lastYear });
      setSatValues(satValues);

      // if data is loaded from JSON set load true for children to display fields
      setLocal(true);
      setLoaded(true);

      setSatObj(satRainData);
      //setChartData(chartData);
    } catch (err: any) {
      console.log('error'+ err);
      if(props.stationObj != undefined){
      //setChartData(null);
      setErrorS(
        err.message +
          " - Station: " +
          props.stationObj.getID() +
          ", Name: " +
          props.stationObj.getName()
      );}
    } finally {
      setLoading(false);
    }
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionLocal, setSelectedOptionLocal] = useState(null);
  const [mValues, setMValues] = useState(null);

  const handleChangeSat = (event:any) => {
    const monthValues : number[] = [];
    if(satObj != undefined){
    satObj.getYear(event.value).forEach((item) => {
      monthValues.push(item);
    });

    //setMValues(satObj.getYear(event.value));
    const chartValue = chartData;
    for (let i = 0; i < 12; i++) {
      Object.assign(chartValue[i], { ["sat_" + event.value]: monthValues[i] });
    }

    const satValues = satObj.getYearValues(event.value);
    Object.assign(satValues, {
      init: satObj.getInitYear(),
      end: satObj.getEndYear(),
    });
    // adds the initial daily rain for the Tab Daily Precipitation
    setSatValues(satValues);

    setChartData(chartValue);
    setSelectedYear(event.value);
    setSelectedOption((prevValue:any) => ({
      ...prevValue,
    }));
    }
  };

  const handleChangeLoc = (event:any) => {
    if(localObj != undefined){
    const firstYear = localObj._meanPerMonth.initialYear;
    const lastYear = localObj._meanPerMonth.endYear;
    const lObj = localObj;
    const selectedYear = event.value;

    if (event.value === `${firstYear}-${lastYear}`) {
      // eslint-disable-next-line no-undef
      console.log("frst");
    } else {
      const monthValues : number[] = [];
      localObj.getYear(event.value).forEach((item) => {
        monthValues.push(item);
      });
      monthValues.reverse();
      //setMValues(localObj.getYear(event.value));
      const chartValue = chartData;
      for (let i = 0; i < 12; i++) {
        Object.assign(chartValue[i], {
          ["loc_" + event.value]: monthValues[i],
        });
      }
      setChartData(chartValue);
    }
    const locTest = localObj;
    const locValues = localObj.getLocalYearValues(event.value);
    setLocalValues((prevValue:any) => {
      const faultDays = prevValue.faultDays;
      const faultMonths = prevValue.faultMonths;
      Object.assign(locValues, { faultDays: faultDays });
      Object.assign(locValues, { faultMonths: faultMonths });
      return locValues;
    });

    //let dailyValues = localObj.getLocalDailyValues(event.value);
    // adds the initial daily rain for the Tab Daily Precipitation
    //setLocalDays(datesValues);
    //setLocalDays(dailyValues);
    setLocYear(event.value);
    setSelectedYearLocal(event.value);
    setSelectedOption((prevValue:any) => ({
      ...prevValue,
    }));
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
              left: "50%",
              right: "50%",
              transform: "translate(-50%, 0%)",
            }
          : { maxWidth: 480 }
      }
    >
      {loadLocal ? (
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-center"
            style={{ color: "#3887be" }}
          >
            <span style={{ fontWeight: "700" }}>
              {stObj && stObj.getName()} &#40;{stObj && stObj.getOperator()}&#41;
            </span>
          </Modal.Title>
        </Modal.Header>
      ) : (
        ""
      )}

      <Modal.Body className="text-center">
        {debug ? (
          <div className="debug">Debug screen width: {width}</div>
        ) : null}

        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}

        <HidroData
          sInfo={stObj}
          chartData={chartData}
          loadLocal={loadLocal}
          localValues={localYearValues}
          satValues={satYearValues}
          satObj={satObj}
          dataLoad={loaded}
        />
      </Modal.Body>

      <Modal.Footer>
      <Container fluid>
      <Row className="justify-content-md-center">
      <Col> {loadLocal ? (
              <div className="loc">IN SITU-(ANA): </div>
            ) : (
             ""
            )}
            {loadLocal ? (
              
                <Select
                  menuPlacement="top"
                  defaultValue={{
                    label: String(selectedYearLocal),
                    value: String(selectedYearLocal),
                  }}
                  onChange={handleChangeLoc}
                  options={optionsYearsLocal}
                />
              
            ) : (
              ""
            )} </Col>
            <Col> {loadLocal ? (
              <div className="sat">SAT-(IMERGE): </div>
            ) : (
             ""
            )}
            {loadLocal ? (
              
              <Select
              menuPlacement="top"
              defaultValue={{
                label: String(selectedYear),
                value: String(selectedYear),
              }}
              onChange={handleChangeSat}
              options={optionsYears}
            />
              
            ) : (
              ""
            )} </Col>
           
              </Row>
    </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default ChartModal;
