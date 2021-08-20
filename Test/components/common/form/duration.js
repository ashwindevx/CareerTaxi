import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input as ChakraInput,
  Select,
} from '@chakra-ui/react';

const Input = ({
  label,
  control,
  errorMessage,
  inputProps = {},
  selectProps = {},
  ...restProps
}) => {
  const { name } = inputProps;

  return (
    <FormControl w="sm" maxW="100%" {...restProps} isInvalid={!!errorMessage}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <HStack alignItems="center">
        <ChakraInput maxW="64px" {...inputProps} />
        <Select maxW="200px" {...selectProps}>
          <option value="week">Weeks</option>
          <option value="month">Months</option>
          <option value="year">Years</option>
        </Select>
      </HStack>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default Input;
