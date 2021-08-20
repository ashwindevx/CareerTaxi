import { useQuery } from 'react-query';
import Papa from 'papaparse';

const TEST_DATA_URL =
  'https://docs.google.com/spreadsheets/d/1HkoiQTzr3xUEEQDLxZ8nJZDKwTknZjMgRqJ9qW3oQpA/export?format=csv&gid=0';

const getTestData = () => {
  return new Promise((resolve, reject) => {
    Papa.parse(TEST_DATA_URL, {
      download: true,
      header: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};

const useTestData = () => {
  return useQuery([TEST_DATA_URL], getTestData);
};

export default useTestData;
