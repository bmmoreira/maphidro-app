import React, { useEffect, useRef, useState, useReducer, useContext } from 'react';
import * as ReactDOMClient from 'react-dom/client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import maplibregl, { LayerSpecification, LngLatLike } from '!maplibre-gl';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import maplibreglWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
maplibregl.workerClass = maplibreglWorker;

import { useImmerReducer } from 'use-immer';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import './map.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import waterIcon from '../../images/waterdrop.png';
import riverIcon from '../../images/river-station.png';
import LayersToast from '../Toasts/LayersToast';
import Spinner from 'react-bootstrap/Spinner';
import SearchToast, { SearchData } from '../Toasts/SearchToast';
import Legends from '../Toasts/Legends';
import AnimToast from '../Toasts/AnimToast';
import PlayerToast from '../Toasts/PlayerToast';
import {
  toggleClustersLayer,
  toggleMapLayers,
  clusters,
  clusterCount,
  unclusteredPoint,
  addRasterLayer
} from './mapLayers';
import axios from 'axios';
import ReactDOM from 'react-dom';

import StationPopup, { StationObject } from '../Popup/StationPopup';
import Station from '../DataModels/Station4';
import { API_URL_STATIONS } from '../../utils/constants';
import * as turf from '@turf/turf';
import SideBar from '../../components/OffCanvas/OffCanvas2';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import LayersIcon from '@mui/icons-material/Layers';
import SatelliteIcon from '@mui/icons-material/Satellite';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import RoomIcon from '@mui/icons-material/Room';
import { grey } from '@mui/material/colors';
import RiverPopup from '../Popup/RiverPopup';
import { Basin } from '../../App';

interface MaplibreMapProps {
  initialOptions?: Omit<maplibregl.MapOptions, 'container' | 'style'>;
  onCreated?(map: maplibregl.Map): void;
  onLoaded(map: maplibregl.Map): void;
  onRemoved?(): void;
  showModalChart(sObj: Station): void;
  drawerClickHandler(layerBasin: Basin): void;
  setOffCanvas(open: boolean): void;
  offCanvas: boolean;
}

function Map(props: MaplibreMapProps) {
  const rootRef = React.useRef(null);
  const appDispatch = useContext(DispatchContext);

  if (process.env.REACT_APP_API_KEY == null) {
    throw new Error('You have to configure env REACT_APP_API_KEY, see README');
  }

  // this is where the map instance will be stored after initialization
  const [map, setMap] = useState<maplibregl.Map>();
  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const popUpRef = useRef(
    new maplibregl.Popup({
      offset: 15,
      closeButton: false,
      closeOnClick: true,
      closeOnMove: true,
      maxWidth: 'auto'
    })
  );

  const riverPopUpRef = useRef(
    new maplibregl.Popup({
      offset: 15,
      closeButton: false,
      closeOnClick: true,
      closeOnMove: true,
      maxWidth: 'auto',
      className: 'riverPopup'
    })
  );

  const [hoveredStateId, setHoveredStateId] = useState(0);

  // turn off bottom bar
  const [bottomBar, setBottomBar] = useState(true);
  const toggleBottomBar = () => {
    setBottomBar((prevState) => {
      return !prevState;
    });
  };

  // toggle on/off cluster icons
  const toggleClusters = () => {
    toggleClustersLayer(map!);
  };

  const [showLayerToast, toggleLayerToast] = useState(false);
  const toggleLc = () => {
    toggleLayerToast((prevState) => {
      return !prevState;
    });
  };

  const [spinner, setSpinner] = useState(false);
  const toggleSpinner = () => {
    setSpinner((prevState) => {
      return !prevState;
    });
  };

  const [layers, setLayers] = useState([
    { layerId: 'bacias', name: 'Bacias Brasil', checked: false, added: false },
    { layerId: 'rivers', name: 'Rios Principais', checked: false, added: false },
    { layerId: 'bacias2', name: 'Bacias A. do Sul', checked: false, added: false }
  ]);

  const layersHandleChange = (layerId: string) => {
    console.log(layerId);

    const copyLayers = [...layers];
    const modifiedLayers = copyLayers.map((layer) => {
      if (layerId === layer.layerId) {
        layer.checked = !layer.checked;
        toggleMapLayers(layer, map as maplibregl.Map, toggleSpinner, stopSpinner);
        if (!layer.added) {
          layer.added = true;
        }
      }
      return layer;
    });

    setLayers(modifiedLayers);
  };

  const [searchValue, setSearchValue] = useState<SearchData>({
    stationData: [],
    loading: false,
    value: '',
    content: false
  });

  const [showSearchToast, toggleSearch] = useState(false);
  const toggleSearchToast = () => {
    toggleSearch((prevState) => {
      return !prevState;
    });
  };

  const search = async (val: string) => {
    setSearchValue({ loading: true });
    /*  const res = await axios(
      `http://localhost:1337/api/stations?filters[stName][$contains]=${val.toUpperCase()}`
    ); */
    const res = await axios(
      `https://api.maphidro.info/api/stations?filters[stName][$contains]=${val.toUpperCase()}`
    );
    const stationData = await res.data.data;
    if (stationData.length > 0) {
      setSearchValue({ stationData, loading: false, content: true });
    } else {
      setSearchValue({ stationData, loading: false, content: false });
    }
  };

  const searchChangeHandler = async (e: { target: { value: string } }) => {
    search(e.target.value);
    setSearchValue({ value: e.target.value });
  };

  const flyToStation = (coord: number[]) => {
    map!.flyTo({
      center: [coord[0], coord[1]], // Fly to the selected target
      duration: 6000, // Animate over 6 seconds
      essential: true, // This animation is considered essential with
      zoom: 12
      //respect to prefers-reduced-motion
    });
  };

  function stopSpinner(e: { target: { loaded: () => any } }): void {
    if (e.target && e.target.loaded()) {
      setSpinner(false);

      map?.off('render', stopSpinner);
    }
  }

  // Satellite HeatMap Toast

  const [showSatMsg, toggleShowAn] = useState(false);
  const toggleSatMsg = () => {
    toggleShowAn((prevState) => {
      return !prevState;
    });
  };

  const [showSatToasts, toggleSatToast] = useState(false);

  const toggleSat = () => {
    if (!showSatToasts && !showSatMsg) {
      toggleSatMsg();
    }

    if (map != undefined) {
      const satVisibility = map.getLayoutProperty('radar-layer', 'visibility');

      if (satVisibility === 'visible') {
        map.setLayoutProperty('radar-layer', 'visibility', 'none');
        toggleSatToast(false);
      } else {
        map.setLayoutProperty('radar-layer', 'visibility', 'visible');

        const clusterVisibility = map.getLayoutProperty('cluster-count', 'visibility');

        if (clusterVisibility === 'visible') {
          map.setLayoutProperty('clusters', 'visibility', 'none');
          map.setLayoutProperty('cluster-count', 'visibility', 'none');
          map.setLayoutProperty('unclustered-point', 'visibility', 'none');
        }
        toggleSatToast(true);
      }
    }
  };

  useEffect(() => {
    const node = mapContainerRef.current;
    if (typeof window === 'undefined' || node === null) return;

    let stateId = hoveredStateId;

    const mapLibre = new maplibregl.Map({
      container: node,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_API_KEY}`,
      //center: [-58.59, -13.91],
      //zoom: 4.1,
      ...props.initialOptions
    });

    mapLibre.addControl(new maplibregl.NavigationControl({}), 'top-right');
    mapLibre.addControl(new maplibregl.FullscreenControl({}));
    //map.addControl(myCustomControl, 'top-left');
    mapLibre.addControl(
      new maplibregl.ScaleControl({
        maxWidth: 200,
        unit: 'metric'
      }),
      'top-left'
    );

    mapLibre.on('load', function () {
      addRasterLayer(mapLibre);

      mapLibre.loadImage(waterIcon, (error: any, image: HTMLImageElement) => {
        if (error) throw error;
        mapLibre.addImage('pluv', image as HTMLImageElement);
      });
      mapLibre.loadImage(riverIcon, (error: any, image: HTMLImageElement) => {
        if (error) throw error;
        mapLibre.addImage('fluv', image as HTMLImageElement);
      });

      mapLibre.addSource('empty', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      const zIndex2 = mapLibre.addLayer({
        id: 'z-index-2',
        type: 'symbol',
        source: 'empty'
      });

      const zIndex1 = mapLibre.addLayer(
        {
          id: 'z-index-1',
          type: 'symbol',
          source: 'empty'
        },
        'z-index-2'
      ); // place this layer below zIndex2

      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      mapLibre.addSource('stationIcons', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ stationIcons
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: './data/geojson/rhn-new3.geojson',
        cluster: true,
        clusterMaxZoom: 5, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      mapLibre.addLayer(clusters as LayerSpecification, 'z-index-2');

      mapLibre.addLayer(clusterCount as LayerSpecification, 'z-index-2');

      mapLibre.addLayer(unclusteredPoint as LayerSpecification, 'z-index-2');
    }); // end map on load

    // inspect a cluster on click
    mapLibre.on('click', 'clusters', function (e: { point: any }) {
      const features = mapLibre.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });

      const clusterId = features[0].properties.cluster_id;
      const source: maplibregl.GeoJSONSource = mapLibre.getSource(
        'stationIcons'
      ) as maplibregl.GeoJSONSource;
      source.getClusterExpansionZoom(clusterId, function (err: any, zoom: number) {
        if (err) return;

        if ((zoom as number) >= 6) {
          //props.drawerClickHandler();
        }
        if (features[0].geometry.type === 'Point') {
          mapLibre.easeTo({
            center: features[0].geometry.coordinates as LngLatLike,
            zoom: zoom as number
          });
        }
      });
    }); // map on cluster click

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    mapLibre.on('click', 'unclustered-point', function (e: any) {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const stationJSON: StationObject = {
        name: e.features[0].properties.name,
        code: e.features[0].properties.code,
        id: e.features[0].properties.id,
        type: e.features[0].properties.stType,
        longitude: parseFloat(e.features[0].geometry.coordinates[0]),
        latitude: parseFloat(e.features[0].geometry.coordinates[1]),
        operator: e.features[0].properties.operator,
        uf: e.features[0].properties.state
      };
      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //getLocData(stationJSON.code, stationJSON.uf);
      //getSatData(stationJSON.code, stationJSON.uf);

      /*       const reactRoot = ReactDOM.createRoot(node);
      reactRoot.render(
        <div>
          <StationPopup stationObj={stationJSON} getData={getStationData} />
        </div>
      ); */

      const popupNode = document.createElement('div');
      ReactDOM.render(
        <StationPopup stationObj={stationJSON} getData={getStationData} />,
        popupNode
      );
      popUpRef.current.setLngLat(coordinates).setDOMContent(popupNode).addTo(mapLibre);
      //popUpRef.current.setLngLat(coordinates).setHTML('<div>'+ teste +'</div>').addTo(mapLibre);
    }); // map on click

    mapLibre.on('mouseenter', 'clusters', function () {
      mapLibre.getCanvas().style.cursor = 'pointer';
    });

    mapLibre.on('mouseleave', 'clusters', function () {
      mapLibre.getCanvas().style.cursor = '';
    });

    //let popupRiver;
    mapLibre.on('mouseenter', 'rivers', function (e: any) {
      mapLibre.getCanvas().style.cursor = 'pointer';
      const coordinates = e.features[0].geometry.coordinates.slice();

      console.log(coordinates[0] + ' ' + coordinates[0]);
      const riverName = e.features[0].properties.NAME;
      const extension = e.features[0].properties.KILOMETERS;
      const system = e.features[0].properties.SYSTEM;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      const riverObj = {
        riverName: riverName,
        extension: extension,
        system: system
      };
      /*      popupRiver = new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`<h2>Rivers</h2>Name: ${name}<br/>Area: ${system}<br/>KM: ${extension}<br/>`)
      .addTo(map); */

      /*       const riverPopupNode = document.createElement("div");
      ReactDOM.render(
        <RiverPopup
          info={riverObj}
        />,
        riverPopupNode
      );
    
        if (!riverPopUpRef.current.isOpen()) {
          riverPopUpRef.current
        .setLngLat(e.lngLat)
        .setDOMContent(riverPopupNode)
        .addTo(mapLibre);
      } else {
        riverPopUpRef.current.remove();
      } */
    });

    mapLibre.on('mousemove', 'bacias-fills', function (e: any) {
      if (e.features.length > 0) {
        if (stateId !== null) {
          mapLibre.setFeatureState({ source: 'bacias', id: stateId }, { hover: false });
        }
        stateId = parseInt(e.features[0].id);
        setHoveredStateId(stateId);

        //setBaciaName(e.features[0].properties.bacia);
        mapLibre.setFeatureState({ source: 'bacias', id: stateId }, { hover: true });
      }
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    mapLibre.on('mouseleave', 'bacias-fills', function () {
      if (stateId !== null) {
        mapLibre.setFeatureState({ source: 'bacias', id: stateId }, { hover: false });
      }
      //stateId = 0;
      setHoveredStateId(0);
    });

    mapLibre.on('click', 'bacias-fills', function (e: any) {
      if (e.features.length > 0) {
        const bId = e.features[0].id;
        const bName = e.features[0].properties.DNS_NM;
        const coordinates = e.features[0].geometry.coordinates;
        //console.log(coordinates);
        const line = turf.multiLineString(coordinates);
        const enveloped = turf.envelope(line);

        mapLibre.fitBounds(
          [
            [enveloped!.bbox![0], enveloped!.bbox![1]], // southwestern corner of the bounds
            [enveloped!.bbox![2], enveloped!.bbox![3]] // northeastern corner of the bounds
          ],
          { padding: 100 }
        );
        const layerState: Basin = { id: parseInt(bId), bName: bName };
        props.drawerClickHandler(layerState);
      }
    });

    // save the map object to React.useState
    setMap(mapLibre);

    if (props.onCreated) props.onCreated(mapLibre);

    // if onMapLoaded is specified it will be called once
    // by "load" map event
    if (props.onLoaded) mapLibre.once('load', () => props.onLoaded(mapLibre));
    // removing map object and calling onMapRemoved callback
    // when component will unmout
    return () => {
      mapLibre.remove();
      setMap(undefined);
      if (props.onRemoved) props.onRemoved();
    };
  }, []);

  async function getStationData(id: string, uf: string) {
    try {
      const sId = String(id).padStart(8, '0');

      const [stData, stLocData, stSatData] = await Promise.all([
        axios.get(`/data/stations/stations-${uf}.json`),
        axios.get(`data/BR/${uf}/chuvas_L${sId}.json`),
        axios.get(`data/BR/${uf}/chuvas_S${sId}.json`)
      ]);

      /*    const res = await axios({
        method: 'get',
        url: `/data/stations/stations-${uf}.json`
      }); */
      const ufStations = stData.data.stations;
      let st: any;

      ufStations.forEach((item: any) => {
        if (item._id == id) {
          st = item;
        }
      });

      appDispatch({
        type: 'loadData',
        infoValue: st,
        locValue: stLocData.data,
        satValue: stSatData.data._satData,
        locDataloaded: stLocData.data != null,
        satDataloaded: stSatData.data._satData != null
      });

      /*       appDispatch({
        type: 'loadStation',
        value: st
      });

      appDispatch({
        type: 'loadLocal',
        value: stLocData.data,
        loaded: true
      });

      appDispatch({
        type: 'loadSat',
        value: stSatData.data._satData,
        loaded: true
      }); */
      //const sObj = new Station(res.data.data.attributes);
      //show Station Modal;
      props.showModalChart(new Station(st));
    } catch (error: any) {
      if (error.response) {
        // Request made and server responded
        console.log('axios error response:' + error.response.data);
        //console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      return error.response.data;
    }
  }

  const getLocData = async (id: string, uf: string) => {
    try {
      const sId = String(id).padStart(8, '0');

      console.log(id + ' ' + uf);
      const response = await axios.get(`data/BR/${uf}/chuvas_L${sId}.json`).then((response) => {
        appDispatch({
          type: 'loadLocal',
          value: response.data,
          loaded: true
        });
      });
    } catch (error: any) {
      console.log('Map-getLocData-error: ' + error.message);
    }
  };

  const getSatData = async (id: string, uf: string) => {
    try {
      const sId = String(id).padStart(8, '0');

      console.log(id + ' ' + uf);
      const response = await axios.get(`data/BR/${uf}/chuvas_S${sId}.json`).then((response) => {
        appDispatch({
          type: 'loadSat',
          value: response.data._satData,
          loaded: true
        });
      });
    } catch (error: any) {
      console.log('Map-getLocData-error: ' + error.message);
    }
  };

  const [value, setValue] = React.useState(0);

  return (
    <div ref={rootRef} className="map-wrap">
      <div ref={mapContainerRef} className="map">
        {spinner && (
          <Spinner animation="border" role="status" className="spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        <SideBar
          show={props.offCanvas}
          onHide={() => props.setOffCanvas(false)}
          //basin={basin}
          onSearchChangeHandler={searchChangeHandler}
          searchData={searchValue}
          flyTo={flyToStation}
          onToggleClusters={toggleClusters}
          onToggleHMControls={toggleSat}
        />

        <LayersToast
          showLc={showLayerToast}
          toggleLc={toggleLc}
          layers={layers}
          onLayersHandleChange={layersHandleChange}
          position={'bottom-start'}
        />

        <SearchToast
          toggleSb={toggleSearchToast}
          showSb={showSearchToast}
          onSearchChangeHandler={searchChangeHandler}
          searchData={searchValue}
          flyTo={flyToStation}
          position={'bottom-start'}
        />

        <Legends toggleLg={toggleSat} showLg={showSatToasts} position={'bottom-end'} />
        <AnimToast toggleAn={toggleSatMsg} showAn={showSatMsg} position={'middle-center'} />
        <PlayerToast
          mapref={map}
          showAc={showSatToasts}
          toggleAc={toggleSat}
          position={'bottom-start'}
        />

        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{
            bottom: '0px',
            left: '0px!',
            width: '100%',
            zIndex: '3',
            position: 'fixed',
            backgroundColor: '#3887be'
          }}
          sx={{
            '& .Mui-selected, .Mui-selected > svg': {
              color: '#FFFFFF'
            }
          }}>
          <BottomNavigationAction
            sx={{ color: grey[50] }}
            onClick={toggleSearchToast}
            label="Search"
            icon={<ImageSearchIcon />}
          />
          <BottomNavigationAction
            sx={{ color: grey[50] }}
            onClick={toggleSat}
            label="Satellite"
            icon={<SatelliteIcon />}
          />
          <BottomNavigationAction
            sx={{ color: grey[50] }}
            onClick={toggleClusters}
            label="Stations"
            icon={<RoomIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default Map;
