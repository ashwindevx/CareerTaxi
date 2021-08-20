import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Text, VStack } from '@chakra-ui/react';
import { isEmpty, pick } from 'lodash';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportDocument from 'components/pdf/report-document';
import { Card } from 'components/common';
import useResultReferenceData from 'queries/get-result-data';

const ReportDownload = ({ data }) => {
  const [isClient, setIsClient] = useState(false);
  const { data: resultRef, error, isLoading: dataLoading } = useResultReferenceData();
  const [results, setResults] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!resultRef) return;
    const scores = data?.scores || {};
    const results = Object.keys(scores).map((key) => {
      const score = scores[key];
      const indicators =
        resultRef[key]?.find((item) => item.range[0] <= score && item.range[1] > score)
          ?.indicators || [];

      return {
        label: key,
        score,
        indicators,
      };
    });
    setResults(results);
  }, [resultRef, data]);

  const userInfo = pick(data, ['name', 'career']);

  return (
    <Card d="flex" flexDirection="column" alignItems="center" maxW="4xl" p={12} bg="brand.darkGray">
      {isClient && !isEmpty(results) && (
        <PDFDownloadLink
          document={<ReportDocument userInfo={userInfo} results={results} />}
          fileName="report.pdf"
        >
          {({ loading: docLoading }) =>
            docLoading || dataLoading ? (
              <VStack p={8} fontSize="lg">
                <CircularProgress
                  isIndeterminate
                  capIsRound
                  size="64px"
                  thickness="16px"
                  color="brand.pink"
                  trackColor="none"
                />
                <Text mt={4} textAlign="center" color="brand.gray">
                  Preparing Report...
                </Text>
              </VStack>
            ) : (
              <VStack align="center" spacing={8}>
                <Text textAlign="center" fontSize="xl" px={4}>
                  We have scored your Intrinsic Motivation based on 5 parameters. Discover if you
                  are truly passionate about the {data?.career}
                </Text>
                <Button>Download Report</Button>
              </VStack>
            )
          }
        </PDFDownloadLink>
      )}
    </Card>
  );
};

export default ReportDownload;
