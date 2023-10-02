import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export const lightBlue = {
  bg: '#b3e5f7',
  titleColor: '#0f9bd9',
  bgButton: '##1bb4f7',
  bgButtonHover: '#565262',
  bgButtonActive: '#565262',
  borderColor: '#28262e',
  borderColorHover: '#767187',
  borderColorActive: '#f0f0f0',
  bgBox: '#615d6f',
  colorButtonTitle: '#f0f0f0',
  boxShadowFocus: '0 0 0 0.2rem rgba(64,70,74,.5)'
};

export const styleGray = {
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

export const BootstrapButton = styled(Button)({
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

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '0.8rem',
  color: theme.palette.text.secondary
}));

export const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#0f9bd9',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: '#fff'
}));

export const Item3 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  alignItems: 'center',
  alignContent: 'start',
  display: 'flex'
}));

export const style = {
  position: 'relative',
  top: '0px',

  height: window.innerHeight - 200,
  bgcolor: '#c6eafa',
  border: '1px solid #0f9bd9',
  borderRadius: '3px',
  boxShadow: '0 0 5px 5px gray',
  p: 0
};

export const styleHow = {
  position: 'relative',
  top: '0px',
  bgcolor: '#c6eafa',
  border: '1px solid #0f9bd9',
  borderRadius: '3px',
  boxShadow: '0 0 5px 5px gray',
  p: 0
};
