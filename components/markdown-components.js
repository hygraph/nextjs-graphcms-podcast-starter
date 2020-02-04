import React from "react";
import Markdown from "markdown-to-jsx";

export const Heading1 = props => (
  <h1 {...props} className="text-2xl font-serif mb-6" />
);
export const Paragraph = props => (
  <p {...props} className="text-base font-sans leading-snug mb-4" />
);

export const Md = ({ children }) => (
  <Markdown
    children={children}
    options={{
      overrides: {
        h1: Heading1,
        p: Paragraph
      }
    }}
  />
);

const ArticleHeading1 = props => (
  <h1
    {...props}
    className="text-5xl text-gray-300 mb-6 font-bold font-serif tracking-wider leading-tight"
  />
);
const ArticleParagraph = props => (
  <p
    {...props}
    className="text-gray-100 leading-normal tracking-wide text-xl mb-12"
  />
);

export const MdArticle = ({ children }) => (
  <Markdown
    children={children}
    options={{
      overrides: {
        h1: ArticleHeading1,
        p: ArticleParagraph
      }
    }}
  />
);

export { Markdown };
