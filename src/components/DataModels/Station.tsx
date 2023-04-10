import { getTextOfJSDocComment } from "typescript";

class Station {

    _id: string;
    _type: string;
    _stationName :string;
    _stationActive: boolean;
    _stationState: string;
    _stationCity: string;
    _coordinates;
    _latitude: number;
    _longitude: number;
    _stationBasin: string;
    _stationRiver: string;
    _stationEscale: boolean;
    _stationRegLevel: boolean;
    _stationEvaporimeter: boolean;
    _stationClimatological: boolean;
    _stationTelemetry: boolean;
    _stationInitScale: string;
    _stationInitRegLevel: string;
    _stationInitRegDesLiq: string;
    _stationInitRegSed: string;
    _stationInitRegQual: string;
    _stationInitRegPluv: string;
    _stationInitRegEvap: string;
    _stationInitRegClim: string;
    _stationInitRegTele: string;
    _stationOperating: boolean;
    _stationSediments: boolean;
    _stationWaterQuality?: boolean;
    _stationLiquidDischarge?: boolean;
    _stationAccountable: string; 
    _stationOperator: string;
    _stationPluviometer: boolean;
    _stationADren: string;
    
  
    _stationRegRain?: boolean;
    _stationInitRegRain?: string;
    _stationRegINC_TEL?: string;
    

    _faultDays?: number;
    _faultMonths?: number;

    constructor(obj:any) {
        this._id = obj.code;
        this._stationName = obj.name;
        this._stationOperator = obj.operator;
        this._type = obj.type;
        this._stationActive = obj.operating;
        this._stationAccountable = obj.accountable;
        this._stationState = obj.state;
        this._stationCity = obj.city;
        this._coordinates = [obj.longitude,obj.latitude];
        this._latitude = obj.latitude;
        this._longitude = obj.longitude;
        this._stationBasin = obj.basin;
        this._stationRiver = obj.river;
        this._stationADren = obj.areaDren;
        this._stationEscale = obj.scale;
        this._stationSediments = obj.sediments;
        this._stationWaterQuality = obj.waterQuality;
        this._stationLiquidDischarge = obj.liquidDischarge;
        this._stationRegLevel = obj.regLevel;
        this._stationPluviometer = obj.pluviometer;
        this._stationEvaporimeter = obj.evaporimeter;
        this._stationClimatological = obj.climatological;
        this._stationTelemetry = obj.telemetry;
        this._stationInitScale = obj.initScale;
        this._stationInitRegLevel = obj.initRegLevel;
        this._stationInitRegDesLiq = obj.initRegDesLiq;
        this._stationInitRegSed = obj.initRegSed;
        this._stationInitRegQual = obj.initRegQual;
        this._stationInitRegPluv = obj.initRegPluv;
        this._stationInitRegEvap = obj.initRegEvap;
        this._stationInitRegClim = obj.initRegClim;
        this._stationInitRegTele = obj.initRegTele;
        this._stationOperating = obj.operating;
        this._stationRegINC_TEL = obj.initRegTele;
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

    public getStationType(): string{
        return this._type;
    }

    public getStationId(): string{
        return this._id;
    }

    public getStationName(): string{
        return this._stationName;
    }

    public getStationOperator(): string{
        return this._stationOperator;
    }

    public getStationCity(): string{
        return this._stationCity;
    }

    public isStationActive(): boolean{
        return this._stationActive;
    }

    public getStationAccountable(): string{
        return this._stationAccountable;
    }

    public getStationState(): string{
        return this._stationState;
    }

    public getStationLatitude(): number{
        return this._latitude;
    }

    public getStationLongitude(): number{
        return this._longitude;
    }

    public getStationBasin(): string{
        return this._stationBasin;
    }

    public getStationRiver(): string{
        return this._stationRiver;
    }

    public hasEscale(): boolean{
        return this._stationEscale;
    }

    public hasRegLevel(): boolean{
        return this._stationRegLevel;
    }

    public hasEvaporimeter(): boolean{
        return this._stationEvaporimeter;
    }

    public hasClimatological(): boolean{
        return this._stationClimatological;
    }

    public hasTelemetry(): boolean{
        return this._stationTelemetry;
    }

    public getStationInitScale(): string{
        return this._stationInitScale;
    }

    public getStationInitRegLevel(): string{
        return this._stationInitRegLevel;
    }

    public getStationInitRegDesLiq(): string{
        return this._stationInitRegDesLiq;
    }

    public getStationInitRegSed(): string{
        return this._stationInitRegSed;
    }

    public getStationInitReqQual(): string{
        return this._stationInitRegQual;
    }

    public getStationInitRegPluv(): string{
        return this._stationInitRegPluv;
    }

    public getStationInitRegEvap(): string{
        return this._stationInitRegEvap;
    }

    public getStationInitRegClim(): string{
        return this._stationInitRegClim;
    }

    public getStationInitTele(): string{
        return this._stationInitRegTele;
    }

    public isOperating(): boolean{
        return this._stationOperating;
    }

    public hasSediments(): boolean{
        return this._stationSediments;
    }

    public hasWaterQuality(): boolean| undefined{
        return this._stationWaterQuality;
    }

    public hasLiquidDischarge(): boolean | undefined{
        return this._stationLiquidDischarge;
    }

    public hasPluviometer(): boolean {
        return this._stationPluviometer;
    }

    public getStationADren(): string{
        return this._stationADren;
    }

    public hasRegRain(): boolean | undefined{
        return this._stationRegRain
    }

    public getStationInitRegRain(): string | undefined{
        return this._stationInitRegRain;
    }

    public getStationRegINC_TEL(): string | undefined{
        return this._stationRegINC_TEL;
    }

    public getStationFaultDays(): number | undefined{
        return this._faultDays;
    }

    public getStationFaultMonths(): number | undefined{
        return this._faultMonths;
    }


}

export default Station;