const { StatusCodes } = require('http-status-codes');

const validate = (yupSchema) => async (req, res, next) => {
  const data = req.body;
  try {
    await yupSchema.validate(data);
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

export default validate;
