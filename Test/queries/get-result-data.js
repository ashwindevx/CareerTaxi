import axios from 'axios';
import { useQuery } from 'react-query';
import Api from 'queries/utils/apis';

const getResultReferenceData = () => axios.get(Api.RESULT_DATA_URL).then((res) => res.data);

const useResultReferenceData = () => {
  return useQuery([Api.RESULT_DATA_URL], getResultReferenceData);
};

export default useResultReferenceData;
