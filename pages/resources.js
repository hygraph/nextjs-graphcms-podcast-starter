import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { Markdown, MdHero, Label } from "../components/markdown-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Halftone from "../components/Halftone";
import { PlayerContext } from "../context/AudioPlayer";
const PAGE = "Resources";

const About = ({ page, resources, currentEpisode }) => {
  const {
    state: { playing, episode },
    dispatch
  } = useContext(PlayerContext);

  useEffect(() => {
    if (!episode) {
      dispatch({ type: "setEpisode", payload: currentEpisode });
    }
  }, []);

  return page ? (
    <div className="w-full">
      <div className="container relative z-10">
        <Head>
          <title>{PAGE}</title>
        </Head>

        <div className="flex flex-wrap items-start">
          <div className="flex flex-wrap content-center w-full md:w-1/2">
            <Label>It's time for</Label>
            <MdHero>{page.content}</MdHero>
          </div>
        </div>
      </div>
      <div className="absolute left-0 w-full -mt-20 overflow-hidden text-darkgray-800 bg-darkgray-700">
        <div className="flex" style={{ width: 1800, height: 375 }}>
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
        </div>
      </div>
      <div className="bg-darkgray-800">
        <div className="container relative z-10">
          <div className="flex flex-wrap -mx-4">
            {resources &&
              resources.map((resource, index) => {
                return (
                  <a
                    href={resource.url}
                    key={index}
                    className="w-full px-4 py-8 md:w-1/2 lg:w-1/3"
                  >
                    <div className="flex flex-col items-center h-full px-4 py-6 mb-4 text-xl leading-loose text-gray-100 border border-gray-100 rounded-sm hover:bg-darkgray-900">
                      <div className="w-full h-full">
                        <div className="border-b h-half border-darkgray-400">
                          <p className="pb-6 text-lg text-current">
                            <span className="font-bold underline">
                              {resource.label}
                            </span>
                            {resource.description
                              ? resource.description.replace(resource.label, "")
                              : ""}
                          </p>
                        </div>
                        <p className="pt-6 text-lg text-current">
                          As seen on{" "}
                          {resource.episodes.map((value, index, arr) => {
                            let last = index === arr.length - 1;
                            let parsedTitle = (
                              <Markdown
                                options={{
                                  overrides: {
                                    h1: props => <span {...props} />,
                                    p: props => <span {...props} />
                                  }
                                }}
                                children={value.title + (last ? "" : ", ")}
                              />
                            );

                            return parsedTitle;
                          })}
                        </p>
                      </div>
                      <div className="w-full mt-auto text-right">
                        <FontAwesomeIcon
                          width="14"
                          icon={faArrowRight}
                          className="ml-auto"
                        />
                      </div>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  ) : null;
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
              resources {
                label
                url
                description
                episodes {
                    title
                    episodeNumber
                }
            }
          }
        `;

  const { page, resources, episodes } = await graphQLClient.request(query, {
    label: PAGE
  });

  return { props: { page, resources, currentEpisode: episodes[0] } };
}

export default About;
