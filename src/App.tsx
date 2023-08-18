import React, { useState, useEffect } from 'react';
import Map from './components/Map/map';

import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:3000';

import { useImmerReducer } from 'use-immer';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import Station from './components/DataModels/Station4';
import useWindowDimensions from './utils/useWindowDimensions';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import About from './components/pages/About';
import Terms from './components/pages/Terms';
import HomeGuest from './components/pages/HomeGuest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CreatePost from './components/pages/CreatePost';
import ViewSinglePost from './components/pages/ViewSinglePost';
import FlashMessages from './components/pages/FlashMessages';
import NotFound from './components/pages/NotFound';
import MapGuest from './components/pages/MapGuest';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChartModal from './components/ChartModal/ChartModal';
import axios from 'axios';

export type Basin = {
  id: number;
  bName: string;
};
interface MonthNames {
  name: string;
}

const BASE_URL = 'http://localhost:1337';
const COLLECTION = 'api/mhstations';

const App: React.FC = () => {
  const { t } = useTranslation();
  const monthNames: MonthNames[] = [
    { name: t('Jan') },
    { name: t('Fev') },
    { name: t('Mar') },
    { name: t('Apr') },
    { name: t('May') },
    { name: t('Jun') },
    { name: t('Jul') },
    { name: t('Aug') },
    { name: t('Sep') },
    { name: t('Oct') },
    { name: t('Nov') },
    { name: t('Dec') }
  ];
  const initialState = {
    stationData: {},
    localData: {},
    satData: {},
    dataSatLoaded: false,
    dataLocLoaded: false,
    barChart: {
      yearSelectSatData: 0,
      yearSelectLocData: 0,
      locBar: {},
      satbar: {},
      chartData: monthNames,

      satFirsYear: '',
      satLastYear: '',
      satBarSelectedYear: '',
      locLastYear: '',
      locFirstYear: '',
      locBarSelectedYear: ''
    },
    chartData: null,
    satHeatmap: {},
    locHeatmap: {},
    loggedIn: Boolean(localStorage.getItem('mapHidroToken')),
    flashMessages: [],
    user: {
      token: localStorage.getItem('mapHidroToken'),
      username: localStorage.getItem('mapHidroUsername'),
      avatar: localStorage.getItem('mapHidroAvatar')
    },
    isSearchOpen: false,
    isChatOpen: false,
    unreadChatCount: 0,
    modals: {
      panelBox: false,
      projects: false,
      timeline: false,
      download: false,
      where: false,
      when: false,
      how: true,
      select: false,
      filters: false,
      results: false,
      search: false,
      centerModal: false
    },
    searchValue: '',
    searchData: '',
    searchResult: false,
    searchType: '',
    searchByName: true,
    searchByBasin: false,
    searchByUF: false,
    searchByRiver: false,
    searchBySat: false
  };

  /*Goal that all of our loading and saving user related actions takes place in one place
now have the user object that will be available in our global or app wide state.
So now any other component that needs to access this data will no longer need to talk
to the browser's localStorage. It can just find these values in State. 
But we need to ask ourselves how should these values get set into localStorage 
in the first place when you perform a successful login?
Well, we would also want to perform that within our Main.js file.
we first need to actually save these values into localStorage in the first place when you log in
because remember we just commented out that code within HeaderLoggedOut. Now, technically yes, 
we could just include code right here(Reducer Function) in this case that saves it into localStorage. 
But philosophically, we want to keep our Reducer pure in terms of it only working
with React ish things or only working with State. In other words if we need to do 
something that's considered a side effect like directly changing the browser's dom
in rare situations, or in this case working with the browser's local storage
we should probably do those types of things within a useEffect.
  */

  function mapReducer(draft: any, action: any) {
    switch (action.type) {
      case 'login':
        draft.loggedIn = true;
        draft.user = action.data;
        break;
      case 'logout':
        draft.loggedIn = false;
        break;
      case 'flashMessages':
        draft.flashMessages.push(action.value);
        break;
      case 'loadStation':
        draft.stationData = action.value;
        break;
      case 'loadLocal':
        draft.localData = action.value;
        draft.dataLocLoaded = action.loaded;
        break;
      case 'loadSat':
        draft.satData = action.value;
        draft.dataSatLoaded = action.loaded;
        break;
      case 'loadData':
        draft.stationData = action.infoValue;
        draft.satData = action.satValue;
        draft.localData = action.locValue;
        draft.dataSatLoaded = action.locDataloaded;
        draft.dataLocLoaded = action.satDataloaded;
        draft.barChart.locLastYear = action.valueLocLastYear;
        draft.barChart.locFirstYear = action.valueLocFirstYear;
        draft.barChart.satFirstYear = action.valueSatFirstYear;
        draft.barChart.satLastYear = action.valueSatLastYear;

        draft.barChart.locBarSelectedYear = action.valueSelecetedLocBar;
        draft.barChart.satBarSelectedYear = action.valueSelecetedSatBar;
        () => {
          toggleChartModal();
        };
        break;
      case 'chart':
        draft.barChart.locBar = action.locBar;
        draft.barChart.chartData = action.locBar;
        break;
      case 'setChart':
        draft.barChart.chartData = action.valueChart;
        break;
      case 'satHeatmap':
        draft.satHeatmap = action.valueSatHeatmap;
        break;
      case 'locHeatmap':
        draft.locHeatmap = action.valueLocHeatmap;
        break;
      case 'setLocBarSelectedYear':
        draft.barChart.locBarSelectedYear = action.valueSelecetedLocBar;
        break;
      case 'setSatBarSelectedYear':
        draft.barChart.satBarSelectedYear = action.valueSelecetedSatBar;
        break;
      case 'togleTimeLineModal':
        draft.modals.centerModal = true;
        draft.modals.search = false;

        draft.modals.timeline = true;
        break;
      case 'closeTimeLineModal':
        draft.modals.timeline = false;
        break;
      case 'togleProjectsModal':
        draft.modals.projects = true;
        break;
      case 'closeProjectsModal':
        draft.modals.projects = false;
        break;
      case 'togleSelectModal':
        draft.modals.select = true;
        break;
      case 'closeSelectModal':
        draft.modals.select = false;
        break;
      case 'toglePanelModal':
        draft.modals.panelBox = action.value;
        break;
      case 'togleSearchModal':
        draft.modals.timeline = false;
        draft.modals.search = true;
        break;
      case 'closeSearchModal':
        draft.modals.search = false;
        break;
      case 'searchAction':
        draft.searchValue = action.searchEventValue;
        break;
      case 'searchDataAction':
        draft.searchData = action.searchDataValue;
        draft.searchResult = true;
        break;
      case 'toggleSearchByName':
        draft.searchByName = action.value;
        break;
      case 'toggleSearchByBasin':
        draft.searchByBasin = action.value;
        break;
      case 'toggleSearchByUF':
        draft.searchByUF = action.value;
        break;
      case 'toggleSearchByRiver':
        draft.searchByRiver = action.value;
        break;
      case 'togleHowModal':
        draft.modals.how = action.value;
        break;
    }
  }
  /*
    Immer gives us a copy of state. A perfectly cloned copy that we are free to modify and change however we want.
    And then Immer will automatically handle the task of giving that draft object back to React.
   */
  const [state, dispatch] = useImmerReducer(mapReducer, initialState);

  // when state.loggedIn change from dispatch in several places fires useEffect

  useEffect(() => {
    /*
    If that was just set and now it's true,
    then this is where we would want to save data
    into localStorage.
    */
    if (state.loggedIn) {
      localStorage.setItem('mapHidroToken', state.user.token!);
      localStorage.setItem('mapHidroUsername', state.user.username!);
      localStorage.setItem('mapHidroAvatar', state.user.avatar!);
    } else {
      /*
      Else otherwise, well, if it just got set to false
      that means you just logged out.
      So this is where we can delete
      or remove that data from localStorage.
      */
      localStorage.removeItem('mapHidroToken');
      localStorage.removeItem('mapHidroUsername');
      localStorage.removeItem('mapHidroAvatar');
    }
  }, [state.loggedIn]);

  useEffect(() => {
    if (state.searchValue) {
      search(state.searchValue);
    }
    /*
    If that was just set and now it's true,
    then this is where we would want to save data
    into localStorage.
    */
  }, [state.searchValue]);

  const search = async (val: string) => {
    const res = await axios(
      `${BASE_URL}/${COLLECTION}?filters[stName][$contains]=${val.toUpperCase()}`
    );
    console.log(res.data.data);

    if (res.data.data.length > 0) {
      dispatch({
        type: 'searchDataAction',
        searchDataValue: res.data.data
      });
    }
  };

  const { height, width } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [offCanvas, setOffCanvas] = useState(false);
  const [radarModal, setRadarModal] = useState(false);
  const [satModal, setSatModal] = useState(false);
  const [localModal, setLocalModal] = useState(false);
  const [initModal, setInitModal] = useState(true);
  const [initScreen, setInitScreen] = useState(true);
  const [stationObj, setStationObj] = useState<Station>();
  const [basin, setBasin] = useState<Basin>({ id: 0, bName: 'none' } as Basin);

  const handleMapLoading = () => setLoading(false);

  const toggleRadarModal = () => {
    setRadarModal((prevState) => {
      return !prevState;
    });
  };

  const toggleSatModal = () => {
    setSatModal((prevState) => {
      return !prevState;
    });
  };

  const toggleLocalModal = () => {
    console.log('test');
    setLocalModal((prevState) => {
      return !prevState;
    });
  };

  const toggleInitModal = () => {
    setLocalModal((prevState) => {
      return !prevState;
    });
  };

  const toggleDrawer = (basin: Basin) => {
    console.log('click');
    if (typeof basin !== 'undefined') {
      setBasin(basin);
    } else {
      setBasin({ id: 0, bName: 'x' });
    }

    setOffCanvas((prevState) => {
      return !prevState;
    });
  };

  const [chartModal, setChartModal] = useState(false);
  const toggleChartModal = () => {
    //setStationObj(stationObj);
    setChartModal((prevState) => {
      return !prevState;
    });
  };

  /*   const toggleChartModal = (stationObj: Station) => {
    setStationObj(stationObj);
    setChartModal((prevState) => {
      return !prevState;
    });
  }; */

  /*
  Well, when our main component first renders we would just immediately wanna send an Axios request
  to the server to check if our token is still valid or not. If it's no longer valid, if the server says
  that the token is too old, we can just force the user to log out and have them log back in
  so they will have a new perfectly working token.
  */
  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source();
      const fResults = async function fetchResults() {
        try {
          const response = await Axios.post(
            '/checkToken',
            { token: state.user.token },
            { cancelToken: ourRequest.token }
          );
          if (!response.data) {
            dispatch({ type: 'logout' });
            dispatch({
              type: 'flashMessages',
              value: 'Your session has expired. Please log in again.'
            });
          }
        } catch (e) {
          console.log('There was a problem or the request was cancelled.');
        }
      };
      fResults();
      return () => ourRequest.cancel();
    }
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <div className="App">
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/* @ts-ignore */}
            <FlashMessages messages={state.flashMessages} />
            <Header />
            <Routes>
              <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
              <Route
                path="/map"
                element={
                  state.loggedIn ? (
                    <Map
                      initialOptions={{ center: [-55.59, -15.91], zoom: 4.1 }}
                      onLoaded={handleMapLoading}
                      showModalChart={toggleChartModal}
                      drawerClickHandler={toggleDrawer}
                      offCanvas={offCanvas}
                      setOffCanvas={setOffCanvas}
                    />
                  ) : (
                    <MapGuest />
                  )
                }
              />
              <Route path="/post/:id" element={<ViewSinglePost />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/about-maphidro" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          {chartModal && (
            <ChartModal
              //stationObj={stationObj}
              show={chartModal}
              onHide={() => setChartModal(false)}
            />
          )}{' '}
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default App;

/*
<Map
            initialOptions={{ center: [-58.59, -13.91], zoom: 4.1 }}
            onLoaded={handleMapLoading}
          />
          {loading && <MapLoadingHolder className="loading-holder" />}
*/
