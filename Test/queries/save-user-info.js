import axios from 'axios';
import { useMutation } from 'react-query';
import Api from 'queries/utils/apis';

const saveUserInfo = (data) => {
  return axios.post(Api.USER_INFO, data).then((res) => res.data);
};

const useSaveUserInfo = () => {
  return useMutation((userInfo) => saveUserInfo(userInfo));
};

export default useSaveUserInfo;
