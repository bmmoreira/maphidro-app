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
import { useTranslation } from 'react-i18next';

export default function HelpDialog() {
  const { t } = useTranslation();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [open, setOpen] = React.useState(appState.modals.helpdialog);

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
      type: 'toggleHelpDialog',
      value: false
    });
    setOpen(false);
  };

  const openInitModal = () => {
    appDispatch({
      type: 'toggleHelpDialog',
      value: false
    });
    setOpen(false);
    appDispatch({
      type: 'toggleInitModal',
      value: true
    });
  };

  return (
    <Dialog
      fullScreen
      open={appState.modals.helpdialog}
      onClose={handleClose}
      sx={{ zIndex: 9999 }}>
      <AppBar
        sx={{ position: 'relative', backgroundColor: lightBlue.bg, color: lightBlue.titleColor }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {t('maphidro_help')}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            {t('close')}
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText
            primary={t('instructions')}
            secondary={t('usage_instructions')}
            onClick={openInitModal}
          />
        </ListItem>
        <Divider />
        <ListItem button disabled>
          <ListItemText primary={t('download_data')} secondary={t('data_patern')} />
        </ListItem>
        <Divider />
        <ListItem button disabled>
          <ListItemText primary={t('satelite_data')} secondary={t('about_json')} />
        </ListItem>
      </List>
    </Dialog>
  );
}
