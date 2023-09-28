import React, { useContext } from 'react';
import './hidrodata.css';
import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import Station from '../DataModels/Station4';
import StateContext from '../../StateContext';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Item } from '../Utils/sytles';

interface StationInfoProps {
  dataLoad: boolean;
  sInfo: Station | undefined;
}

const StationInfoGrid = function (props: StationInfoProps) {
  const appState = useContext(StateContext);

  const { t } = useTranslation();

  return (
    <div className="hidro-wrap">
      <Box sx={{ flexGrow: 1, minWidth: 250 }}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Item>Basin:</Item>
          </Grid>
          <Grid item xs={10}>
            <Item>{appState.stationData.basin}</Item>
          </Grid>
        </Grid>
        <Table responsive striped bordered hover size="sm">
          <tbody>
            <tr>
              <td style={{ width: '20%' }}>
                <span>{t('name')}:</span>
              </td>
              <td colSpan={3}>{appState.stationData.stName}</td>
            </tr>
            <tr>
              <td>
                <span>{t('scope')}:</span>
              </td>
              <td colSpan={3}>{appState.stationData.stBasin}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <span>{t('longitude_latitude')}: </span>{' '}
                {appState.stationData.stLongitude.toFixed(5)}/
                {appState.stationData.stLatitude.toFixed(5)}
              </td>
            </tr>
            <tr>
              <td>
                <span>{t('code')}:</span>
              </td>
              <td>{appState.stationData.stCode}</td>
              <td style={{ width: '20%' }}>
                <span>{t('type')}:</span>
              </td>
              <td>
                {appState.stationData.stType === 'Pluviométrica'
                  ? t('pluviometric')
                  : t('fluviometric')}
              </td>
            </tr>
            <tr>
              <td>
                <span>{t('city')}:</span>
              </td>
              <td>{appState.stationData.stCounty}</td>
              <td>
                <span>{t('country_state')}:</span>
              </td>
              <td>{appState.stationData.stUF}</td>
            </tr>
            <tr>
              <td>
                <span>{t('operator')}:</span>
              </td>
              <td>{appState.stationData.stOperator}</td>
              <td>
                <span>{t('responsible')}:</span>
              </td>
              <td>{appState.stationData.stAccountable}</td>
            </tr>
            <tr>
              <td>
                <span>{t('escale')}:</span>
              </td>
              <td>{appState.stationData.stScale == true ? t('yes') : t('no')}</td>
              <td>
                <span>{t('climatological')}:</span>
              </td>
              <td>{appState.stationData.stClimatological == true ? t('yes') : t('no')}</td>
            </tr>
            <tr>
              <td>
                <span>{t('evaporimeter')}:</span>
              </td>
              <td>{appState.stationData.stEvaporimeter == true ? t('yes') : t('no')}</td>
              <td>
                <span>{t('telemetry')}:</span>
              </td>
              <td>{appState.stationData.stTelemetry == true ? t('yes') : t('no')}</td>
            </tr>
            <tr>
              <td>
                <span>{t('water_quality')}:</span>
              </td>
              <td>{appState.stationData.stWaterQuality == true ? t('yes') : t('no')}</td>
              <td>
                <span>{t('sediments')}:</span>
              </td>
              <td>{appState.stationData.stSediments == 'Sim' ? t('yes') : t('no')}</td>
            </tr>
          </tbody>
        </Table>
      </Box>
    </div>
  );
};

export default StationInfoGrid;
