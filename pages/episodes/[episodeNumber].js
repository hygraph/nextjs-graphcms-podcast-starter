import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { MdArticle as Md, Label } from "../../components/markdown-components";
import HeroImage from "../../components/HeroImage";
import Halftone from "../../components/Halftone";
import { PlayerContext } from "../../context/AudioPlayer";
import PeopleBlock from "../../components/PeopleBlock";

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

  return currentEpisode ? (
    <div>
      <div>
        <Head>
          <title>Episode {currentEpisode.episodeNumber}</title>
        </Head>

        <div className="container relative z-10 flex flex-wrap items-start mb-12">
          <div className="flex flex-wrap content-center w-full text-gray-100 md:w-2/6">
            <Label>Today in Content Jazz</Label>
            <Md>{currentEpisode.title}</Md>
            <div className="flex w-full">
              {currentEpisode.guests.length && (
                <PeopleBlock people={currentEpisode.guests} label="Guests" />
              )}
              {currentEpisode.hosts.length && (
                <PeopleBlock people={currentEpisode.hosts} label="Hosts" />
              )}
            </div>
          </div>
          <HeroImage image={currentEpisode.image} />
        </div>
        <div className="absolute left-0 w-full -mt-20 overflow-hidden text-darkgray-800 bg-darkgray-700">
          <div className="flex" style={{ width: 1800, height: 375 }}>
            <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
            <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
            <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
          </div>
        </div>
        <div className="bg-darkgray-800">
          <div className="container relative">
            <div className="flex flex-wrap md:-mx-8">
              <div className="w-full md:px-8 md:w-1/2">
                <Label>Description</Label>
                <Md>{currentEpisode.description}</Md>
                <Label>Resources</Label>
                {currentEpisode.resources &&
                  currentEpisode.resources.map((resource, index) => {
                    return (
                      <a href={resource.url}>
                        <div className="flex items-center px-4 py-2 mb-4 text-xl leading-loose text-gray-100 border border-gray-100 rounded-sm hover:bg-darkgray-900">
                          <p className="w-10/12 text-sm text-current">
                            <span className="text-sm font-bold underline text-current">
                              {resource.label}
                            </span>
                            {resource.description
                              ? resource.description.replace(resource.label, "")
                              : ""}
                          </p>
                          <div className="w-2/12 ml-auto text-right">
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
              <div className="w-full md:px-8 md:w-1/2">
                <Label>Show Notes</Label>
                <Md>{currentEpisode.showNotes}</Md>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading…</p>
  );
};

export async function unstable_getServerProps(context) {
  const { graphQLClient } = require("../../clients/_read_client");
  const {
    params: { episodeNumber }
  } = context;
  const query = `
  query SingleEpisode($episodeNumber: Int){
    currentEpisode: episode(where: {
      episodeNumber: $episodeNumber
    }) {
      title
      description
      showNotes
      hosts {
        fullName
        email
        photo {
          url
        }
      }
      guests {
        fullName
        email
        photo {
          url
        }
      }
      image {
        url
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
        description
      }
      audioFile {
        url
        mimeType
      }
    }
  }
  `;

  const request = await graphQLClient.request(query, {
    episodeNumber: episodeNumber / 1
  });
  let { currentEpisode } = request;
  return { props: { currentEpisode } };
}

export default Episode;
