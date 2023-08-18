/** @format */

import React, { useContext } from 'react';
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

import { SwitchTransition, CSSTransition } from 'react-transition-group';
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
  fontSize: '0.8rem',
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

export default function PanelModals(props: any) {
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

  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const styleBox = {
    position: 'relative',
    top: '0px',
    bgcolor: '#c6eafa',
    border: '1px solid #0f9bd9',
    borderRadius: '3px',
    boxShadow: '0 0 5px 5px gray',
    p: 0,
    height: appState.modals.how ? window.innerHeight - 400 : window.innerHeight - 200,
    marginTop: appState.modals.how ? '15px !important' : '0px'
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

  //const [open, setOpen] = React.useState(appState.modals.timeline);
  //const handleOpen = () => setOpen(true);
  const handleCloseProject = () => {
    //setOpen(false);
    appDispatch({ type: 'closeProjectsModal' });
  };

  const handleCloseSelect = () => {
    //setOpen(false);
    appDispatch({ type: 'closeSelectModal' });
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

  return (
    <div
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
          <CSSTransition
            in={appState.modals.projects}
            timeout={500}
            classNames="slide-projects"
            unmountOnExit>
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
                    <IconButton
                      aria-label="delete"
                      onClick={handleCloseProject}
                      sx={{ color: 'white' }}>
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>

              <Typography sx={{ mt: 2 }}></Typography>
            </Box>
          </CSSTransition>
        </Grid>
        <Grid item xs={4}>
          <CSSTransition
            in={appState.modals.search}
            timeout={500}
            classNames="slide-timeline"
            unmountOnExit>
            <Box sx={{ overflow: 'auto', zIndex: 10, ...style }}>
              {appState.modals.timeline && (
                <div>
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
                        Timeline
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          aria-label="timeline"
                          onClick={handleClose}
                          sx={{ color: 'white' }}>
                          <CloseIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Typography sx={{ mt: 2 }}></Typography>
                </div>
              )}
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
                    appState.searchData.map((item: any) => (
                      <Grid
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
                              props.flyTo([
                                item.attributes.stLongitude,
                                item.attributes.stLatitude
                              ]);
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
          </CSSTransition>
        </Grid>
        <Grid item xs={4}>
          {appState.modals.how && (
            <CSSTransition
              in={appState.modals.how}
              timeout={500}
              classNames="slide-select"
              unmountOnExit>
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
                    padding: '2px'
                  }}>
                  <Grid item xs={12}>
                    <Item>Search by</Item>
                  </Grid>

                  <Grid item xs={3}>
                    <Item>
                      Name{' '}
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
                      Basin{' '}
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
                      UF{' '}
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
                      River{' '}
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
            </CSSTransition>
          )}
          {appState.modals.select && (
            <CSSTransition
              in={appState.modals.select}
              timeout={500}
              classNames="slide-select"
              unmountOnExit>
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
                      <IconButton
                        aria-label="Select"
                        onClick={handleCloseSelect}
                        sx={{ color: 'white' }}>
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
                    <Item>Map Layers</Item>
                  </Grid>

                  <Grid item xs={4}>
                    <Item3>
                      <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                      Brazil Basins
                    </Item3>
                  </Grid>
                  <Grid item xs={4}>
                    <Item3>
                      <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                      Main Rivers
                    </Item3>
                  </Grid>
                  <Grid item xs={4}>
                    <Item3>
                      <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                      S. America Basins
                    </Item3>
                  </Grid>
                </Grid>
              </Box>
            </CSSTransition>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
