import colors from 'theme/colors';

const Button = {
  baseStyle: {
    borderRadius: '12px',
    fontWeight: 'normal',
  },
  variants: {
    brand: {
      bgGradient: `linear(to-r, ${colors.brand.yellow}, ${colors.brand.pink})`,
      _hover: {
        bgGradient: `linear(to-r, ${colors.brand.yellow}e6, ${colors.brand.pink})e6`,
        _disabled: {
          bgGradient: `linear(to-r, ${colors.brand.yellow}, ${colors.brand.pink})`,
        },
      },
    },
    solid: {
      bg: colors.brand.yellow,
      color: 'black',
      _hover: {
        bg: `${colors.brand.yellow}e6`,
      },
    },
  },
  sizes: {
    md: {
      px: '32px',
      py: '24px',
    },
  },
  defaultProps: {
    variant: 'brand',
  },
};

export default Button;
