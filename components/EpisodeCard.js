import React from "react";
import Markdown from "markdown-to-jsx";

const EpisodeCard = ({ episode }) => {
  return (
    <div className="px-4 mb-6 w-1/3 py-4 rounded-md">
      <div className="shadow-xl bg-gray-200 relative z-10">
        <div className="absolute left-0 top-0 z-10 bg-darkgray-800 px-4 py-2">
          <p className="text-gray-200 font-bold uppercase text-sm relative">
            Ep {episode.episodeNumber}
            <span className="w-full h-2 main-gradient absolute bottom-0 left-0" />
          </p>
        </div>
        <div className="w-full relative pt-half overflow-hidden h-0">
          <img
            src={episode.image.url}
            className="object-cover w-full h-full absolute top-0"
          />
        </div>
        <div className="px-4 py-6">
          <h1 className="text-2xl font-serif">
            <Markdown>{episode.title}</Markdown>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
