import PropTypes from 'prop-types';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { PaperIcon, RightArrowIcon } from 'components/icons';
import { Card } from 'components/common';

const TestCard = ({ title, description, onClick, icon, ...restProps }) => {
  return (
    <Box
      className="ct__test-card"
      position="relative"
      _hover={{ cursor: 'pointer' }}
      mt="48px"
      onClick={onClick}
      {...restProps}
    >
      <Center
        position="absolute"
        top="-48px"
        left={16}
        d="inline-block"
        bg="brand.yellow"
        rounded="full"
        p={8}
      >
        {icon}
      </Center>

      <Card bg="brand.darkGray" height="100%">
        <Flex justify="space-between" align="stretch" height="100%">
          <Box p={8} pt={28} pb={16}>
            <Heading fontWeight="medium" fontSize="2xl">
              {title}
            </Heading>
            <Text mt={4} color="gray.400" fontSize="lg">
              {description}
            </Text>
          </Box>
          <Center
            bg="brand.yellow"
            px={4}
            sx={{
              '.ct__test-card:hover &': {
                bg: 'brand.pink',
                fill: 'white',
              },
            }}
          >
            <RightArrowIcon width={28} fill="white" />
          </Center>
        </Flex>
      </Card>
    </Box>
  );
};

TestCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func,
};

export default TestCard;
