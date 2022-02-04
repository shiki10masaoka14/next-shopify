import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { SessionProvider as AuthProvider } from "next-auth/react";
import Head from "next/head";

const App = (
  { Component, pageProps }: AppProps,
  session,
) => {
  return (
    <>
      <Head>
        <title>ユーザーマネージメント</title>
        <link rel="icon" href="favicon.svg" />
      </Head>
      <AuthProvider session={session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
};

export default App;
