import { Button, Center, Text, VStack } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { Layout, SEO } from 'components/common';

export default function IntrinsicMotivationTest() {
  return (
    <Layout>
      <SEO title="Assessment Test" />
      <Center py={32} px={4}>
        <VStack>
          <Text fontSize="2xl" fontWeight="bold" color="brand.yellow" textAlign="center">
            Coming Soon!
          </Text>
          <NextLink href="/" as={'/'}>
            <Button>Go Back</Button>
          </NextLink>
        </VStack>
      </Center>
    </Layout>
  );
}
