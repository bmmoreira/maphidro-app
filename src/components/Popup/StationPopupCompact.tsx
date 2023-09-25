import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';

export type StationObject = {
  name: string;
  code: string;
  id: string;
  type: string;
  longitude: number;
  latitude: number;
  operator: string;
  uf: string;
};

type StPopupProp = {
  stationObj: StationObject;
  getData(id: string, uf: string): void;
};

const StationPopupCompact = (props: StPopupProp) => {
  const { t } = useTranslation();

  return (
    <div style={{ margin: '0px', padding: '0px' }}>
      <div className="table-responsive" style={{ margin: '0px', padding: '0px' }}>
        <table
          className="table table-striped"
          style={{ marginTop: '0px', marginBottom: '0px', padding: '0px' }}>
          <thead>
            <tr>
              <th scope="row">{t('name')}</th>
              <td>{props.stationObj.name.substring(0, 11)}..</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>
                <Button
                  className="data-button"
                  onClick={() => props.getData(props.stationObj.code, props.stationObj.uf)}>
                  {t('rain_data')}
                </Button>
              </td>
            </tr>

            <tr>
              <th scope="row">Lat/Lon</th>
              <td>
                {props.stationObj.latitude.toFixed(4)}/{props.stationObj.longitude.toFixed(4)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StationPopupCompact;
