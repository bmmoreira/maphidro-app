class StationInfo {
  constructor(apiData) {
    this.stCode = apiData.stCode;
    this.stType = apiData.stType;
    this.stName = apiData.stName;
    this.stAccountable = apiData.stAccountable;
    this.stOperator = apiData.stOperator;
    this.stUF = apiData.stUF;
    this.stCounty = apiData.stCounty;
    this.stLatitude = apiData.stLatitude;
    this.stLongitude = apiData.stLongitude;
    this.stFaultDays = apiData.stFaultDays;
    this.stFaultMonths = apiData.stFaultMonths;
    this.stBasin = apiData.stBasin;
    this.stRiver = apiData.stRiver;
    this.stADren = apiData.stADren;
    this.stEscale = apiData.stEscale;
    this.stRegLevel = apiData.stRegLevel;
    this.stLiqDischarge = apiData.stLiqDischarge;
    this.stPluviometer = apiData.stPluviometer;
    this.stEvaporimeter = apiData.stEvaporimeter;
    this.stClimatological = apiData.stClimatological;
    this.stTelemetry = apiData.stTelemetry;
    this.stInitScale = apiData.stInitScale;
    this.stInitRegLevel = apiData.stInitRegLevel;
    this.stInitRegDesLiq = apiData.stInitRegDesLiq;
    this.stInitRegSed = apiData.stInitRegSed;
    this.stInitRegQual = apiData.stInitRegQual;
    this.stInitRegPluv = apiData.stInitRegPluv;
    this.stInitRegRain = apiData.stInitRegRain;
    this.stInitRegEvap = apiData.stInitRegEvap;
    this.stInitRegClim = apiData.stInitRegClim;
    this.stInitRegTele = apiData.stInitRegTele;
    this.stOperating = apiData.stOperating;
    this.stRegINC_TEL = apiData.stRegINC_TEL;
    this.stSediments = apiData.stSediments;
    this.stWaterQuality = apiData.stWaterQuality;
    this.stSatInit = apiData.satdata._satData._initRegisterTime;
    this.stLocInit = apiData.raindata._initRegisterTime;
    this.stSatLast = apiData.satdata._satData._lastRegisterTime;
    this.stLocLast = apiData.raindata._lastRegisterTime;
  }
}

export default StationInfo;
