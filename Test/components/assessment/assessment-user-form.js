import { Box, Flex, VStack, Heading, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { pick, round } from 'lodash';
import { Input, DateInput, DurationInput } from 'components/common/form';

const validationSchema = yup.object().shape({
  name: yup.string().max(128, 'Too long!').required('Name is required!'),
  email: yup.string().email('Invalid email!').max(128, 'Too long!').required('Email is required!'),
  counselorName: yup.string().max(128, 'Too long!'),
  counselorEmail: yup.string().email('Invalid email!').max(128, 'Too long!'),
  duration: yup
    .number('Invalid number!')
    .positive('Enter a positive number!')
    .typeError('Invalid number!')
    .required('This is required!'),
  durationUnit: yup.string().oneOf(['week', 'month', 'year']).required(),
  referralCode: yup.string().max(128, 'Too long!'),
});

const AssessmentUserForm = ({ onSubmit: submit, isLoading, ...restProps }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (values) => {
    const data = pick(values, ['name', 'email', 'referralCode']);
    data.dob = new Date(values?.dob).toISOString();
    data.counselor = {
      name: values.counselorName,
      email: values.counselorEmail,
    };

    const multiplier = { week: 7, year: 365, month: 30 }[values.durationUnit] || 7; // defaults to week
    data.careerExploreDuration = round(values.duration * multiplier);

    submit && submit(data);
  };

  return (
    <Flex direction="column" as="form" w="100%" {...restProps} onSubmit={handleSubmit(onSubmit)}>
      <Heading pb={8}>Almost There!</Heading>
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
        <VStack spacing={4} mr={{ base: 0, md: 4 }}>
          <Input label="Name" errorMessage={errors.name?.message} inputProps={register('name')} />
          <Input
            label="Email"
            errorMessage={errors.email?.message}
            inputProps={register('email')}
          />
          <DateInput
            label="Date of Birth"
            control={control}
            defaultValue={new Date(2000, 0, 1)}
            name="dob"
          />
        </VStack>

        <VStack spacing={4} mt={{ base: 4, md: 0 }}>
          <Input
            label="Counselor's Name (optional)"
            errorMessage={errors.counselorName?.message}
            inputProps={register('counselorName')}
          />

          <Input
            label="Counselor's Email (optional)"
            errorMessage={errors.counselorEmail?.message}
            inputProps={register('counselorEmail')}
          />

          <DurationInput
            label="How long have you explored this profession?"
            inputProps={register('duration')}
            selectProps={register('durationUnit')}
            errorMessage={errors.duration?.message}
          />

          <Input
            label="Referral Code (optional)"
            errorMessage={errors.referralCode?.message}
            inputProps={register('referralCode')}
          />
        </VStack>
      </Flex>
      <Button alignSelf="center" my={8} type="submit" isLoading={isLoading}>
        Submit
      </Button>
    </Flex>
  );
};

export default AssessmentUserForm;
