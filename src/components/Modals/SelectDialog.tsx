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
import { Item2, Item3, lightBlue } from '../Utils/sytles';
import { layerType } from '../Utils/types';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '0.875rem'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem'
  }
};

interface SelectProps {
  onLayersHandleChange(layerId: string): void;
}

export default function SelectDialog(props: SelectProps) {
  const { t } = useTranslation();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const mapLayers: layerType[] = appState.mapLayers;

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
      type: 'toggleSelectDialog',
      value: false
    });
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={appState.modals.selectdialog}
      onClose={handleClose}
      sx={{ zIndex: 9999 }}>
      <AppBar
        sx={{ position: 'relative', backgroundColor: lightBlue.bg, color: lightBlue.titleColor }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {t('select_layers')}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            {t('close')}
          </Button>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={1}
        sx={{
          marginTop: '5px',
          padding: '5px'
        }}>
        <Grid item xs={12}>
          <Item2 sx={{ fontSize: '1rem', fontWeight: '600' }}>{t('map_layers')}</Item2>
        </Grid>
        {mapLayers.map((layer, idx) => (
          <Grid item xs={12} key={idx}>
            <Item3>
              <Checkbox
                checked={layer.checked}
                onChange={() => props.onLayersHandleChange(layer.layerId)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              <ThemeProvider theme={theme}>
                <Typography variant="h3">{layer.name}</Typography>
              </ThemeProvider>
            </Item3>
          </Grid>
        ))}
      </Grid>
    </Dialog>
  );
}
