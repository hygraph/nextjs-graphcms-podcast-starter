import React from "react";

const PlayerContext = React.createContext(0);

const PlayerProvider = PlayerContext.Provider;
const PlayerSubscriber = PlayerContext.Subscriber;

const initialState = {
  episode: null,
  playing: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setEpisode":
      return { ...state, episode: action.payload };
    case "play":
      return { ...state, playing: true };
    case "pause":
      return { ...state, playing: false };
    default:
      throw new Error();
  }
};

export {
  PlayerProvider,
  PlayerSubscriber,
  PlayerContext,
  initialState,
  reducer
};
