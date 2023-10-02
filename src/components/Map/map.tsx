import React, { useEffect, useRef, useState, useReducer, useContext } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import LoadingDotsIcon from '../pages/LoadingDotsIcon';
import PanelModals from '../Modals/PanelModals';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import maplibregl, { LayerSpecification, LngLatLike } from '!maplibre-gl';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import maplibreglWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
maplibregl.workerClass = maplibreglWorker;

import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import './map.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import waterIcon from '../../images/waterdrop.png';
//import riverIcon from '../../images/river-station.png';

import SearchToast, { SearchData } from '../Toasts/SearchToast';

import { cloneDeep, groupBy } from 'lodash';

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
import StationPopupCompact from '../Popup/StationPopupCompact';

import Station from '../DataModels/Station4';
import { API_URL_STATIONS } from '../../utils/constants';
import * as turf from '@turf/turf';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Basin, layerType } from '../Utils/types';
import { BASE_URL, COLLECTION_NAME } from '../Utils/constants';
import MobileResults from '../Modals/MobileResults';
import Footer from '../pages/Footer';
import useWindowDimensions from '../Utils/useWindowDimensions.js';
import FullScreenDialog from '../Modals/FullScreenDialog';
import HelpDialog from '../Modals/HelpDialog';
import SettingsDialog from '../Modals/SettingsDialog';
import SelectDialog from '../Modals/SelectDialog';

interface MaplibreMapProps {
  initialOptions?: Omit<maplibregl.MapOptions, 'container' | 'style'>;
  onCreated?(map: maplibregl.Map): void;
  onLoaded(map: maplibregl.Map): void;
  onRemoved?(): void;
  showModalChart(sObj: Station): void;

  setOffCanvas(open: boolean): void;
  offCanvas: boolean;
}

function Map(props: MaplibreMapProps) {
  const { height, width } = useWindowDimensions();
  const rootRef = React.useRef(null);
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const [isLoading, setIsLoading] = useState(true);

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

  // toggle on/off cluster icons
  const toggleClusters = () => {
    toggleClustersLayer(map!);
  };

  const [spinner, setSpinner] = useState(false);
  const toggleSpinner = () => {
    setSpinner((prevState) => {
      return !prevState;
    });
  };

  const layersHandleChange = (layerId: string) => {
    console.log(layerId);

    /* If I fired a state setting function it would happen on re-render
     (firing an onClick function), but not if I loaded the page directly 
      or via refresh. Making a copy of the non editable, or in my case 
      "frozen" object before modifying parameters fixed the problem
    */
    let counter = cloneDeep(appState.header.counterSelect);
    const heatmapControls = cloneDeep(appState.modals.heatmapControls);
    const layers = cloneDeep(appState.mapLayers);
    const modifiedLayers = layers.map((layer: any) => {
      if (layerId === layer.layerId) {
        layer.checked = !layer.checked;
        if (!layer.checked) {
          appDispatch({
            type: 'counterSelect',
            value: --counter
          });
        } else {
          appDispatch({
            type: 'counterSelect',
            value: ++counter
          });
        }
        if (layer.layerId == 'clusters') {
          toggleClusters();
        } else if (layer.layerId == 'heatmapRain') {
          toggleSat();
          appDispatch({
            type: 'togleHeatmapControl',
            value: !heatmapControls
          });
          console.log('teste');
        } else {
          toggleMapLayers(layer as layerType, map as maplibregl.Map, toggleSpinner, stopSpinner);
        }
        if (!layer.added) {
          layer.added = true;
        }
      }
      return layer;
    });

    //setLayers(modifiedLayers);
    appDispatch({
      type: 'setMapLayers',
      value: modifiedLayers
    });
  };

  const [searchValue, setSearchValue] = useState<SearchData>({
    stationData: [],
    loading: false,
    value: '',
    content: false
  });

  const search = async (val: string) => {
    setSearchValue({ loading: true });

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

  const toggleSat = () => {
    if (map != undefined) {
      const satVisibility = map.getLayoutProperty('heatmapRain', 'visibility');

      if (satVisibility === 'visible') {
        map.setLayoutProperty('heatmapRain', 'visibility', 'none');
      } else {
        map.setLayoutProperty('heatmapRain', 'visibility', 'visible');

        //toggleClustersLayer(map!);
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
      /*       mapLibre.loadImage(riverIcon, (error: any, image: HTMLImageElement) => {
        if (error) throw error;
        mapLibre.addImage('fluv', image as HTMLImageElement);
      }); */

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
        data: './data/geojson/rhn-CPRM.geojson',
        cluster: true,
        clusterMaxZoom: 4, // Max zoom to cluster points on
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
        type: e.features[0].properties.type,
        longitude: parseFloat(e.features[0].geometry.coordinates[0]),
        latitude: parseFloat(e.features[0].geometry.coordinates[1]),
        operator: e.features[0].properties.operator,
        uf: e.features[0].properties.uf
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
      if (height < 800) {
        ReactDOM.render(
          <StationPopupCompact stationObj={stationJSON} getData={getStationData} />,
          popupNode
        );
      } else {
        ReactDOM.render(
          <StationPopup stationObj={stationJSON} getData={getStationData} />,
          popupNode
        );
      }

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
        //props.drawerClickHandler(layerState);
      }
    });

    // save the map object to React.useState
    setMap(mapLibre);
    appDispatch({
      type: 'setMapref',
      value: mapLibre
    });

    if (props.onCreated) props.onCreated(mapLibre);

    // if onMapLoaded is specified it will be called once
    // by "load" map event
    if (props.onLoaded) mapLibre.once('load', () => props.onLoaded(mapLibre));

    mapLibre.on('idle', (e: any) => {
      // do things every time the map idles
      console.log('idle');
      setIsLoading(false);
      setShowOverlay(false);
    });
    console.log('not idle'); // removing map object and calling onMapRemoved callback
    // when component will unmout
    return () => {
      mapLibre.remove();
      setMap(undefined);
      if (props.onRemoved) props.onRemoved();
    };
  }, []);

  async function getFromAPI(id: any) {
    try {
      const response = await axios.get(`${BASE_URL}/${COLLECTION_NAME}?filters[stCode]=${id}`);

      const entries = response.data.data;
      console.log(entries);
      if (entries.length > 0) {
        return entries[0].attributes;
      } else {
        return 'No entry found with the specified custom specific field.!!!';
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getStationData(id: string, uf: string) {
    try {
      const sId = String(id).padStart(8, '0');

      const [apiData] = await Promise.all([getFromAPI(id)]);
      /*   const [stData, apiData] = await Promise.all([
        axios.get(`/data/stations/stations-${uf}.json`),
        
        getFromAPI(id)
      ]); */

      /*    const res = await axios({
        method: 'get',
        url: `/data/stations/stations-${uf}.json`
      });
      const ufStations = stData.data.stations; */
      const st = {
        stCode: apiData.stCode,
        stType: apiData.stType,
        stName: apiData.stName,
        stAccountable: apiData.stAccountable,
        stOperator: apiData.stOperator,
        stUF: apiData.stUF,
        stCounty: apiData.stCounty,
        stLatitude: apiData.stLatitude,
        stLongitude: apiData.stLongitude,
        stFaultDays: apiData.stFaultDays,
        stFaultMonths: apiData.stFaultMonths,
        stBasin: apiData.stBasin,
        stRiver: apiData.stRiver,
        stADren: apiData.stADren,
        stEscale: apiData.stEscale,
        stRegLevel: apiData.stRegLevel,
        stLiqDischarge: apiData.stLiqDischarge,
        stPluviometer: apiData.stPluviometer,
        stEvaporimeter: apiData.stEvaporimeter,
        stClimatological: apiData.stClimatological,
        stTelemetry: apiData.stTelemetry,
        stInitScale: apiData.stInitScale,
        stInitRegLevel: apiData.stInitRegLevel,
        stInitRegDesLiq: apiData.stInitRegDesLiq,
        stInitRegSed: apiData.stInitRegSed,
        stInitRegQual: apiData.stInitRegQual,
        stInitRegPluv: apiData.stInitRegPluv,
        stInitRegRain: apiData.stInitRegRain,
        stInitRegEvap: apiData.stInitRegEvap,
        stInitRegClim: apiData.stInitRegClim,
        stInitRegTele: apiData.stInitRegTele,
        stOperating: apiData.stOperating,
        stRegINC_TEL: apiData.stRegINC_TEL,
        stSediments: apiData.stSediments,
        stWaterQuality: apiData.stWaterQuality
      };

      /*      ufStations.forEach((item: any) => {
        if (item._id == id) {
          st = item;
        }
      }); */

      const locFirstYear = new Date(apiData.raindata._initRegisterTime).getFullYear();
      const locLastYear = new Date(apiData.raindata._lastRegisterTime).getFullYear();
      const satFirstYear = new Date(apiData.satdata._satData._initRegisterTime).getFullYear();
      const satLastYear = new Date(apiData.satdata._satData._lastRegisterTime).getFullYear();

      appDispatch({
        type: 'loadData',
        infoValue: st,
        locValue: apiData.raindata,
        satValue: apiData.satdata._satData,
        valueLocLastYear: locLastYear,
        valueLocFirstYear: locFirstYear,
        valueSatLastYear: satLastYear,
        valueSatFirstYear: satFirstYear,
        valueSelecetedLocBar: locLastYear - 1,
        valueSelecetedSatBar: satLastYear - 1
      });

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

  const [showOverlay, setShowOverlay] = useState(true);
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
    console.log('overlay');
  };

  return (
    <>
      <div ref={rootRef} className={width < 600 ? 'map-wrap-mobile' : 'map-wrap'}>
        <div ref={mapContainerRef} className="map">
          {appState.modals.panelBox && (
            <PanelModals flyTo={flyToStation} onLayersHandleChange={layersHandleChange} />
          )}
          <MobileResults flyTo={flyToStation} />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={appState.backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <HelpDialog />
          <SettingsDialog />
          <SelectDialog onLayersHandleChange={layersHandleChange} />
        </div>
      </div>
    </>
  );
}

export default Map;
