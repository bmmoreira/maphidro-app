import React from 'react';
import './hidrodata.css';
import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import Station from '../DataModels/Station4';

interface StationInfoProps {
  dataLoad: boolean;
  sInfo: Station | undefined;
}

const StationInfo = function (props: StationInfoProps) {
  const { t } = useTranslation();

  return (
    <div className="hidro-wrap">
      <div className="station-details">
        <Table responsive striped bordered hover size="sm">
          <tbody>
            <tr>
              <td style={{ width: '20%' }}>
                <span>{t('name')}:</span>
              </td>
              <td colSpan={3}>{props.dataLoad && props.sInfo!._stationName}</td>
            </tr>
            <tr>
              <td>
                <span>{t('scope')}:</span>
              </td>
              <td colSpan={3}>{props.dataLoad && props.sInfo!._stationBasin}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <span>{t('longitude_latitude')}: </span>{' '}
                {props.dataLoad && props.sInfo!._longitude.toFixed(5)}/
                {props.dataLoad && props.sInfo!._latitude.toFixed(5)}
              </td>
            </tr>
            <tr>
              <td>
                <span>{t('code')}:</span>
              </td>
              <td>{props.dataLoad && props.sInfo!._id}</td>
              <td style={{ width: '20%' }}>
                <span>{t('type')}:</span>
              </td>
              <td>
                {props.dataLoad && props.sInfo!._type === 'Pluviométrica'
                  ? t('pluviometric')
                  : t('fluviometric')}
              </td>
            </tr>
            <tr>
              <td>
                <span>{t('city')}:</span>
              </td>
              <td>{props.dataLoad && props.sInfo!._stationCity}</td>
              <td>
                <span>{t('country_state')}:</span>
              </td>
              <td>{props.dataLoad && props.sInfo!._stationState}</td>
            </tr>
            <tr>
              <td>
                <span>{t('operator')}:</span>
              </td>
              <td>{props.dataLoad && props.sInfo!._stationOperator}</td>
              <td>
                <span>{t('responsible')}:</span>
              </td>
              <td>{props.dataLoad && props.sInfo!._stationAccountable}</td>
            </tr>
            <tr>
              <td>
                <span>{t('escale')}:</span>
              </td>
              <td>{props.dataLoad && props.sInfo!._stationEscale == 'Sim' ? t('yes') : t('no')}</td>
              <td>
                <span>{t('climatological')}:</span>
              </td>
              <td>
                {props.dataLoad && props.sInfo!._stationClimatological == 'Sim'
                  ? t('yes')
                  : t('no')}
              </td>
            </tr>
            <tr>
              <td>
                <span>{t('evaporimeter')}:</span>
              </td>
              <td>
                {props.dataLoad && props.sInfo!._stationEvaporimeter == 'Sim' ? t('yes') : t('no')}
              </td>
              <td>
                <span>{t('telemetry')}:</span>
              </td>
              <td>
                {props.dataLoad && props.sInfo!._stationTelemetry == 'Sim' ? t('yes') : t('no')}
              </td>
            </tr>
            <tr>
              <td>
                <span>{t('water_quality')}:</span>
              </td>
              <td>
                {props.dataLoad && props.sInfo!._stationWaterQuality == 'Sim' ? t('yes') : t('no')}
              </td>
              <td>
                <span>{t('sediments')}:</span>
              </td>
              <td>
                {props.dataLoad && props.sInfo!._stationSediments == 'Sim' ? t('yes') : t('no')}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default StationInfo;
