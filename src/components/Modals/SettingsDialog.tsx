import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import { lightBlue } from '../Utils/sytles';

export default function SettingsDialog() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [open, setOpen] = React.useState(appState.modals.settingsdialog);

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    appDispatch({
      type: 'toggleSettingsDialog',
      value: false
    });
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={appState.modals.settingsdialog}
      onClose={handleClose}
      sx={{ zIndex: 9999 }}>
      <AppBar
        sx={{ position: 'relative', backgroundColor: lightBlue.bg, color: lightBlue.titleColor }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            MapHidro Settings
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            close
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText primary="Update" secondary="Application Update" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Profile" secondary="User Details" />
        </ListItem>
      </List>
    </Dialog>
  );
}
