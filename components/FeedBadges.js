import React from "react";

const FeedBadges = ({ feeds }) => {
  return (
    <div className="flex flex-wrap justify-start -mx-2">
      {feeds &&
        feeds.map((feed, index) => {
          return (
            <a href={feed.feed} className="m-2" key={index}>
              <img src={feed.badge.url} />
            </a>
          );
        })}
    </div>
  );
};

export default FeedBadges;
