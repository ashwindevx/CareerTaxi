import { useEffect } from 'react';
import { Page, Text, Document, StyleSheet, Font, View, Link, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  body: {
    width: 768,
    color: 'white',
    backgroundColor: '#0f0f0f',
    fontFamily: 'Poppins',
    fontSize: 12,
    paddingTop: 35,
    paddingBottom: 32,
    paddingHorizontal: 44,
  },
  logo: {
    width: 64,
    marginTop: 12,
    marginBottom: 32,
  },
  heading: {
    width: 356,
    fontWeight: 800,
    fontSize: 22,
    paddingBottom: 8,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 28,
  },
  userName: {
    fontSize: 20,
    fontWeight: 600,
  },
  userCareer: {
    fontSize: 16,
    fontWeight: 600,
  },
  subHead: {
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subHeadText: {
    fontSize: 16,
    fontWeight: 600,
    paddingLeft: 8,
  },
  subHeadIcon: {
    width: 28,
    height: 28,
  },
  scoreText: {
    fontWeight: 800,
    color: '#F30A49',
  },
  result: {
    paddingBottom: 24,
  },
  indicators: {
    paddingLeft: 16,
  },
  textHighlight: {
    color: '#FFC033',
  },
  li: {
    marginLeft: 12,
    textAlign: 'justify',
    paddingBottom: 4,
  },
  scoreLow: {
    color: '#F30A49',
    fontWeight: 800,
  },
  scoreMedium: {
    color: '#FFC033',
    fontWeight: 800,
  },
  scoreHigh: {
    color: '#00E209',
    fontWeight: 800,
  },
  followup: {
    fontSize: 14,
    fontWeight: 600,
    marginVertical: 12,
  },
  button: {
    width: 128,
    backgroundColor: '#FFC033',
    color: 'black',
    borderRadius: 8,
    fontWeight: 600,
    padding: 8,
    marginVertical: 16,
    textAlign: 'center',
  },
});

const icons = {
  'Interest/Enjoyment': 'interest.png',
  'Effort/Importance': 'effort.png',
  'Envision/Relatedness': 'envision.png',
  'Social Influence': 'social.png',
  'Perceived Competence': 'competence.png',
  'Money Driven': 'money.png',
};

const ScoreText = ({ score }) => {
  let style;
  if (score < 30) {
    style = styles.scoreLow;
  } else if (score < 80) {
    style = styles.scoreMedium;
  } else {
    style = styles.scoreHigh;
  }

  return <Text style={style}>{score}%</Text>;
};

const ListItem = ({ children, style }) => {
  return (
    <View
      style={[
        style,
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
      ]}
    >
      <View
        style={{ width: 4, height: 4, backgroundColor: 'white', borderRadius: '50%', marginTop: 6 }}
      ></View>
      <Text style={{ marginLeft: 6 }}>{children}</Text>
    </View>
  );
};

const Indicators = ({ indicators }) => {
  const generateIndicator = (indicator) => {
    if (Array.isArray(indicator)) {
      return <View style={styles.li}>{indicator.map((item) => generateIndicator(item))}</View>;
    }
    return <ListItem style={styles.li}>{indicator}</ListItem>;
  };

  return (
    <View style={styles.indicators}>
      {indicators.map((indicator) => generateIndicator(indicator))}
    </View>
  );
};

// Create Document Component
const ReportDocument = ({ userInfo, results }) => {
  useEffect(() => {
    Font.register({
      family: 'Poppins',
      fonts: [
        {
          src: 'https://cdn.jsdelivr.net/npm/@openfonts/poppins_all@1.44.7/files/poppins-all-400.woff',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/@openfonts/poppins_all@1.44.7/files/poppins-all-600.woff',
          fontWeight: 600,
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/@openfonts/poppins_all@1.44.7/files/poppins-all-800.woff',
          fontWeight: 800,
        },
      ],
    });
  }, []);

  return (
    <Document>
      <Page style={styles.body} size="A4">
        <Image style={styles.logo} src={`${window.origin}/images/logo.png`} alt="logo" />
        <Text style={styles.heading}>
          Your <Text style={styles.textHighlight}>Intrinsic Motivation Test</Text> Results Are
          Ready!
        </Text>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userInfo?.name}</Text>
          <Text style={styles.userCareer}>{userInfo?.career}</Text>
        </View>

        {results.map((item, i) => (
          <View key={item.label} style={styles.result}>
            <View style={styles.subHead}>
              <Image
                src={`${window.origin}/images/${icons[item.label]}`}
                alt="list item"
                style={styles.subHeadIcon}
              />
              <Text style={styles.subHeadText}>
                {item.label} - <ScoreText score={item.score} />
              </Text>
            </View>
            <Indicators indicators={item.indicators} />
          </View>
        ))}

        <Text style={styles.followup}>
          On average, students explore only 3 career options thoroughly. If that sounds like you,
          join our 10-week career exploration program and explore the top 10 career options that
          suit you best, and find what you are truly passionate about
        </Text>

        <Link style={styles.button} src="https://wa.me/919168833977">
          WhatsApp Us
        </Link>
      </Page>
    </Document>
  );
};

export default ReportDocument;
