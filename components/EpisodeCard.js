import React from "react";
import { Md } from "./markdown-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTags } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

const EpisodeCard = ({ episode }) => {
  return (
    <Card>
      <div className="absolute left-0 top-0 z-10 bg-darkgray-800 p-4">
        <p className="text-gray-200 font-bold uppercase text-sm relative">
          <span className="mb-px block">Ep {episode.episodeNumber}</span>
          <span className="w-full h-1 main-gradient block" />
        </p>
      </div>
      <div className="w-full relative pt-half overflow-hidden h-0">
        <img
          src={episode.image.url}
          className="object-cover w-full h-full absolute top-0"
        />
      </div>
      <div className="px-4 py-6">
        <p className="text-darkgray-300 mb-5 text-xs">
          <FontAwesomeIcon
            icon={faClock}
            width="12"
            className="inline-block mr-2"
          />
          45 minute listen
        </p>
        <div className="h-32 mb-4">
          <Md>{episode.title}</Md>
        </div>
        <p className="text-darkgray-300 mb-5 text-xs">
          <FontAwesomeIcon
            icon={faTags}
            width="12"
            className="inline-block mr-2"
          />
          {episode.tags.map(tag => (
            <span>{tag.name},</span>
          ))}
        </p>
      </div>
    </Card>
  );
};

export default EpisodeCard;
