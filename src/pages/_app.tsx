import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from 'react-toastify';
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import store from "../store";
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = createTheme({});

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
