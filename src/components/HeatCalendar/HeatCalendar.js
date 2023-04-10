import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './HeatCalendar.css';
import ReactTooltip from 'react-tooltip';
import {useState, useEffect} from 'react';
import TableValues from '../TableValues/TableValues';
import TableValuesSat from '../TableValues/TableValuesSat';
import { useTranslation } from "react-i18next";

const HeatCalendar = (props) => {
  const { t } = useTranslation();
  const[loaded,setLoaded] = useState(false);
  const [locYear,setLocYear] = useState(props.locYear);
  const [localDaily,setLocalDaily] = useState([]);
  const [satDaily,setSatDaily] = useState([]);
  const [daily,setDaily] = useState(props.dailyPrec);
  const [dailyValues,setDailyValues] = useState([
    { date: '2020-07-01', count: 2 },
    { date: '2020-08-22', count: 4 },
    { date: '2020-09-30', count: 2 },
    { date: '2020-10-30', count: 3 },
    { date: '2020-11-30', count: 4 },
    { date: '2020-12-30', count: 1 }
  ]);
  const [localValues,setYearValues] = useState(props.localValues);
  const [satValues,setSatValues] = useState(props.satValues);

  const setValues = ()=>{
    // eslint-disable-next-line no-prototype-builtins
    if(localValues.prec.length > 0 && localValues.prec[0].hasOwnProperty('date') ){ 
     return localValues.prec;
    } else {   
     return []
    }
}

const mystyle = {
  marginTop: '20px'
};

  useEffect(
    () => {
      
     if(props.locload){
      let sat = props.satValues.prec;  
      let local = props.localValues.prec;
     
      setDaily(props.dailyPrec); // execute side effect
      setLocYear(props.locYear);
      setYearValues(props.localValues);
      setSatValues(props.satValues);
      
      if (typeof local !== 'undefined'){
        setLocalDaily(local);
      }
      if (typeof sat !== 'undefined'){
        setSatDaily(sat);
      }
      setLoaded(true);
    }
    },
    // optional dependency array
    [
      props // 0 or more entries
    ] 
)
 
  return (<div style={{marginTop: '0px'}}>
      {loaded &&  <TableValues localValues={localValues} />  }
      {loaded &&
      <CalendarHeatmap id={654748912}
  startDate={new Date(`${localValues.year}-01-01`)}
  endDate={new Date(`${localValues.year}-12-30`)}
  monthLabels={[t('Jan'),t('Fev'),t('Mar'),t('Apr'),t('May'),t('Jun'),t('Jul'),t('Aug'),t('Sep'),t('Oct'),t('Nov'),t('Dec')]}
  values={localDaily}
  classForValue={(value) => {
    if (!value) {
      return 'color-empty';
    }
    return `color-scale-${value.count}`;
  }}
  tooltipDataAttrs={(value) => {
    return {
      'data-tip': `${value.date} `+ t('prec') +`: ${value.prec}`
    };
  }}
/> } <br/><br/>

{loaded &&  <TableValuesSat satValues={satValues}/> }
{loaded &&
<CalendarHeatmap id={123748912}
  startDate={new Date(`${satValues.year}-01-01`)}
  endDate={new Date(`${satValues.year}-12-30`)}
  monthLabels={[t('Jan'),t('Fev'),t('Mar'),t('Apr'),t('May'),t('Jun'),t('Jul'),t('Aug'),t('Sep'),t('Oct'),t('Nov'),t('Dec')]}

  values={satDaily}
  classForValue={(value) => {
    if (!value) {
      return 'color-empty';
    }
    return `color-scale-${value.count}`;
  }}
  tooltipDataAttrs={(value) => {
    return {
      'data-tip': `${value.date} `+ t('prec') +`: ${value.prec}`
    };
  }}
/> }

{loaded &&
<ReactTooltip />}
</div>
      )
};
export default HeatCalendar

