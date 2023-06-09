class RainData {

    _id;
    _initRegisterTime; // firstdata register
    _lastRegisterTime; // last data register
    _coordinates = [];
    _csvMonthsRows; // total number of months of Data with duplicates
    _registerMonths; // numbers of months of Data
    _faultDays = 0;
    _faultMonths = []; // absence, error of registration, etc.. 
    _yearMonthMean = [];
    _precipitation = [];
    _meanPerMonth = {
        'initialYear': '',
        'endYear': '',
        'months': []
    }
    
    constructor(id) {
        this._id = id;
    }
  
    convertToDate(dateString) {
      //  Convert a "dd/MM/yyyy" string into a Date object
      let d = dateString.split("/");
      let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
      return dat;     
    }

    monhtMean(iniReg,endReg){
        var monthValues = [0,0,0,0,0,0,0,0,0,0,0,0];
        var initYear;
        var endYear;
        var initDate = new Date(iniReg);
        var numberOfMonths = 0;
        if(initDate.getMonth() === 0){
            initYear = initDate.getFullYear();
        } else {
            initYear = initDate.getFullYear()+1;
        }
        var endDate = new Date(endReg);
        if(endDate.getMonth() === 11){
            endYear = endDate.getFullYear();
        } else {
            endYear = endDate.getFullYear()-1;
        }

        this._precipitation.forEach((item)=>{
            //console.log(item);
            //console.log(item._year+" <= "+endYear+" && " + item._year + " >= "+initYear);
            if((item._year  <= endYear) && item._year >= initYear){
                monthValues[parseInt(item._month)] += item._total;
                numberOfMonths++;
                //console.log("Total: "+item._total+" Mes"+item._month+" "+monthValues[item._month]);
            }         
        });
        this._meanPerMonth.initialYear = initYear;
        this._meanPerMonth.endYear = endYear;
        monthValues.forEach((item,index,array) => {
            array[index] = this.toNumber(item/(parseInt(numberOfMonths/12)),2);
        })
        this._meanPerMonth.months = monthValues;
;
    }

    getLastYear(){
        var lastYear = new Date(this._lastRegisterTime);
        var year = (lastYear.getFullYear())-1;
        var monthValues = [];
        this._precipitation.forEach((item)=>{
            if(item._year === year){
                monthValues.push(this.toNumber(item._total,2));
            }
        })
        return monthValues;
    }

    getYear(year){
        var lastYear = new Date(year);

        var year = (lastYear.getFullYear());
        var monthValues = [];
        this._precipitation.forEach((item)=>{
            if(item._year === year){
                monthValues.push(this.toNumber(item._total,1));
            }
        })
        return monthValues;
    }

    getYearValues(year){
         
        let totalValues = [];
        let maxValues = [];
        this._precipitation.forEach((item)=>{
            if(item._year === parseInt(year)){
                totalValues.push(this.toNumber(item._total,1));
                maxValues.push(this.toNumber(item._max,1));
            }
        })
        return { 'year': year, 'max': maxValues, 'total': totalValues, 'prec': this.getDailyValues(year)};
    }

    getLocalYearValues(year){
         
        let totalValues = [];
        let maxValues = [];
        this._precipitation.forEach((item)=>{
            if(item._year === parseInt(year)){
                totalValues.push(this.toNumber(item._total,1));
                maxValues.push(this.toNumber(item._max,1));
            }
        });
        maxValues.reverse();
        totalValues.reverse();
        return { 'year': year, 'max': maxValues, 'total': totalValues, 'prec': this.getLocalDailyValues(year)};
    }

    getDailyValues(year){
        let dailyData = this._precipitation.reduce((acummulator, item) => {
            if(item._year === parseInt(year))
            acummulator.push(item); 
            return acummulator;
            },[]);
            
            let datesValues = [];
            var dateV = new Date(`${year}`);
            dailyData.forEach((item)=>{
             
              item._rainData.forEach((value)=>{
                  let ndate  = dateV.setDate(dateV.getDate() + 1)
                  let countValue;
                  if(value === -1) countValue = 9;
                  else if(value === 0) countValue = 0;
                  else if(value < 5) countValue = 1;
                  else if(value < 20) countValue = 2;
                  else if(value < 50) countValue = 3;
                  else if(value < 100) countValue = 4;
                  else { countValue = 5}
                  datesValues.push({ date: new Date(ndate).toISOString().split('T')[0], count: countValue, prec: value.toFixed(1) });
              })
      
          }); 
        
        return datesValues;
    }

    getLocalDailyValues(year){
        let dailyData = this._precipitation.reduce((acummulator, item) => {
            if(item._year === parseInt(year))
            acummulator.push(item); 
            return acummulator;
            },[]);
            dailyData.reverse();
            let datesValues = [];
            var dateV = new Date(`${year}`);
            dailyData.forEach((item)=>{
             
              item._rainData.forEach((value)=>{
                  let ndate  = dateV.setDate(dateV.getDate() + 1)
                  let countValue;
                  if(value === -1) countValue = 9;
                  else if(value === 0) countValue = 0;
                  else if(value < 5) countValue = 1;
                  else if(value < 20) countValue = 2;
                  else if(value < 50) countValue = 3;
                  else if(value < 100) countValue = 4;
                  else { countValue = 5}
                  datesValues.push({ date: new Date(ndate).toISOString().split('T')[0], count: countValue, prec: value.toFixed(1) });
              })
      
          }); 
        
        return datesValues;
    }

    getAllYears(){     
        var monthValues = [];
        this._precipitation.forEach((item)=>{
          if(!monthValues.includes(item._year)){
            monthValues.push(item._year);
          }       
        })
        return monthValues;
    }

    // reduce decimal digit precision
    toNumber (value, precision) {
        precision = precision || 0;
        if (precision === 0) {
          return value * 1;
        } else {
          return Number((value * 1).toFixed(precision));
        }
    }

}

  module.exports = RainData;