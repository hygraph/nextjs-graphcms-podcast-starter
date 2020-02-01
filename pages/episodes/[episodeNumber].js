import React, { useContext, useEffect } from "react";
import Head from "next/head";
const { GraphQLClient } = require("graphql-request");
import { Md } from "../../components/markdown-components";
import HeroImage from "../../components/HeroImage";
import Halftone from "../../components/Halftone";
import { PlayerContext } from "../../context/AudioPlayer";

const Episode = ({ currentEpisode }) => {
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
    <div>
      <div className="container relative z-10 px-4 md:px-0">
        <Head>
          <title>Episode {currentEpisode.episodeNumber}</title>
        </Head>

        <div className="flex flex-wrap">
          <div className="w-full md:w-2/6 flex flex-wrap content-center">
            <p className="uppercase text-sm mb-2 inline-block text-teal-400 font-bold tracking-widest">
              It's time for
            </p>
            <Md>{currentEpisode.title}</Md>
            <Md>{currentEpisode.description}</Md>
          </div>
          <HeroImage />
        </div>
      </div>
      <div className="-mt-20 overflow-hidden text-darkgray-800 w-full">
        <div className="flex" style={{ width: 1800, height: 375 }}>
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
        </div>
      </div>
    </div>
  );
};

export async function unstable_getStaticPaths(context) {
  const { data } = {
    data: {
      episodes: [
        {
          image: {
            url: "https://media.graphcms.com/meHpx8fTQWID8zd6aFvn"
          },
          episodeNumber: 1,
          title: "# How the rain in Spain, stays **mainly** on the plain.",
          description:
            "An interesting development has occurred in recent weeks, where the rain that falls in Spain is mostly on the plain. But what does that mean for the people who, you know, *actually live there?* We go in-depth with our expert on all things rain **AND** Spain. This will be a good one.",
          hosts: [
            {
              fullName: "Jesse Martin"
            },
            {
              fullName: "Jamie Barton"
            },
            {
              fullName: "Jonathan Steele"
            }
          ],
          tags: [
            {
              name: "GraphQL"
            },
            {
              name: "Schema Design"
            }
          ],
          categories: [
            {
              name: "Weekly"
            }
          ],
          resources: [
            {
              label: "New GraphCMS Website",
              url: "https://www.graphcms.com"
            }
          ],
          audioFile: {
            url: "https://media.graphcms.com/G8maGcTQQBWgiCKSkd6z"
          }
        }
      ]
    }
  };

  const episodes = [
    ...data.episodes,
    ...data.episodes,
    ...data.episodes,
    ...data.episodes,
    ...data.episodes,
    ...data.episodes,
    ...data.episodes,
    ...data.episodes
  ];

  return episodes.map((episode, index) => {
    params: {
      episodeNumber: index + 1;
    }
  });
}

export async function unstable_getStaticProps(context) {
  const {
    params: { episodeNumber }
  } = context;
  const query = `
  query SingleEpisode($episodeNumber: Int){
    episode(where: {
      episodeNumber: $episodeNumber
    }) {
      title
      description
      hosts {
        fullName
      }
      tags {
        name
      }
      categories {
        name
      }
      resources {
        label
        url
      }
      audioFile {
        url
        mimeType
      }
    }
  }
  `;

  const graphQLClient = new GraphQLClient(`${process.env.URL}/api/graphql`);
  const request = await graphQLClient.request(query, {
    episodeNumber: 1
  });
  const { episode } = request;

  return { props: { currentEpisode: episode } };
}

export default Episode;
