import React, { useContext, useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useMediaControls } from "react-browser-hooks";
import { PlayerContext } from "../context/AudioPlayer";
import { Markdown } from "./markdown-components";

const hms = seconds =>
  seconds ? new Date(seconds * 1000).toISOString().substr(11, 8) : "00:00:00";
const playerComponents = {
  overrides: {
    h1: {
      props: {
        className: "text-lg truncate group-hover:underline"
      }
    }
  }
};

const AudioPlayer = () => {
  const {
    state: { playing, interacted, episode },
    dispatch
  } = useContext(PlayerContext);

  const [trackLoaded, setTrackLoaded] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(true);

  const player = useRef(null);
  const isFirstRun = useRef(true);

  const { pause, unmute, play, currentTime } = useMediaControls(player);

  useEffect(() => {
    if (episode) {
      setTrackLoaded(true);
    }
  }, [episode]);

  useEffect(() => {
    if (!isFirstRun.current) {
      if (playing) {
        unmute();
        play();
      } else {
        pause();
      }
    }
    if (isFirstRun.current) {
      isFirstRun.current = false;
    }
  }, [playing, episode]);

  const togglePlay = () => {
    if (playing) {
      dispatch({ type: "pause" });
    } else {
      dispatch({ type: "play" });
    }
  };

  const togglePlayer = () => {
    if (playerOpen) {
      setPlayerOpen(false);
    } else {
      setPlayerOpen(true);
    }
  };

  return (
    <Draggable positionOffset={{ x: "-50%", y: 0 }}>
      <div
        className={`fixed bottom-0 left-1/2 ${
          playerOpen ? "w-full md:w-1/3" : "w-full md:w-auto"
        } md:rounded-full main-gradient shadow-xl md:mb-12 z-50`}
      >
        <audio
          ref={player}
          muted
          src={interacted ? episode.audioFile.url : null}
        ></audio>
        <div className="flex items-center px-2 py-2 mt-1 text-gray-100 md:m-1 md:px-8 md:py-8 md:rounded-full bg-darkgray-900 group">
          <button onClick={togglePlay}>
            <FontAwesomeIcon
              icon={playing ? faPauseCircle : faPlayCircle}
              className="inline-block w-8 mr-2 md:w-12"
            />
          </button>
          {playerOpen && (
            <div className="w-8/12 pl-6">
              {trackLoaded ? (
                <Link href={`/episodes/${episode.episodeNumber}`}>
                  <a>
                    <Markdown options={playerComponents}>
                      {episode.title}
                    </Markdown>
                  </a>
                </Link>
              ) : (
                <p>"…"</p>
              )}
              <div className="relative w-full h-1 my-2 rounded-full main-gradient">
                {trackLoaded ? (
                  <span
                    className="absolute w-2 h-2 rounded-full bg-darkgray-900"
                    style={{
                      left: `${(currentTime / episode.audioDuration) * 100}%`
                    }}
                  />
                ) : null}
              </div>
              <div className="flex justify-between h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:h-auto">
                {trackLoaded ? (
                  <React.Fragment>
                    <span>{hms(currentTime)}</span>
                    <span>{hms(episode.audioDuration)}</span>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          )}
          <div
            className={`ml-4 opacity-0 group-hover:opacity-100 ml-auto ${
              playerOpen ? "" : "hidden group-hover:block"
            }`}
          >
            <button className="invisible md:visible" onClick={togglePlayer}>
              <FontAwesomeIcon
                icon={playerOpen ? faChevronLeft : faChevronRight}
                width="18"
              />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default AudioPlayer;
