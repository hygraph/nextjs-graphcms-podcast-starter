import React from "react";
import Head from "next/head";
import FetchPageData from "../components/FetchPageData";
import { MdHero } from "../components/markdown-components";
const PAGE = "About";

const About = ({ page, resources }) => {
  return (
    <div>
      <div className="container relative z-10 px-4 md:px-0">
        <Head>
          <title>{PAGE}</title>
        </Head>

        <div className="flex flex-wrap items-start">
          <div className="flex flex-wrap content-center w-full md:w-2/6">
            <p className="inline-block mb-2 text-sm font-bold tracking-widest text-teal-400 uppercase">
              It's time for
            </p>
            <MdHero>{page.content}</MdHero>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function unstable_getStaticProps(context) {
  const { page } = await FetchPageData(context, PAGE);
  return { props: { page } };
}

export default About;
