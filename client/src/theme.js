const pixelToRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: pixelToRem(14),
  base: pixelToRem(16),
  lg: pixelToRem(20),
  xl: pixelToRem(24),
  xxl: pixelToRem(28),
  logo: pixelToRem(60),
};

const spaces = {
  xs: pixelToRem(4),
  small: pixelToRem(5),
  base: pixelToRem(10),
  lg: pixelToRem(20),
  xl: pixelToRem(40),
  xxl: pixelToRem(50),
};

const borderRadius = {
  base: pixelToRem(4),
  lg: pixelToRem(20),
};

const colors = {
  base: ' #495057',
  red_1: '#ff8787',
  red_2: '#ff6b6b',
  blue_1: '#339af0',
  blue_2: '#6a99ee',
  gray_1: '#f5f5f5',
  gray_2: '#a1a1a1',
  gray_3: '#dee2e6',
};

const common = {
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  boxShadow: `
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  `,
  boxShadow_2: `
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, 
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  `,
  boxShadow_3: `
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  `,
  boxShadow_yellow: `
    box-shadow: 0px 1px 8px #fdcb6e;
  `,
};

const theme = {
  fontSizes,
  spaces,
  borderRadius,
  colors,
  common,
};

export default theme;
