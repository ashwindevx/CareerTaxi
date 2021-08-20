// Global style overrides
import colors from './colors';

const styles = {
  global: {
    html: {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      color: colors.text,
      bg: colors.bg,
      padding: 0,
      margin: 0,
    },
    '*, :after, :before': {
      boxSizing: 'border-box',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    option: {
      color: colors.bg,
    },
  },
};

export default styles;
