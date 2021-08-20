import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { Header, Footer } from 'components/common';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Box component="main" minHeight="80vh">
        {children}
      </Box>
      <Footer />
    </>
  );
}

Layout.protoTypes = {
  children: PropTypes.element,
};

export default Layout;
