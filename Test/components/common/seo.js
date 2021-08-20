import Head from 'next/head';
import PropTypes from 'prop-types';

function SEO({ title }) {
  return (
    <Head>
      <title>{title ? `${title} | CareerTaxi` : 'CareerTaxi'}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Discover the career you love" />
    </Head>
  );
}

SEO.protoTypes = {
  title: PropTypes.string,
};

export default SEO;
