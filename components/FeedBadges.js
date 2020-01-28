import React from "react";

const FeedBadges = ({ feeds }) => {
  return (
    <div className="flex flex-wrap -mx-2 justify-start">
      {feeds &&
        feeds.map((feed, index) => {
          return (
            <a href={feed.feed} className="m-2" key={index}>
              <img src={feed.badge} />
            </a>
          );
        })}
    </div>
  );
};

export default FeedBadges;
