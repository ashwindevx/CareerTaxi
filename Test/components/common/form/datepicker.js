import { forwardRef } from 'react';
import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <Button variant="solid" onClick={onClick} ref={ref}>
    {value}
  </Button>
));
CustomDateInput.displayName = 'CustomDateInput';

const DateInput = ({ label, control, name, defaultValue, ...restProps }) => {
  return (
    <FormControl w="sm" maxW="100%" {...restProps}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <DatePicker
            placeholderText={label}
            onChange={(date) => field.onChange(date)}
            selected={field.value || defaultValue}
            dateFormat="dd MMMM yyyy"
            maxDate={new Date()}
            customInput={<CustomDateInput />}
            showYearDropdown
          />
        )}
      />
    </FormControl>
  );
};

export default DateInput;
