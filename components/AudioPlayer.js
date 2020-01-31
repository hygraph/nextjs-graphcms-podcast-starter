import React, { useContext, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Draggable from "react-draggable";
import {
  faPlayCircle,
  faPauseCircle,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { PlayerContext } from "../context/AudioPlayer";
import Episode from "../pages/episodes/[episode]";
import { Markdown } from "./markdown-components";
import Link from "next/link";
import { useMediaControls } from "react-browser-hooks";

const hms = seconds => new Date(seconds * 1000).toISOString().substr(11, 8);

const AudioPlayer = () => {
  const {
    state: { playing, episode },
    dispatch
  } = useContext(PlayerContext);

  const player = useRef(null);
  const { pause, mute, unmute, play, currentTime } = useMediaControls(player);

  useEffect(() => {
    (async () => {
      await mute();
      await play();
      await pause();
    })();
  }, [episode]);

  const [playerOpen, setPlayerOpen] = useState(true);
  return (
    <Draggable positionOffset={{ x: "-50%", y: 0 }}>
      <div
        className={`fixed bottom-0 left-1/2 ${
          playerOpen ? "w-1/3" : ""
        } rounded-full main-gradient border border-darkgray-800 shadow-xl mb-12 z-50`}
      >
        <audio ref={player} src={episode ? episode.audioFile.url : ""}></audio>
        <div className="px-8 py-8 m-1 rounded-full bg-darkgray-900 text-gray-100 flex items-center group">
          {playing ? (
            <button
              onClick={e => {
                pause();
                dispatch({ type: "pause" });
              }}
            >
              <FontAwesomeIcon
                icon={faPauseCircle}
                width="72"
                className="inline-block mr-2"
              />
            </button>
          ) : (
            <button
              onClick={e => {
                unmute();
                play();
                dispatch({ type: "play" });
              }}
            >
              <FontAwesomeIcon
                icon={faPlayCircle}
                width="72"
                className="inline-block mr-2"
              />
            </button>
          )}
          {playerOpen && (
            <div className="pl-6 w-8/12">
              {episode ? (
                <Link href={`/episodes/${episode.episodeNumber}`}>
                  <a>
                    <Markdown
                      options={{
                        overrides: {
                          h1: {
                            props: {
                              className:
                                "text-lg truncate group-hover:underline"
                            }
                          }
                        }
                      }}
                    >
                      {episode.title}
                    </Markdown>
                  </a>
                </Link>
              ) : (
                <p>"…"</p>
              )}
              <div className="h-1 my-2 w-full main-gradient rounded-full relative">
                {player.current && player.current.duration && (
                  <span
                    className="absolute bg-darkgray-900 h-2 w-2 rounded-full"
                    style={{
                      left: `${(currentTime / player.current.duration) * 100}%`
                    }}
                  />
                )}
              </div>
              <div className="flex justify-between opacity-0 group-hover:opacity-100 h-0 overflow-hidden group-hover:h-auto">
                {currentTime && <span>{hms(currentTime)}</span>}
                {player.current && player.current.duration && (
                  <span>{hms(player.current.duration)}</span>
                )}
              </div>
            </div>
          )}
          <div
            className={`ml-4 opacity-0 group-hover:opacity-100 ml-auto ${
              playerOpen ? "" : "hidden group-hover:block"
            }`}
          >
            {playerOpen ? (
              <button
                onClick={e => {
                  setPlayerOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} width="18" />
              </button>
            ) : (
              <button
                onClick={e => {
                  setPlayerOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} width="18" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default AudioPlayer;
