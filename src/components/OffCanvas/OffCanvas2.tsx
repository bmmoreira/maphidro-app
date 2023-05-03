import Offcanvas from 'react-bootstrap/Offcanvas';
import './offcanvas.css';
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type StationData = {
  id: number;
  attributes: {
    stCode: string;
    stLongitude: number;
    stLatitude: number;
    stName: string;
    stUF: string;
  };
};

export type SearchData = {
  content?: boolean;
  loading?: boolean;
  stationData?: StationData[];
  value?: string;
};

type SidebarProps = {
  show: boolean;
  onHide(): void;
  /* basin: {
    id: number;
    bName: string;
  }; */
  searchData: SearchData;
  onSearchChangeHandler(e: { target: { value: string } }): void;
  flyTo(coord: [long: number, lat: number]): void;
  onToggleClusters: any;
  onToggleHMControls: any;
};

const SideBar2 = function (props: SidebarProps) {
  const { t } = useTranslation();

  /*   const [basinId,setBasinId] = useState(null);
  useEffect(() => {
    if (typeof props.basin !== 'undefined'){
      setBasinId(props.basin);
    } else {
      setBasinId(0);
    }
    setBasinId(props.basin);
    return () => {
    };
  }, [props]); */
  return (
    <>
      {' '}
      <div>
        <Offcanvas show={props.show} onHide={props.onHide} className={'main'}>
          <Offcanvas.Header closeButton style={{ paddingTop: '30px' }}>
            <Offcanvas.Title>{t('about_app')}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {t('intro_text')}
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Search for Stations</Accordion.Header>
                <Accordion.Body>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => props.onSearchChangeHandler(e)}
                    />
                  </InputGroup>{' '}
                  Stations List: {''}
                  <ul>
                    {props.searchData.content &&
                      props.searchData.stationData!.map((item, idx) => (
                        <li key={idx}>
                          <button
                            className="btn btn-default"
                            onClick={() => {
                              props.flyTo([
                                item.attributes.stLongitude,
                                item.attributes.stLatitude
                              ]);
                            }}>
                            <span className="font-search">
                              {item.attributes.stCode} - {item.attributes.stName} -{' '}
                              {item.attributes.stUF}
                            </span>
                          </button>
                        </li>
                      ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Precipitation Heatmap</Accordion.Header>
                <Accordion.Body>
                  <div>
                    Click on the button to check precipitation heatmap controls on the map from the
                    last days. The data is gathered from Grib2 format calibrated precipitation
                    IMERGE/GPM NASA Mission. Data is processed with GDAL/GMT Libraries.
                  </div>
                  <div
                    style={{
                      padding: '10px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                    <Button
                      variant="outline-primary"
                      style={{ margin: '5px' }}
                      onClick={props.onToggleHMControls}>
                      Precipitation HeatMap
                    </Button>
                    <Button
                      variant="outline-primary"
                      style={{ margin: '5px' }}
                      onClick={props.onToggleClusters}>
                      Turn on/off stations icons
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default SideBar2;
