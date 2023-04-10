import RainData2 from './RainData2.js'; 

class SatData extends RainData2 {

    constructor(obj,coordinates){
        super(obj._id,obj._initRegisterTime,obj._lastRegisterTime,coordinates,obj._precipitation,obj._meanPerMonth,obj._yearMonthMean);

    }

 getBarData(chartData){
    let lastYearPrec = super.getLastYear();
    let overallAverage = this._meanPerMonth.months;
    let firstYear = this._meanPerMonth.initialYear;
    let lastYear = this._meanPerMonth.endYear;
    for(var i=0;i<overallAverage.length;i++){
      Object.assign(chartData[i], {[`sat_${firstYear}-${lastYear}`] : parseFloat(overallAverage[i].toFixed(2)) });
      Object.assign(chartData[i], {["sat_"+lastYear] : parseFloat(lastYearPrec[i]) });
    }
 }

}
export default SatData;