import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export default function InitDialog() {
  const { t } = useTranslation();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [open, setOpen] = React.useState(appState.modals.initModal);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    appDispatch({
      type: 'toggleInitModal',
      value: false
    });
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={appState.modals.initModal}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">{t('instructions')}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <img
              src="/assets/images/intro_image2.png"
              alt=""
              srcSet=""
              style={{ maxWidth: '100%', height: 'auto', padding: '0', magin: '0' }}
            />
            {t('init01')} <br /> {t('init02')}
            <img
              src="/assets/images/clusters_stations.png"
              alt=""
              srcSet=""
              style={{ maxWidth: '100%', height: 'auto', padding: '0', magin: '0' }}
            />
            {t('init03')}
            <img
              src="/assets/images/navigation_icons.png"
              alt=""
              srcSet=""
              style={{ maxWidth: '100%', height: 'auto', padding: '0', magin: '0' }}
            />
            {t('init04')}
            <img
              src="/assets/images/month_precipitation.png"
              alt=""
              srcSet=""
              style={{ maxWidth: '100%', height: 'auto', padding: '0', magin: '0' }}
            />
            {t('init05')}
            <img
              src="/assets/images/menu_dropdown.png"
              alt=""
              srcSet=""
              style={{ maxWidth: '100%', height: 'auto', padding: '0', magin: '0' }}
            />
            {t('init06')}
            <img
              src="/assets/images/day_max.png"
              alt=""
              srcSet=""
              style={{ maxWidth: '100%', height: 'auto', padding: '0', magin: '0' }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('close')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
