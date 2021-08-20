import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Center } from '@chakra-ui/react';
import { Layout, SEO } from 'components/common';
import AssessmentCarousel from 'components/assessment/assessment-carousel';
import ReportDownload from 'components/pdf/report-download';
import AssessmentInitials from 'components/assessment/assessment-initials';
import AssessmentUserForm from 'components/assessment/assessment-user-form';
import useSaveUserInfo from 'queries/save-user-info';

export default function IntrinsicMotivationTest() {
  const router = useRouter();
  const [reportData, setReportData] = useState({ career: '', scores: {} });
  const { data, isLoading, error, mutate: saveUserInfo } = useSaveUserInfo();

  useEffect(() => {
    if (data) {
      router.push('?component=report', undefined, { shallow: true });
    }

    if (error) {
      console.log(error);
      alert('Something went wrong!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const handleStartTest = (value) => {
    setReportData({ ...reportData, career: value });
    router.push('?component=test', undefined, { shallow: true });
  };

  const handleUserInfoSubmit = (userInfo) => {
    const data = { ...userInfo, scores: reportData.scores, career: reportData.career };
    setReportData({ ...reportData, name: userInfo.name });
    saveUserInfo(data);
  };

  const handleSubmit = (scores) => {
    setReportData({ ...reportData, scores });
    router.push('?component=info', undefined, { shallow: true });
  };

  const component = router.query.component;
  return (
    <Layout>
      <SEO title="Assessment Test" />
      <Center py={8} px={4}>
        {!component && <AssessmentInitials maxW="2xl" onSubmit={handleStartTest} />}
        {component === 'test' && <AssessmentCarousel py={16} onSubmit={handleSubmit} />}
        {component === 'info' && (
          <AssessmentUserForm maxW="4xl" isLoading={isLoading} onSubmit={handleUserInfoSubmit} />
        )}
        {component === 'report' && <ReportDownload py={16} data={reportData} />}
      </Center>
    </Layout>
  );
}
