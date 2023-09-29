import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { BootstrapButton, Item, Item2 } from '../Utils/sytles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  height: '75%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 4,
  p: 0,
  display: 'flex',
  flexDirection: 'column'
};

interface SearchProp {
  flyTo(coord: [long: number, lat: number]): void;
}

export default function SearchResults(props: SearchProp) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const handleCloseSearch = () => {
    //setOpen(false);
    appDispatch({ type: 'closeSearchModal' });
    appDispatch({ type: 'toglePanelModal', value: false });
  };

  return (
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
                <Item2>Long.</Item2>
              </Grid>
              <Grid item xs={1.5}>
                <Item2>Lat.</Item2>
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
                    aria-label="station name"
                    color="primary"
                    disableRipple
                    onClick={() => {
                      appDispatch({ type: 'closeSearchModal' });
                      appDispatch({ type: 'toglePanelModal', value: false });

                      props.flyTo([item.attributes.stLongitude, item.attributes.stLatitude]);
                      console.log('click button');
                    }}>
                    {item.attributes.stName.substring(0, 12)}...
                  </BootstrapButton>
                </Grid>
                <Grid item xs={4}>
                  <Item>{item.attributes.stBasin.substring(0, 17)}...</Item>
                </Grid>
                <Grid item xs={1}>
                  <Item>{item.attributes.stUF}</Item>
                </Grid>
                <Grid item xs={1.5}>
                  <Item>{item.attributes.stLongitude.toFixed(3)}</Item>
                </Grid>
                <Grid item xs={1.5}>
                  <Item>{item.attributes.stLatitude.toFixed(3)}</Item>
                </Grid>
              </Grid>
            ))}
        </div>
      )}
    </Box>
  );
}
