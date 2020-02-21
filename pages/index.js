import React from "react";
import Head from "next/head";
import Episodes from "../components/Episodes";
import FeedBadges from "../components/FeedBadges";
import HeroImage from "../components/HeroImage";
import { MdHero } from "../components/markdown-components";
const PAGE = "Home";

const Home = ({ page, feeds, episodes, sponsorships }) => {
  return (
    <div className="w-full">
      <div className="container relative z-10">
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
          <HeroImage image={page.image} />
        </div>
      </div>
      <Episodes episodes={episodes} sponsorships={sponsorships} />
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
        image {
          url
        }
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
  const { page, episodes, feeds, sponsorships } = await graphQLClient.request(
    query,
    {
      label: PAGE
    }
  );
  return { props: { page, episodes, feeds, sponsorships } };
}

export default Home;
