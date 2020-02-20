import React from "react";
import Head from "next/head";
import FetchPageData from "../components/FetchPageData";
import { MdHero } from "../components/markdown-components";
const PAGE = "About";

const About = ({ page }) => {
  return (
    <div>
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
  const { GraphQLClient } = require("graphql-request");
  const query = `
        query PageContent($label: String){
          page(where: {
              label: $label
          }) {
              content
              }
          }
        `;

  const graphQLClient = new GraphQLClient(`${process.env.URL}/api/graphql`);
  const { page } = await graphQLClient.request(query, {
    label: PAGE
  });

  return { props: { page } };
}

export default About;
