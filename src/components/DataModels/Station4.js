
class Station {

    _id;
    _type;
    _stationName;
    _stationStart; 
    _stationActive;
    _stationAccountable; 
    _stationOperator;
    _stationState;
    _stationCity;
    _coordinates;
    _latitude;
    _longitude;
    _localFaultDays;
    _localFaultMonths;
    _stationBasin;
    _stationRiver;
    _stationADren;
    _stationEscale;
    _stationRegLevel;
    _stationDischarge;
    _stationWQuality;
    _stationPluviometer;
    _stationRegRain;
    _stationEvaporimeter;
    _stationClimatological;
    _stationTelemetry;
    _stationInitScale;
    _stationInitRegLevel;
    _stationInitRegDesLiq;
    _stationInitRegSed;
    _stationInitRegQual;
    _stationInitRegPluv;
    _stationInitRegRain;
    _stationInitRegEvap;
    _stationInitRegClim;
    _stationInitRegTele;
    _stationOperating;
    _stationRegINC_TEL;
    _stationSediments;
    _stationWaterQuality;
    _stationLiquidDischarge;
    
    constructor(obj) {
        this._id = obj._id;
        this._stationName = obj._stationName;
        this._stationOperator = obj._stationOperator;
        this._type = obj._type;
        this._stationStart = obj._stationStart; 
        this._stationActive = obj._stationActive;
        this._stationAccountable = obj._stationAccountable;
        this._stationState = obj._stationState;
        this._stationCity = obj._stationCity;
        this._latitude = obj._latitude;
        this._longitude = obj._longitude;
        this._stationBasin = obj._stationBasin;
        this._stationRiver = obj.p_stationRiver;
        this._stationADren = obj._stationADren;
        this._stationEscale = obj._stationEscale;
        this._stationSediments = obj._stationSediments;
        this._stationWaterQuality = obj._stationWaterQuality;
        this._stationLiquidDischarge = obj._stationLiquidDischarge;
        this._stationRegLevel = obj._stationRegLevel;
        this._stationDischarge = obj._stationDischarge;
        this._stationWQuality = obj._stationWQuality;
        this._stationPluviometer = obj._stationPluviometer;
        this._stationRegRain = obj._stationRegRain;
        this._stationEvaporimeter = obj._stationEvaporimeter;
        this._stationClimatological = obj._stationClimatological;
        this._stationTelemetry = obj._stationTelemetry;
        this._stationInitScale = obj._stationInitScale;
        this._stationInitRegLevel = obj._stationInitRegLevel;
        this._stationInitRegDesLiq = obj._stationInitRegDesLiq;
        this._stationInitRegSed = obj._stationInitRegSed;
        this._stationInitRegQual = obj._stationInitRegQual;
        this._stationInitRegPluv = obj._stationInitRegPluv;
        this._stationInitRegRain = obj._stationInitRegRain;
        this._stationInitRegEvap = obj._stationInitRegEvap;
        this._stationInitRegClim = obj._stationInitRegClim;
        this._stationInitRegTele = obj._stationInitRegTele;
        this._stationOperating = obj._stationOperating;
        this._stationRegINC_TEL = obj._stationRegINC_TEL;
        }
     
    getID(){
        return this._id;
    }

    getName(){
        return this._stationName;
    }

    getOperator(){
        return this._stationOperator;
    }

    getType(){
        return this._type;
    }

    getStart(){
        return this._stationStart;
    }

    getIsActive(){
        return this._stationActive;
    }

    getAccountable(){
        return this._stationAccountable;
    }

    getUF(){
        return this._stationState;
    }

    getCity(){
        return this._stationCity;
    }

    getCoordinates(){
        return this._coordinates;
    }

    getLatitude(){
        return this._latitude;
    }

    getLongitude(){
        return this._longitude;
    }

    getBasin(){
        return this._stationBasin;
    }

    getRiver(){
        return this._stationRiver;
    }

    getADren(){
        return this._stationADren;
    }

    getScale(){
        return this._stationEscale;
    }

    getSediments(){
        return this._stationSediments;
    }

    getWaterQuality(){
        return this._stationWaterQuality;
    }

    getPluviometer(){
        return this._stationPluviometer;
    }

    getRegRain(){
        return this._stationRegRain;
    }

    getEvaporimeter(){
        return this._stationEvaporimeter;
    }

    getClimatological(){
        return this._stationClimatological;
    }

    getTelemetry(){
        return this._stationTelemetry;
    }

    getInitScale(){
        return this._stationInitScale;
    }

    getInitRegLevel(){
        return this._stationInitRegLevel;
    }

    getInitRegDesLiq(){
        return this._stationInitRegDesLiq;
    }

    getInitRegSed(){
        return this._stationInitRegSed;
    }

    getInitRegQual(){
        return this._stationInitRegQual;
    }

    getInitRegPluv(){
        return this._stationInitRegPluv;
    }

    getInitRegRain(){
        this._stationInitRegRain;
    }

    getInitRegEvap(){
        return this._stationInitRegEvap;
    }

    getInitRegClim(){
        return this._stationInitRegClim;
    }

    getInitRegTele(){
        return this._stationInitRegTele;
    }

    getOperating(){
        return this._stationOperating;
    }

    getRegINC_TEL(){
        return this._stationRegINC_TEL;
    }
    
    getStationObj(){
        return {
            'type': this._type,
            'id': this._id,
            'stationName': this._stationName,
            'stationActive' : this._stationActive,
            'stationAccountable' : this._stationAccountable,
            'stationOperator' : this._stationOperator,
            'stationState' : this._stationState,
            'stationCity' : this._stationCity,
            'latitude': this._latitude,
            'longitude': this._longitude,
            'stationBasin' : this._stationBasin,
            'stationRiver' : this._stationRiver,
            'stationADren' : this._stationADren,
            'stationEscale' : this._stationEscale,
            'stationRegLevel' : this._stationRegLevel,
            'stationEvaporimeter' : this._stationEvaporimeter,
            'stationClimatological' : this._stationClimatological,
            'stationTelemetry' : this._stationTelemetry,
            'stationInitScale' : this._stationInitScale,
            'stationInitRegLevel' : this._stationInitRegLevel,
            'stationInitRegDesLiq' : this._stationInitRegDesLiq,
            'stationInitRegSed' : this._stationInitRegSed,
            'stationInitRegQual' : this._stationInitRegQual,
            'stationInitRegPluv' : this._stationInitRegPluv,
            'stationInitRegRain' : this._stationInitRegRain,
            'stationInitRegEvap' : this._stationInitRegEvap,
            'stationInitRegClim' : this._stationInitRegClim,
            'stationInitRegTele' : this._stationInitRegTele,
            'stationOperating' : this._stationOperating,
            'stationRegINC_TEL' : this._stationRegINC_TEL,
            'stationSediments' : this._stationSediments,
            'stationWaterQuality' : this._stationWaterQuality,
            'stationLiquidDischarge' : this._stationLiquidDischarge
          }
    }

  

}

export default Station;