import { useState, useReducer } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/Footer";
import "../styles/main.css";
import { PlayerProvider, initialState, reducer } from "../context/AudioPlayer";
import { NewsletterProvider } from "../context/NewsletterContext";
import AudioPlayer from "../components/AudioPlayer";
import Newsletter from "../components/Newsletter";

function MyApp({ Component, pageProps }) {
  const [subscriberBoxOpen, toggleSubscriberBox] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="flex flex-col flex-wrap min-h-screen overflow-hidden bg-darkgray-700 max-w-screen">
      <NewsletterProvider value={{ subscriberBoxOpen, toggleSubscriberBox }}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <PlayerProvider value={{ state, dispatch }}>
          <Component {...pageProps} />
          <AudioPlayer />
          <Newsletter />
        </PlayerProvider>
        <Footer />
      </NewsletterProvider>
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
