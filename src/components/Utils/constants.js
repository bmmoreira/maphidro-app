/** @format */

export const bgColor = '#312f38';
export const bgColorButton = '#44414d';
export const bgColorBox = '#615d6f';
export const bgColorButtonTitle = '#f0f0f0';

export const styleGray = {
  bg: '#312f38',
  bgButton: '#44414d',
  bgButtonHover: '#565262',
  bgButtonActive: '#565262',
  borderColor: '#28262e',
  borderColorHover: '#767187',
  borderColorActive: '#f0f0f0',
  bgBox: '#615d6f',
  colorButtonTitle: '#f0f0f0',
  boxShadowFocus: '0 0 0 0.2rem rgba(64,70,74,.5)'
};
//0688c6
export const styleWhite = {
  bg: '#b3e5f7',
  bgButton: '#0f9bd9',
  bgButtonHover: '#0677b2',
  bgButtonActive: '#4fc3f7',
  borderColor: '#28262e',
  borderColorHover: '#767187',
  borderColorActive: '#f0f0f0',
  bgBox: '#e1f5fc',
  colorButtonTitle: '#f0f0f0',
  boxShadowFocus: '0 0 0 0.2rem rgba(64,70,74,.5)'
};

export const loginButtom = {
  backgroundColor: styleWhite.bgButton,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  fontSize: '0.9rem',
  height: '30px',
  width: '140px',
  borderRadius: '5px',
  marginTop: '5px',
  color: styleWhite.colorButtonTitle,
  '&:hover': {
    backgroundColor: styleWhite.bgButtonHover,
    borderColor: styleWhite.borderColorHover,
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: styleWhite.bgButtonActive,
    borderColor: styleWhite.borderColorActive
  },
  '&:focus': {
    boxShadow: styleWhite.boxShadowFocus
  }
};

export const roundedButton = {
  backgroundColor: styleWhite.bgButton,
  color: styleWhite.colorButtonTitle,
  '&:hover': {
    backgroundColor: styleWhite.bgButtonHover,
    borderColor: styleWhite.borderColorHover,
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: styleWhite.bgButtonActive,
    borderColor: styleWhite.borderColorActive
  },
  '&:focus': {
    boxShadow: styleWhite.boxShadowFocus
  }
};
