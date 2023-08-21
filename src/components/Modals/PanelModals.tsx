/** @format */

import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import Slide from '@mui/material/Slide';
import SendIcon from '@mui/icons-material/Send';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import './styles.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '0.8rem',
  color: theme.palette.text.secondary
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#0f9bd9',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: '#fff'
}));

const Item3 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '1.0rem',
  color: theme.palette.text.secondary,
  alignItems: 'center',
  alignContent: 'start',
  display: 'flex'
}));

const styleGray = {
  bg: '#312f38',
  bgButton: '#1bb4f7',
  bgButtonHover: '#565262',
  bgButtonActive: '#565262',
  borderColor: '#28262e',
  borderColorHover: '#767187',
  borderColorActive: '#f0f0f0',
  bgBox: '#615d6f',
  colorButtonTitle: '#f0f0f0',
  boxShadowFocus: '0 0 0 0.2rem rgba(64,70,74,.5)'
};

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  width: '100%',
  fontSize: 14,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: styleGray.bgButton,
  borderColor: styleGray.borderColor,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  '&:hover': {
    backgroundColor: styleGray.bgButtonHover,
    borderColor: styleGray.borderColorHover,
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: styleGray.bgButtonActive,
    borderColor: styleGray.borderColorActive
  },
  '&:focus': {
    boxShadow: styleGray.boxShadowFocus
  }
});

type layerType = {
  layerId: string;
  name: string;
  checked: boolean;
  added: boolean;
};

const style = {
  position: 'relative',
  top: '0px',

  height: window.innerHeight - 200,
  bgcolor: '#c6eafa',
  border: '1px solid #0f9bd9',
  borderRadius: '3px',
  boxShadow: '0 0 5px 5px gray',
  p: 0
};

const styleHow = {
  position: 'relative',
  top: '0px',
  bgcolor: '#c6eafa',
  border: '1px solid #0f9bd9',
  borderRadius: '3px',
  boxShadow: '0 0 5px 5px gray',
  p: 0
};

export default function PanelModals(props: any) {
  const containerRef = React.useRef(null);
  const cday = new Date();
  const [imgDate, setImgDate] = useState(cday.setDate(cday.getDate() - 9));
  const [imgIndex, setImgIndex] = useState(0);
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const mapLayers: layerType[] = appState.mapLayers;

  const togglePlay = () => {
    const layer = appState.mapRef.getLayoutProperty('heatmapRain', 'visibility');
    console.log(layer);
    if (layer === 'visible') {
      const date = new Date(cday.getTime());

      let i = 1;

      const timer = setInterval(() => {
        if (i < 9) {
          appState.mapRef.getSource('heatmapRain').updateImage({
            url: 'images/prec/overall/precp' + i + '.png'
          });
          i++;
          console.log(i);
          setImgDate(date.setDate(date.getDate() + 1));
        } else {
          window.clearInterval(timer);
          setImgIndex(8);
        }
      }, 1000);
    }
  };

  const toggleBackward = () => {
    const layer = appState.mapRef.getLayoutProperty('heatmapRain', 'visibility');
    if (layer === 'visible' && imgIndex > 1) {
      //let currentIndex = imgIndex - 1;
      appState.mapRef.getSource('heatmapRain').updateImage({
        url: '/images/prec/overall/precp' + imgIndex + '.png'
      });
      setImgIndex(imgIndex - 1);
      const date = new Date(imgDate);
      setImgDate(date.setDate(date.getDate() - 1));
    }
  };

  const toggleForward = () => {
    const layer = appState.mapRef.getLayoutProperty('heatmapRain', 'visibility');
    if (layer === 'visible' && imgIndex < 8) {
      //let currentIndex = imgIndex + 1;
      appState.mapRef.getSource('heatmapRain').updateImage({
        url: '/images/prec/overall/precp' + imgIndex + '.png'
      });
      setImgIndex(imgIndex + 1);
      const date = new Date(imgDate);
      setImgDate(date.setDate(date.getDate() + 1));
    }
  };

  //const [open, setOpen] = React.useState(appState.modals.timeline);
  //const handleOpen = () => setOpen(true);
  const handleCloseProject = () => {
    //setOpen(false);
    appDispatch({ type: 'closeProjectsModal' });
  };

  const handleCloseSelect = () => {
    //setOpen(false);
    appDispatch({
      type: 'togleSelectModal',
      value: false
    });
  };

  const handleCloseSearch = () => {
    //setOpen(false);
    appDispatch({ type: 'closeSearchModal' });
  };

  const handleClose = () => {
    //setOpen(false);
    appDispatch({ type: 'closeTimeLineModal' });
  };

  const toggleByName = (e: any) => {
    appDispatch({
      type: 'toggleSearchByName',
      value: !appState.searchByName
    });
  };

  const toggleByBasin = (e: any) => {
    appDispatch({
      type: 'toggleSearchByBasin',
      value: !appState.searchByBasin
    });
  };

  const toggleByUF = (e: any) => {
    appDispatch({
      type: 'toggleSearchByUF',
      value: !appState.searchByUF
    });
  };

  const toggleByRiver = (e: any) => {
    appDispatch({
      type: 'toggleSearchByRiver',
      value: !appState.searchByRiver
    });
  };

  const toggleHow = () => {
    appDispatch({
      type: 'togleHowModal',
      value: !appState.modals.how
    });
  };

  const toggleHControl = () => {
    appDispatch({
      type: 'togleHeatmapControl',
      value: !appState.modals.heatmapControls
    });
    appDispatch({
      type: 'closeHeatmapControl'
    });
  };

  const styleBox = {
    position: 'relative',
    top: '0px',
    bgcolor: '#c6eafa',
    border: '1px solid #0f9bd9',
    borderRadius: '3px',
    boxShadow: '0 0 5px 5px gray',
    p: 0,
    height:
      appState.modals.how | appState.modals.heatmapControls
        ? window.innerHeight - 400
        : window.innerHeight - 200,
    marginTop: appState.modals.how | appState.modals.heatmapControls ? '15px !important' : '0px'
  };

  const how = (
    <Box sx={{ zIndex: 10, height: '180px', ...styleHow }}>
      <Grid
        container
        spacing={0}
        sx={{
          padding: 0,
          backgroundColor: '#0f9bd9'
        }}>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ padding: '5px 0 5px 10px', color: 'white' }}>
            How
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton aria-label="Select" onClick={toggleHow} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          marginTop: '5px',
          padding: '5px'
        }}>
        <Grid item xs={12}>
          <Item2 sx={{ fontSize: '1rem', fontWeight: '600' }}>Search by</Item2>
        </Grid>

        <Grid item xs={3}>
          <Item>
            Name
            <Switch
              color="primary"
              checked={appState.searchByName}
              onChange={toggleByName}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            Basin
            <Switch
              color="primary"
              checked={appState.searchByBasin}
              onChange={toggleByBasin}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            UF
            <Switch
              color="primary"
              checked={appState.searchByUF}
              onChange={toggleByUF}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            River
            <Switch
              color="primary"
              checked={appState.searchByRiver}
              onChange={toggleByRiver}
              inputProps={{ 'aria-label': 'controlled' }}
              disabled
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );

  const heatmapcontrols = (
    <Box sx={{ zIndex: 10, height: '150px', ...styleHow }}>
      <Grid
        container
        spacing={0}
        sx={{
          padding: 0,
          backgroundColor: '#0f9bd9'
        }}>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ padding: '5px 0 5px 10px', color: 'white' }}>
            Heatmap Controls
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton aria-label="Select" onClick={toggleHControl} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          display: 'flex',
          justifyContent: 'start',
          marginTop: '5px',
          padding: '5px'
        }}>
        <Grid item xs={3}>
          <Button
            onClick={toggleBackward}
            variant="contained"
            endIcon={<SkipPreviousIcon />}
            size="large">
            Previous
          </Button>
        </Grid>
        <Grid item xs={2.3}>
          <Button variant="contained" onClick={togglePlay} endIcon={<SendIcon />} size="large">
            Play
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={toggleForward}
            variant="contained"
            endIcon={<SkipNextIcon />}
            size="large">
            Next
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Item3 sx={{ height: '42px', display: 'flex', justifyContent: 'center' }}>
            {new Date(imgDate).toISOString().split('T')[0]}
          </Item3>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <img src="images/prec/legend4.png" />
        </Grid>
      </Grid>
    </Box>
  );

  const projects = (
    <Box sx={{ zIndex: 10, ...style }}>
      <Grid
        container
        spacing={0}
        sx={{
          padding: 0,
          backgroundColor: '#0f9bd9'
        }}>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ padding: '5px 0 5px 10px', color: 'white' }}>
            Projects
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton aria-label="delete" onClick={handleCloseProject} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Typography sx={{ mt: 2 }}></Typography>
    </Box>
  );

  const search = (
    <Box sx={{ overflow: 'auto', zIndex: 10, ...style }}>
      {appState.modals.search && (
        <div>
          <Grid
            container
            spacing={0}
            sx={{
              padding: 0,
              backgroundColor: '#0f9bd9',
              overflow: 'auto'
            }}>
            <Grid item xs={8}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ padding: '5px 0 5px 10px', color: 'white' }}>
                <SearchIcon sx={{ color: 'white' }} />
                Search
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <IconButton
                  aria-label="timeline"
                  onClick={handleCloseSearch}
                  sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>

          {appState.searchResult && (
            <Grid
              container
              spacing={1}
              sx={{
                marginTop: '30px',
                padding: '2px'
              }}>
              <Grid item xs={4}>
                <Item2>STATION NAME</Item2>
              </Grid>
              <Grid item xs={4}>
                <Item2>BASIN</Item2>
              </Grid>
              <Grid item xs={1}>
                <Item2>UF</Item2>
              </Grid>
              <Grid item xs={1.5}>
                <Item2>Longitude</Item2>
              </Grid>
              <Grid item xs={1.5}>
                <Item2>Latitude</Item2>
              </Grid>
            </Grid>
          )}
          {appState.searchResult &&
            appState.searchData.map((item: any, idx: number) => (
              <Grid
                key={idx}
                container
                spacing={1}
                sx={{
                  padding: '2px'
                }}>
                <Grid item xs={4}>
                  <BootstrapButton
                    variant="contained"
                    aria-label="delete"
                    color="primary"
                    disableRipple
                    onClick={() => {
                      appDispatch({ type: 'closeSearchModal' });
                      props.flyTo([item.attributes.stLongitude, item.attributes.stLatitude]);
                      console.log('click button');
                    }}>
                    {item.attributes.stName.substring(0, 16)}...
                  </BootstrapButton>
                </Grid>
                <Grid item xs={4}>
                  <Item>{item.attributes.stBasin.substring(0, 21)}...</Item>
                </Grid>
                <Grid item xs={1}>
                  <Item>{item.attributes.stUF}</Item>
                </Grid>
                <Grid item xs={1.5}>
                  <Item>{item.attributes.stLongitude.toFixed(4)}</Item>
                </Grid>
                <Grid item xs={1.5}>
                  <Item>{item.attributes.stLatitude.toFixed(4)}</Item>
                </Grid>
              </Grid>
            ))}
        </div>
      )}
    </Box>
  );

  const select = (
    <Box sx={{ zIndex: 10, ...styleBox }}>
      <Grid
        container
        spacing={0}
        sx={{
          padding: 0,
          backgroundColor: '#0f9bd9'
        }}>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ padding: '5px 0 5px 10px', color: 'white' }}>
            Select
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton aria-label="Select" onClick={handleCloseSelect} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          marginTop: '5px',
          padding: '5px'
        }}>
        <Grid item xs={12}>
          <Item2 sx={{ fontSize: '1rem', fontWeight: '600' }}>Map Layers</Item2>
        </Grid>
        {mapLayers.map((layer, idx) => (
          <Grid item xs={4} key={idx}>
            <Item3>
              <Checkbox
                checked={layer.checked}
                onChange={() => props.onLayersHandleChange(layer.layerId)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              {layer.name}
            </Item3>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'top',
        display: 'flex',
        height: window.innerHeight - 178,
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '10px'
      }}>
      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: '#44414d'
        }}>
        <Grid item xs={4}>
          <Slide direction="right" in={appState.modals.projects} mountOnEnter unmountOnExit>
            {projects}
          </Slide>
        </Grid>
        <Grid item xs={4}>
          <Slide direction="down" in={appState.modals.search} mountOnEnter unmountOnExit>
            {search}
          </Slide>
        </Grid>
        <Grid item xs={4}>
          <Slide direction="left" in={appState.modals.how} mountOnEnter unmountOnExit>
            {how}
          </Slide>
          <Slide direction="left" in={appState.modals.heatmapControls} mountOnEnter unmountOnExit>
            {heatmapcontrols}
          </Slide>
          <Slide direction="left" in={appState.modals.select} mountOnEnter unmountOnExit>
            {select}
          </Slide>
        </Grid>
      </Grid>
    </div>
  );
}
