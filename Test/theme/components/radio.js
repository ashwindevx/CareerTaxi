import colors from 'theme/colors';

const Radio = {
  baseStyle: {
    parts: ['control'],
    control: {
      borderColor: colors.brand.gray,
      borderStyle: 'solid',
      borderWidth: '3px',
      p: '9px',
      bg: colors.bg,
      _checked: {
        bg: colors.brand.yellow,
        color: colors.brand.yellow,
        borderColor: colors.brand.yellow,
        _hover: {
          bg: `${colors.brand.yellow}e6`,
          color: `${colors.brand.yellow}e6`,
          borderColor: `${colors.brand.yellow}e6`,
        },
      },
    },
  },
};

export default Radio;
