import colors from 'theme/colors';

const Input = {
  baseStyle: {
    field: {
      borderColor: colors.brand.yellow,
      bg: colors.brand.darkGray,
      focusBorderColor: colors.brand.yellow,
    },
  },
  defaultProps: {
    // To clear default variant style
    variant: '',
  },
};

export default Input;
