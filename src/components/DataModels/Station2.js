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

    _faultDays;
    _faultMonths;

    constructor(obj) {
        this._id = obj.properties.Código;
        this._stationName = obj.properties.Estação;
        this._stationOperator = obj.properties.Operadora;
        this._type = obj.properties.Tipo;
        this._stationStart = obj.properties.TelemIní; 
        this._stationActive = obj.properties.Operando;
        this._stationAccountable = obj.properties.Responsáv;
        this._stationState = obj.properties.Estado;
        this._stationCity = obj.properties.Município;
        this._coordinates = obj.geometry.coordinates.slice();
        this._latitude = obj.geometry.coordinates[1];
        this._longitude = obj.geometry.coordinates[0];
        this._stationBasin = obj.properties.Bacia;
        this._stationRiver = obj.properties.Rio;
        this._stationADren = obj.properties.areadrenk;
        this._stationEscale = obj.properties.Escala;
        this._stationSediments = obj.properties.Sedimentos;
        this._stationWaterQuality = obj.properties.qualidadea;
        this._stationLiquidDischarge = obj.properties.descargliq;
        this._stationRegLevel = obj.properties.registnive;
        this._stationDischarge = obj.properties.descargliq;
        this._stationWQuality = obj.properties.qualidadea;
        this._stationPluviometer = obj.properties.Pluviômet;
        this._stationRegRain = obj.properties.registrchu;
        this._stationEvaporimeter = obj.properties.Evaporimé;
        this._stationClimatological = obj.properties.Climatoló;
        this._stationTelemetry = obj.properties.Telemétri;
        this._stationInitScale = obj.properties.inicescala;
        this._stationInitRegLevel = obj.properties.inregtnive;
        this._stationInitRegDesLiq = obj.properties.inidescliq;
        this._stationInitRegSed = obj.properties.sedinicio;
        this._stationInitRegQual = obj.properties.iniqualida;
        this._stationInitRegPluv = obj.properties.inicpluvio;
        this._stationInitRegRain = obj.properties.iniregchuv;
        this._stationInitRegEvap = obj.properties.EvaporIní;
        this._stationInitRegClim = obj.properties.ClimatIní;
        this._stationInitRegTele = obj.properties.TelemIní;
        this._stationOperating = obj.properties.Operando;
        this._stationRegINC_TEL = obj.properties.INIC_TEL;
        }
     
    
    getStationObj(){
        return {
            'type': this._type,
            'id': this._id,
            'stationName': this._stationName,
            'stationStart': this._stationStart,
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
            'stationEvaporimeter' : this._stationDischarge,
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