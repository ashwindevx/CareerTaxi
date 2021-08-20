import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Button,
  CircularProgress,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  Center,
  ScaleFade,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AssessmentQuestion from 'components/assessment/assessment-question';
import useTestData from 'queries/get-test-data';

const AssessmentCarousel = ({ onSubmit, ...restProps }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { data, error, isLoading } = useTestData();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!data) return;
    const initAnswers = Array.from({ length: data.length }).fill(0);
    setAnswers(initAnswers);
  }, [data]);

  useEffect(() => {
    if (!errorMessage) return;
    const timeout = setTimeout(() => setErrorMessage(null), 4000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  const nextSlide = () => setCurrentSlide(currentSlide + 1);
  const prevSlide = () => setCurrentSlide(currentSlide - 1);

  const handleChangeSlide = (i) => {
    if (currentSlide !== i) {
      setCurrentSlide(i);
    }
  };

  const handleOnAnswerSelected = useCallback((index, value) => {
    setAnswers((answers) => answers.map((v, i) => (index === i ? value : v)));
    setCurrentSlide((currentSlide) => currentSlide + 1);
  }, []);

  const handleSubmit = () => {
    const omitIdx = answers.findIndex((v) => v === 0);
    if (omitIdx >= 0) {
      setErrorMessage('Please answer all questions...');
      setCurrentSlide(omitIdx);
    } else {
      const countPerCategory = {};
      const scorePerCategory = {};
      answers.forEach((score, i) => {
        const category = data[i]['Category'];
        countPerCategory[category] = countPerCategory[category]
          ? countPerCategory[category] + 1
          : 1;
        scorePerCategory[category] = scorePerCategory[category]
          ? scorePerCategory[category] + score
          : score;
      });

      const scores = {};
      Object.keys(scorePerCategory).forEach((category) => {
        const maxScore = 5 * countPerCategory[category];
        scores[category] = Math.round((scorePerCategory[category] * 100) / maxScore);
      });
      onSubmit && onSubmit(scores);
    }
  };

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === answers.length - 1;

  if (isLoading) {
    return (
      <VStack fontSize="lg" {...restProps}>
        <CircularProgress
          isIndeterminate
          capIsRound
          size="64px"
          thickness="16px"
          color="brand.pink"
          trackColor="none"
        />
        <Text mt={4} textAlign="center" color="brand.gray">
          Getting Ready...
        </Text>
      </VStack>
    );
  }

  if (!isLoading && error) {
    return (
      <Box p={8} color="brand.pink" fontSize="lg">
        Uh...oh! Something went wrong :(
      </Box>
    );
  }

  if (data?.length && data.length === 0) {
    return (
      <Box p={8} color="brand.yellow" fontSize="lg">
        No questions found...so empty...
      </Box>
    );
  }

  return (
    <Flex direction="column" justify="flex-start" align="center" maxW={'100%'} {...restProps}>
      <Flex
        rounded="lg"
        w="100%"
        maxW="5xl"
        justify="center"
        flexDirection="column"
        align="stretch"
        overflow="hidden"
      >
        <Box as="form" maxW="100%">
          <Carousel
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            selectedItem={currentSlide}
            onChange={handleChangeSlide}
            transitionTime={300}
          >
            {data.map((item, i) => (
              <AssessmentQuestion
                key={i}
                id={i}
                px={4}
                questionText={item['Question']}
                maxW={'100%'}
                isReverse={item['Reverse'] && item['Reverse'].toLowerCase() === 'yes'}
                onChange={handleOnAnswerSelected}
              />
            ))}
          </Carousel>
          <Center height="32px" p={0}>
            <ScaleFade in={!!errorMessage} initialScale={0.8}>
              <Alert status="error" variant="solid" maxW="md" minW="xs" height="32px" rounded="md">
                <AlertIcon width={4} />
                <AlertDescription fontSize="sm">{errorMessage}</AlertDescription>
                <CloseButton
                  size="sm"
                  position="absolute"
                  right="8px"
                  onClick={() => setErrorMessage(null)}
                />
              </Alert>
            </ScaleFade>
          </Center>
        </Box>

        <Flex px={8} py={4} w="100%" justify="space-between">
          <Button visibility={isFirstSlide ? 'hidden' : 'visible'} onClick={prevSlide}>
            Prev
          </Button>
          <Button visibility={isLastSlide ? 'hidden' : 'visible'} onClick={nextSlide}>
            Next
          </Button>
        </Flex>
      </Flex>

      <Button onClick={handleSubmit}>Submit</Button>
    </Flex>
  );
};

AssessmentCarousel.propTypes = {
  data: PropTypes.array,
};

export default AssessmentCarousel;
