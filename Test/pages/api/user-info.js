import nc from 'next-connect';
import { pick, mapValues } from 'lodash';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import * as yup from 'yup';
import UserInfo from 'models/user-info';
import dbConnect from 'lib/db';
import validate from 'lib/middlewares/validation';

const saveUserInfoSchema = yup.object().shape({
  name: yup.string().max(128, 'Too long!').required('Name is required!'),
  email: yup.string().email('Invalid email!').max(128, 'Too long!').required('Email is required!'),
  dob: yup.date('Invalid date!').required('Date is required!'),
  career: yup.string().max(128, 'Too long!').required('Career is required!'),
  careerExploreDuration: yup
    .number('Invalid number!')
    .positive('Enter a positive number!')
    .typeError('Invalid number!')
    .required('Explore Duration is required!'),
    counselor: yup.object().shape({
      name: yup.string().max(128, 'Too long!'),
      email: yup.string().email('Invalid email!').max(128, 'Too long!'),
    }),
    scores: yup.lazy((scores) => yup.object(mapValues(scores, () => yup.number('Invalid number!').positive('Score must positive!').typeError('Invalid number!').required('Score is required!'))).required('Scores are required!')),
  referralCode: yup.string().max(128, 'Too long!'),
});

const handler = nc({
  onNoMatch(_req, res) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
  },
});

handler.post(validate(saveUserInfoSchema), async (req, res) => {
  try {
    await dbConnect();
    const userInfoData = pick(req.body, [
      'name',
      'email',
      'career',
      'dob',
      'careerExploreDuration',
      'counselor',
      'scores',
      'referralCode',
    ]);

    const userInfo = await UserInfo.create(userInfoData);
    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
});

export default handler;
