import React, { useContext, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Draggable from "react-draggable";
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
    state: { playing, episode },
    dispatch
  } = useContext(PlayerContext);

  const [trackLoaded, setTrackLoaded] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(true);

  const player = useRef(null);

  const { pause, mute, unmute, play, currentTime } = useMediaControls(player);

  useEffect(() => {
    if (episode) {
      setTrackLoaded(true);
      (async () => {
        await mute();
        await play();
        await pause();
      })();
    }
  }, [episode]);

  const togglePlay = () => {
    if (playing) {
      pause();
      dispatch({ type: "pause" });
    } else {
      unmute();
      play();
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
          playerOpen ? "w-1/3" : ""
        } rounded-full main-gradient border border-darkgray-800 shadow-xl mb-12 z-50`}
      >
        <audio
          ref={player}
          muted
          src={trackLoaded ? episode.audioFile.url : null}
        ></audio>
        <div className="px-8 py-8 m-1 rounded-full bg-darkgray-900 text-gray-100 flex items-center group">
          <button onClick={() => togglePlay()}>
            <FontAwesomeIcon
              icon={playing ? faPauseCircle : faPlayCircle}
              width="72"
              className="inline-block mr-2"
            />
          </button>
          {playerOpen && (
            <div className="pl-6 w-8/12">
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
              <div className="h-1 my-2 w-full main-gradient rounded-full relative">
                {trackLoaded ? (
                  <span
                    className="absolute bg-darkgray-900 h-2 w-2 rounded-full"
                    style={{
                      left: `${(currentTime / player.current.duration) * 100}%`
                    }}
                  />
                ) : null}
              </div>
              <div className="flex justify-between opacity-0 group-hover:opacity-100 h-0 overflow-hidden group-hover:h-auto">
                {trackLoaded ? (
                  <React.Fragment>
                    <span>{hms(currentTime)}</span>
                    <span>{hms(player.current.duration)}</span>
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
            <button onClick={() => togglePlayer()}>
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
