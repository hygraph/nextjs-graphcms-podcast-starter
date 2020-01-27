import Nav from "../components/nav";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-darkgray-700 min-h-screen overflow-hidden">
      <div className="w-full h-2 main-gradient mb-4" />
      <Nav />
      <Component {...pageProps} />
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