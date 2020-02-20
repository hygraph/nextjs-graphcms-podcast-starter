import React from "react";
import Head from "next/head";
const { GraphQLClient } = require("graphql-request");
import Episodes from "../components/Episodes";
import FeedBadges from "../components/FeedBadges";
import HeroImage from "../components/HeroImage";
import { MdHero } from "../components/markdown-components";

const Home = ({ page, feeds, episodes, sponsorships }) => {
  return (
    <div>
      <div className="container relative z-10 px-4 md:px-0">
        <Head>
          <title>Home</title>
        </Head>

        <div className="flex flex-wrap items-start">
          <div className="flex flex-wrap content-center w-full md:w-2/6">
            <p className="inline-block mb-2 text-sm font-bold tracking-widest text-teal-400 uppercase">
              It's time for
            </p>
            <MdHero>{page.content}</MdHero>
            <FeedBadges feeds={feeds} />
          </div>
          <HeroImage />
        </div>
      </div>
      <Episodes episodes={episodes} sponsorships={sponsorships} />
    </div>
  );
};

Home.getInitialProps = async () => {
  const query = `
  query PageContent($label: String){
    page(where: {
        label: $label
    }) {
        content
        }
    sponsorships(where: {
      NOT: {
        position: null
      }
    }) {
      id
      title
      body
      position
    }
  
  episodes {
    title
    description
    image {
      url
    }
    hosts {
      fullName
      photo {
        url
      }
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

feeds {
  platform
  url
  badge {
    url
  }
}
}
  `;

  const graphQLClient = new GraphQLClient(`${process.env.URL}/api/graphql`);

  const request = await graphQLClient.request(query, { label: "Home" });
  const { page, episodes, feeds, sponsorships } = request;

  const payload = {
    page,
    episodes,
    feeds,
    sponsorships
  };

  return payload;
};

export default Home;
