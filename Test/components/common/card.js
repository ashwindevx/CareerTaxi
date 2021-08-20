import PropTypes from 'prop-types';
const { Box } = require('@chakra-ui/react');

const Card = ({ children, ...restProps }) => {
  return (
    <Box d="inline-block" rounded="2xl" shadow="md" overflow="hidden" {...restProps}>
      {children}
    </Box>
  );
};

Card.propTypes = {
  children: PropTypes.element,
};

export default Card;
