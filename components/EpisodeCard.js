import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faTags,
  faPlayCircle,
  faPauseCircle
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Md } from "./markdown-components";
import { PlayerContext } from "../context/AudioPlayer";
import Card from "./Card";

const truncate = (text, truncationLength = 65) => {
  let transformedText = text;
  if (text.length > truncationLength)
    transformedText = transformedText.slice(0, truncationLength) + "…";
  return transformedText;
};

const EpisodeCard = props => {
  let currentEpisode = props.episode;
  const {
    state: { playing, episode },
    dispatch
  } = useContext(PlayerContext);

  return (
    <Card>
      <Link
        href="/episodes/[episode]"
        as={`/episodes/${currentEpisode.episodeNumber}`}
      >
        <a>
          <div className="relative">
            <div className="absolute top-0 left-0 z-10 p-4 bg-darkgray-800">
              <p className="relative text-sm font-bold text-gray-200 uppercase">
                <span className="block mb-px">
                  Ep {currentEpisode.episodeNumber}
                </span>
                <span className="block w-full h-1 main-gradient" />
              </p>
            </div>
            <div className="absolute top-0 right-0 z-10 p-4">
              <button
                onClick={e => {
                  e.preventDefault();
                  dispatch({
                    type:
                      playing &&
                      currentEpisode.episodeNumber === episode.episodeNumber
                        ? "pause"
                        : "playEpisode",
                    payload: currentEpisode
                  });
                }}
              >
                <FontAwesomeIcon
                  icon={
                    playing &&
                    episode.episodeNumber === currentEpisode.episodeNumber
                      ? faPauseCircle
                      : faPlayCircle
                  }
                  width="32"
                  className="inline-block mr-2"
                />
              </button>
            </div>
            <div className="relative w-full h-0 overflow-hidden pt-half">
              <img
                src={currentEpisode.image.url}
                className="absolute top-0 object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="px-4 py-6">
              <p className="mb-5 text-xs text-darkgray-300">
                <FontAwesomeIcon
                  icon={faClock}
                  width="12"
                  className="inline-block mr-2"
                />
                {Math.floor(currentEpisode.audioDuration / 60)} minute listen
              </p>
              <div className="mb-4 h-18 lg:h-32">
                <Md truncate="65">{truncate(currentEpisode.title)}</Md>
              </div>
              <p className="mb-5 text-xs text-darkgray-300">
                <FontAwesomeIcon
                  icon={faTags}
                  width="12"
                  className="inline-block mr-2"
                />
                {currentEpisode.tags.map((tag, key) => (
                  <span key={key}>
                    {tag.name}
                    {key == currentEpisode.tags.length - 1 ? "" : ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </Card>
  );
};

export default EpisodeCard;
