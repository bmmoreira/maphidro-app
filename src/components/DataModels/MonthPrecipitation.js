class MonthPrecipitation {

    _precpDate;
    _total;
    _mDays = 0;
    _max;
    _year;
    _month;
    _daysInMonth;
    _rainData = [];

    constructor(date,format) {
            //  "dd/MM/yyyy"
        if(format == 1){
            this._precpDate = this.convertToDate(date);
            this._year = this._precpDate.getFullYear();
            this._month = this._precpDate.getMonth();
            this._daysInMonth = this.numberOfDays(this._year,this._month);
        } else if (format == 2) {
            this._precpDate = new Date(date);
            this._year = this._precpDate.getFullYear();
            this._month = this._precpDate.getMonth();
            this._daysInMonth = this.numberOfDays(this._year,this._month);
        } else {
            this._precpDate = date;
            this._year = this._precpDate.getFullYear();
            this._month = this._precpDate.getMonth();
            this._daysInMonth = this.numberOfDays(this._year,this._month);  
        }
    }
    // inserting from CSV
    insertValue(value){
        if(value === ""){
            this._mDays++;
            this._rainData.push(-1);
        } else {
            let pNumber = parseFloat(value.replace(/,/, '.'));
            this._rainData.push(this.toNumber( pNumber, 2));
        }
    }

    calculateTotal(){
        let total = 0;
        this._rainData.forEach((rain) =>{
            // if is not missing register
            if(rain > -1) {
                total += rain 
            }    
        });
        return this.toNumber(total,2);      
    }

    calculateMax(){
        let data = this._rainData.reduce((a, b) => {
            return Math.max(a, b);
          }, -Infinity);
        return data;
    }

    convertToDate(dateString) {
        //  Convert a "dd/MM/yyyy" string into a Date object
        let d = dateString.split("/");
        let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
        return dat;     
    }

    // limit precision
    toNumber (value, precision) {
        precision = precision || 0;
        if (precision === 0) {
          return value * 1;
        } else {
          return Number((value * 1).toFixed(precision));
        }
    }

    numberOfDays(year,month){
        return new Date(year,month+1,0).getDate();
    }

}

module.exports = MonthPrecipitation;