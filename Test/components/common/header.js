import { default as NextLink } from 'next/link';
import { Button, Flex, HStack, Link, useBreakpointValue } from '@chakra-ui/react';
import { CareerTaxiLogo } from 'components/icons';
import Routes from 'utils/routes';

const Header = () => {
  const btnSize = useBreakpointValue({ base: 'sm', sm: 'md' });
  return (
    <Flex
      as="header"
      justify="space-between"
      alignItems="center"
      flexDirection="row"
      px={16}
      py={8}
    >
      <NextLink href={Routes.HOME} as={Routes.HOME}>
        <Link>
          <CareerTaxiLogo width={64} height={64} />
        </Link>
      </NextLink>
      <HStack as="nav" spacing={{ base: 4, sm: 8 }}>
        <NextLink href="https://wa.me/919168833977" passHref={true}>
          <Button size={btnSize}>Get In Touch</Button>
        </NextLink>
      </HStack>
    </Flex>
  );
};

export default Header;
