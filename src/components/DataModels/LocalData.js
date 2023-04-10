import RainData2 from './RainData2.js'; 

class LocalData extends RainData2 {

    _faultDays;
    _faultMonths; // absence, error of registration, etc..
    _csvMonthsRowsdata;


    constructor(obj,coordinates){
        super(obj._id,obj._initRegisterTime,obj._lastRegisterTime,coordinates,obj._precipitation,obj._meanPerMonth,obj._yearMonthMean);
        this._faultDays = obj._faultDays;
        this._faultMonths = obj._faultMonths;
        this._csvMonthsRowsdata = obj._csvMonthsRowsdata;
    }

   
    getBarData(chartData) {
        var bardata = { ...chartData }
        let lastMonths = super.getLastYear();
        lastMonths.reverse();
        let dataMedian = this._meanPerMonth.months;
        let arrayLength = this.length;
        let firstYear = this._meanPerMonth.initialYear;
        let lastYear = this._meanPerMonth.endYear;
        for(var i=0;i<arrayLength;i++){
          Object.assign(bardata[i], {[`AA loc_${firstYear}-${lastYear}`] : parseFloat(dataMedian[i].toFixed(2)) });
          Object.assign(bardata[i], {["AA loc_"+lastYear] : parseFloat(lastMonths[i]) });
        }
        return bardata;
    }

}
export default LocalData;