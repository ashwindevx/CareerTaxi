import { Center, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Center as="footer" p={8} bg="brand.darkGray">
      <Text>Copyright &#169; {new Date().getFullYear()} | All Rights Reserved</Text>
    </Center>
  );
};

export default Footer;
