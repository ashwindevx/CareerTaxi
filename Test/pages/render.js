import React, { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ReportDocument from 'components/pdf/report-document';
import useResultReferenceData from 'queries/get-result-data';

const PDFPreview = ({ scores }) => {
  const [isClient, setIsClient] = useState(false);
  const { data: resultRef, error, isLoading } = useResultReferenceData();
  const [results, setResults] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!resultRef) return;
    const scores = {
      'Interest/Enjoyment': 27,
      'Envision/Relatedness': 60,
      'Social Influence': 82,
    };
    const results = Object.keys(scores).map((key) => {
      const score = scores[key];
      const indicators = resultRef[key].find(
        (item) => item.range[0] <= score && item.range[1] > score,
      )?.indicators;

      return {
        label: key,
        score,
        indicators,
      };
    });
    setResults(results);
  }, [resultRef]);

  return (
    <div style={{ height: '95vh' }}>
      {isClient && (
        <PDFViewer width="100%" height="100%">
          <ReportDocument userInfo={{ name: 'Bruce Wayne', career: 'Batman' }} results={results} />
        </PDFViewer>
      )}

      <div>
        {isClient && (
          <PDFDownloadLink document={<ReportDocument results={results} />} fileName="somename.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
};

export default PDFPreview;
