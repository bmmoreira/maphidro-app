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

export default function PanelModals() {
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

  return (
    <div
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: window.innerHeight - 178,
        paddingLeft: '10px',
        paddingRight: '10px'
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
            <Box sx={{ zIndex: 10, ...style }}>
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
                      backgroundColor: '#0f9bd9'
                    }}>
                    <Grid item xs={8}>
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ padding: '5px 0 5px 10px', color: 'white' }}>
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
                          <Item>{item.attributes.stName}</Item>
                        </Grid>
                        <Grid item xs={4}>
                          <Item>{item.attributes.stBasin.substring(0, 22)}...</Item>
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
          <CSSTransition
            in={appState.modals.select}
            timeout={500}
            classNames="slide-select"
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

              <Typography sx={{ mt: 2 }}></Typography>
            </Box>
          </CSSTransition>
        </Grid>
      </Grid>
    </div>
  );
}
