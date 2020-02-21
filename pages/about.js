import React from "react";
import Head from "next/head";
import { MdHero } from "../components/markdown-components";
const PAGE = "About";

const About = ({ page }) => {
  return (
    <div className="w-full">
      <div className="container relative z-10">
        <Head>
          <title>{PAGE}</title>
        </Head>

        <div className="flex flex-wrap items-start">
          <div className="flex flex-wrap content-center w-full md:w-3/6">
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

export async function unstable_getServerProps(context) {
  const { graphQLClient } = require("../clients/_read_client");
  const query = `
        query PageContent($label: String){
          page(where: {
              label: $label
          }) {
              content
              }
          }
        `;
  const { page } = await graphQLClient.request(query, {
    label: PAGE
  });

  return { props: { page } };
}

export default About;
