import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput } from '@chakra-ui/react';

const Input = ({ label, errorMessage, inputProps = {}, ...restProps }) => {
  const { name } = inputProps;

  return (
    <FormControl w="sm" maxW="100%" {...restProps} isInvalid={!!errorMessage}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput {...inputProps} />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default Input;
