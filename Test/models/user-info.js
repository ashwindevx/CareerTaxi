import mongoose from 'mongoose';

const CounselorSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
  },
});

const UserInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    trim: true,
    lowercase: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  career: {
    type: String,
    maxlength: 128,
    required: true,
    trim: true,
  },
  careerExploreDuration: {
    type: Number,
    required: true,
  },
  counselor: CounselorSchema,
  scores: {
    type: Map,
    of: Number
  },
  referralCode: {
    type: String,
    maxlength: 128,
    trim: true,
  },
});

const UserInfo = mongoose.models.UserInfo || mongoose.model('UserInfo', UserInfoSchema);

export default UserInfo;
