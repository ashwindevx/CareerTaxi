import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { styles, fonts, colors, components, shadows } from 'theme';

const theme = extendTheme({
  styles,
  fonts,
  colors,
  components,
  shadows,
});
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} resetCSS={true}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
