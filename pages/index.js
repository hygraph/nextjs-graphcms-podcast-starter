import React from "react";
import Head from "next/head";
const { GraphQLClient } = require("graphql-request");
import Episodes from "../components/Episodes";
import FeedBadges from "../components/FeedBadges";
import HeroImage from "../components/HeroImage";

const Home = ({ feeds, episodes }) => {
  return (
    <div>
      <div className="container relative z-10 px-4 md:px-0">
        <Head>
          <title>Home</title>
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
            <FeedBadges feeds={feeds} />
          </div>
          <HeroImage />
        </div>
      </div>
      <Episodes episodes={episodes} />
    </div>
  );
};

Home.getInitialProps = async () => {
  const query = `
    {
      episodes {
        title
        description
        image {
          url
        }
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
        audioDuration
      }
    }
  `;

  const graphQLClient = new GraphQLClient(`${process.env.URL}/api/graphql`);
  const request = await graphQLClient.request(query);
  const { episodes } = request;

  return {
    episodes: [
      ...episodes,
      ...episodes,
      ...episodes,
      ...episodes,
      ...episodes,
      ...episodes,
      ...episodes,
      ...episodes
    ],
    feeds: [
      {
        platform: "apple",
        feed: "/",
        badge: "/apple/US_UK_Apple_Podcasts_Listen_Badge_RGB.svg"
      },
      {
        platform: "google",
        feed: "/",
        badge: "/google/google_podcasts_badge_svg.svg"
      },
      {
        platform: "spotify",
        feed: "/",
        badge: "/spotify/spotify-podcast-badge-blk-grn-165x40.svg"
      }
    ]
  };
};

export default Home;
