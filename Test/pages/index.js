import { useRouter } from 'next/router';
import { Box, Heading, Wrap, WrapItem, UnorderedList, ListItem, Text } from '@chakra-ui/react';
import { Layout, SEO } from 'components/common';
import TestCard from 'components/test-card';
import Routes from 'utils/routes';
import { CalenderIcon, LeadershipIcon } from 'components/icons';

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <SEO />
      <Box p={{ base: 4, sm: 8, lg: 16 }}>
        <Heading as="h1" fontSize="5xl">
          Assessment{' '}
          <Box as="span" color="brand.yellow">
            Test
          </Box>
        </Heading>

        <Wrap mt={8} spacing={8}>
          <WrapItem>
            <TestCard
              title={
                <>
                  Intrinsic{' '}
                  <Box as="span" color="brand.yellow">
                    Motivation Test
                  </Box>
                </>
              }
              icon={<LeadershipIcon width={48} height={48} />}
              description="Already made up mind to choose career path? Check if you are intrinsically motivated."
              onClick={() => {
                router.push(Routes.INTRINSIC_MOTIVATION_TEST);
              }}
              minW={350}
              maxW={500}
            />
          </WrapItem>

          <WrapItem>
            <TestCard
              title={
                <>
                  Weekly{' '}
                  <Box as="span" color="brand.yellow">
                    Reflection Test
                  </Box>
                </>
              }
              icon={<CalenderIcon width={48} height={48} />}
              description="5-min test to reflect upon your intrinsic motivation for the career explored last week."
              onClick={() => {
                router.push(Routes.WEEKLY_REFLECTION_TEST);
              }}
              minW={350}
              maxW={500}
            />
          </WrapItem>
        </Wrap>

        <Box my={8}>
          <Text fontSize="xl">
            Pro{' '}
            <Box as="span" color="brand.yellow">
              Tips
            </Box>
          </Text>
          <UnorderedList color="gray.400">
            <ListItem>Be honest. The test is a tool to help you discover the truth.</ListItem>
            <ListItem>Don’t overthink, choose the answer that first comes to your mind.</ListItem>
            <ListItem>The test results are suggestive and not 100% accurate.</ListItem>
          </UnorderedList>
        </Box>
      </Box>
    </Layout>
  );
}
