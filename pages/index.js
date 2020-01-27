import React from "react";
import Head from "next/head";
import Episodes from "../components/Episodes";

const Home = ({ feeds, episodes }) => {
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
            <p className="text-gray-100 leading-normal tracking-wide text-xl mb-12">
              TGM is a podcast about meaning, disguised as a podcast about
              entrepreneurship. It’s a bright-eyed and sweary look at what it
              takes to make a living on the internet (and still sleep at night).
            </p>
            <div className="flex flex-wrap -mx-2 justify-start">
              {feeds &&
                feeds.map((feed, index) => {
                  return (
                    <a href={feed.feed} className="m-2" key={index}>
                      <img src={feed.badge} />
                    </a>
                  );
                })}
            </div>
          </div>
          <div className="w-4/6 flex justify-end">
            <div className="w-9/12 bg-darkgray-800 shadow-xl rounded-sm">
              <span className="h-0 float -ml-px w-px block pt-full" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Episodes episodes={episodes} />
    </div>
  );
};

Home.getInitialProps = async () => {
  const { data } = {
    data: {
      episodes: [
        {
          image: {
            url: "https://media.graphcms.com/meHpx8fTQWID8zd6aFvn"
          },
          episodeNumber: 1,
          title: "How the rain in Spain, stays **mainly** on the plain.",
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
    episodes: [
      ...data.episodes,
      ...data.episodes,
      ...data.episodes,
      ...data.episodes
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
