import React from "react";
import Halftone from "../components/Halftone";
import EpisodeCard from "./EpisodeCard";

const Episodes = ({ episodes }) => {
  return (
    <div>
      <div className="flex -mt-20 overflow-hidden text-darkgray-800 w-full">
        <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
        <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
        <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
      </div>
      <div className="bg-darkgray-800 -mt-2">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            {episodes &&
              episodes.map((episode, index) => {
                return <EpisodeCard episode={episode} key={index} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
