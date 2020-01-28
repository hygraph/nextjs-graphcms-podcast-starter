import React from "react";
import Markdown from "markdown-to-jsx";

export const H1 = props => (
  <h1 {...props} className="text-2xl font-serif mb-6" />
);

export const P = props => (
  <p {...props} className="text-base font-sans leading-snug mb-4" />
);

export const Md = ({ children }) => (
  <Markdown
    children={children}
    options={{
      overrides: {
        h1: H1,
        p: P
      }
    }}
  />
);
