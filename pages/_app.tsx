import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { SessionProvider as AuthProvider } from "next-auth/react";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>ユーザーマネージメント</title>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <ChakraProvider>
        <AuthProvider session={pageProps.session}>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
