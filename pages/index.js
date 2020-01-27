import React from "react";
import Head from "next/head";
import Halftone from "../components/Halftone";

const Home = () => {
  return (
    <div>
      <div className="container relative z-10">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex">
          <div className="w-2/6 flex flex-wrap content-center">
            <p className="uppercase text-sm mb-2 inline-block text-teal-400 font-bold tracking-widest">
              It's time for
            </p>
            <h1 className="text-5xl text-gray-300 mb-6 font-bold font-serif tracking-wider leading-tight">
              A little Content Jazz Session
            </h1>
            <p className="text-gray-100 leading-normal tracking-wide text-xl">
              TGM is a podcast about meaning, disguised as a podcast about
              entrepreneurship. It’s a bright-eyed and sweary look at what it
              takes to make a living on the internet (and still sleep at night).
            </p>
          </div>
          <div className="w-4/6 flex justify-end">
            <div className="w-9/12 clearfix bg-darkgray-800 shadow-xl rounded-sm">
              <span className="h-0 float -ml-px w-px block pt-full" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex -mt-20 overflow-hidden text-darkgray-800 w-full">
        <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
        <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
        <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  return {};
};

export default Home;
