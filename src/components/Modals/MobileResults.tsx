import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { BootstrapButton, Item } from '../Utils/sytles';


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

export default function BasicModal(props: SearchProp) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const handleClose = () => {
    appDispatch({
      type: 'toggleMobileModal',
      value: false
    });
  };

  return (
    <Modal
      open={appState.modals.mobile}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Grid
          container
          spacing={0}
          sx={{
            padding: 0,
            backgroundColor: '#0f9bd9',
            height: '40px'
          }}>
          <Grid item xs={8}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ padding: '5px 0 5px 10px', color: 'white' }}>
              <SearchIcon sx={{ color: 'white' }} />
              Search Results
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <IconButton aria-label="timeline" onClick={handleClose} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <List
          sx={{
            padding: 0,
            overflow: 'auto',
            height: '100%',
            '&::-webkit-scrollbar': {
              width: 11
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'darkgrey',
              outline: `1px solid slategrey`
            }
          }}>
          {appState.searchResult &&
            appState.searchData.map((item: any, idx: number) => (
              <ListItem key={idx} disablePadding>
                <Grid
                key={idx}
                container
                spacing={1}
                sx={{
                  padding: '2px'
                }}>
                      <Grid item xs={8}>
                  <BootstrapButton
                    variant="contained"
                    aria-label="station name"
                    color="primary"
                    disableRipple
                    onClick={() => {
                      handleClose();
                      props.flyTo([item.attributes.stLongitude, item.attributes.stLatitude]);
                      console.log('click button');
                    }}>
                    {item.attributes.stName.substring(0, 20)}...
                  </BootstrapButton>
                </Grid>
                
                <Grid item xs={4}>
                  <Item>{item.attributes.stUF}</Item>
                </Grid>
               
              </Grid>    
                
              </ListItem>
            ))}
        </List>
      </Box>
    </Modal>
  );
}
