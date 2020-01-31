import React from "react";
import Head from "next/head";
import HeroImage from "../../components/HeroImage";

const Episode = () => {
  return (
    <div>
      <div className="container relative z-10 px-4 md:px-0">
        <Head>
          <title>Episode</title>
        </Head>

        <div className="flex flex-wrap">
          <div className="w-full md:w-2/6 flex flex-wrap content-center">
            <p className="uppercase text-sm mb-2 inline-block text-teal-400 font-bold tracking-widest">
              It's time for
            </p>
            <h1 className="text-5xl text-gray-300 mb-6 font-bold font-serif tracking-wider leading-tight">
              A little Content Jazz Session
            </h1>
            <p className="text-gray-100 leading-normal tracking-wide text-xl mb-12">
              TGM is a podcast about meaning, disguised as a podcast about
              entrepreneurship. It’s a bright-eyed and sweary look at what it
              takes to make a living on the internet (and still sleep at night).
            </p>
          </div>
          <HeroImage />
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
      episode: index + 1;
    }
  });
}

export async function unstable_getStaticProps(context) {
  console.log(context);
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

  return {
    props: {
      episode: data.episodes[0]
    }
  };
}

export default Episode;
