import React, { useContext, useEffect } from "react";
import Halftone from "../components/Halftone";
import EpisodeCard from "./EpisodeCard";
import SponsorCard from "./SponsorCard";
import { PlayerContext } from "../context/AudioPlayer";

const Episodes = ({ episodes, sponsorships }) => {
  const {
    state: { playing, episode },
    dispatch
  } = useContext(PlayerContext);

  useEffect(() => {
    if (!episode) {
      dispatch({ type: "setEpisode", payload: episodes[0] });
    }
  }, []);

  const episodeList = episodes.map((episode, index) => {
    episode.episodeNumber = index + 1;
    return <EpisodeCard episode={episode} key={index} />;
  });

  if (sponsorships) {
    sponsorships.forEach((sponsorship, index) => {
      episodeList.splice(
        sponsorship.position,
        0,
        <SponsorCard key={`sponsorship-${index}`} sponsorship={sponsorship} />
      );
    });
  }

  return (
    <div className="w-full">
      <div className="w-full -mt-20 overflow-hidden text-darkgray-800">
        <div className="flex" style={{ width: 1800, height: 375 }}>
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
        </div>
      </div>
      <div className="-mt-2 bg-darkgray-800">
        <div className="container">
          <div className="flex flex-wrap items-stretch -mx-4">
            {episodeList}
          </div>
          {false && (
            <div className="flex items-center py-12">
              <button className="inline-block px-8 py-4 mx-auto mt-auto font-bold text-gray-100 rounded-full bg-darkgray-900 ">
                Load More…
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Episodes;
