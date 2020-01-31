import { useEffect, useReducer } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/Footer";
import "../styles/main.css";
import { PlayerProvider, initialState, reducer } from "../context/AudioPlayer";
import AudioPlayer from "../components/AudioPlayer";

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="bg-darkgray-700 min-h-screen max-w-screen overflow-hidden">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <PlayerProvider value={{ state, dispatch }}>
        <Component {...pageProps} />
        <AudioPlayer />
      </PlayerProvider>

      <Footer />
    </div>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
