import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Box, RadioGroup, Radio, Flex, FormLabel, FormControl } from '@chakra-ui/react';

const StyledRadio = ({ value, children }) => {
  return (
    <Radio size="lg" flexDirection={{ base: 'row', md: 'column' }} value={value}>
      <Box pt={2} textAlign="center">
        {children}
      </Box>
    </Radio>
  );
};

const AssessmentQuestion = ({ id, questionText, isReverse = false, onChange, ...restProps }) => {
  const [value, setValue] = useState(0);

  const handleChange = (value) => {
    const v = parseInt(value);
    setValue(v);
    onChange && onChange(id, v);
  };

  /**
   * Expecting the number of answer choices is 5
   */
  const genValue = (v) => (isReverse ? 6 - v : v);

  return (
    <FormControl as="fieldset" w="100%" spacing={8} isRequired {...restProps}>
      <FormLabel
        as="legend"
        fontSize="2xl"
        fontWeight="normal"
        textAlign={{ base: 'start', md: 'center' }}
      >
        {questionText}
      </FormLabel>
      <RadioGroup w="100%" value={value} onChange={handleChange}>
        <Flex justify={{ base: 'space-between' }} flexDirection={{ base: 'column', md: 'row' }}>
          <StyledRadio value={genValue(1)}>Strongly Disagree</StyledRadio>
          <StyledRadio value={genValue(2)}>Disagree</StyledRadio>
          <StyledRadio value={genValue(3)}>Undecided</StyledRadio>
          <StyledRadio value={genValue(4)}>Agree</StyledRadio>
          <StyledRadio value={genValue(5)}>Strongly Agree</StyledRadio>
        </Flex>
      </RadioGroup>
    </FormControl>
  );
};

AssessmentQuestion.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  questionText: PropTypes.string.isRequired,
  isReverse: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

export default memo(AssessmentQuestion);
