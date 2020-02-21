import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { MdHero } from "../components/markdown-components";
import { PlayerContext } from "../context/AudioPlayer";
const PAGE = "About";

const About = ({ page, currentEpisode }) => {
  const {
    state: { playing, episode },
    dispatch
  } = useContext(PlayerContext);

  useEffect(() => {
    if (!episode) {
      dispatch({ type: "setEpisode", payload: currentEpisode });
    }
  }, []);

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

export async function unstable_getStaticProps(context) {
  const { graphQLClient } = require("../clients/_read_client");
  const query = `
        query PageContent($label: String){
          page(where: {
              label: $label
          }) {
              content
              }
              episodes(first: 1) {
                title
                audioFile {
                  url
                  mimeType
                }
                audioDuration
              }
          }
        `;
  const { page, episodes } = await graphQLClient.request(query, {
    label: PAGE
  });

  return { props: { page, currentEpisode: episodes[0] } };
}

export default About;
