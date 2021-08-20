import { useState } from 'react';
import { Box, Button, Center, Heading, Input, Text } from '@chakra-ui/react';

const AssessmentInitials = ({ onSubmit, ...restProps }) => {
  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(`${event.target.value}`.trim());

  return (
    <Box {...restProps}>
      <Heading pb={4}>Let&apos;s Get Started</Heading>

      <Text pb={2}>
        Hi there, The Intrinsic motivation test you&apos;re about to take is designed to evaluate
        the career choice you have already made for yourself. The test aims to find whether your
        career choice is intrinsically motivated or not. It is very important that you follow up
        with us after the test to better understand the results of the test. You can take this test
        multiple times if you have multiple career choices. If you are confused and can&apos;t
        decide on one career option that best suits you, we would suggest getting in touch with our
        counsellors for more guidance.
      </Text>

      <Text pb={2}>
        Please try to answer all the questions with the context of your career choice. All questions
        are supposed to be answered on a scale of 1 to 5, 1 means that you strongly disagree with
        the said statement about your career choice and 5 means that you strongly agree. Try to
        answer all the questions with honesty and sincerity. Let&apos;s begin by entering the name
        of your career choice.
      </Text>

      <Text py={4}>Enter your career choice</Text>
      <Input
        value={value}
        onChange={handleChange}
        maxW="sm"
        placeholder="For example, Engineering, Marketing, etc."
      />
      <Center pt={12}>
        <Button onClick={() => onSubmit(value)} disabled={!value}>
          Let&apos;s Start The Test
        </Button>
      </Center>
    </Box>
  );
};

export default AssessmentInitials;
