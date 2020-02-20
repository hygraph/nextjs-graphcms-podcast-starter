import React from "react";
import Markdown from "markdown-to-jsx";

// Hero Styles

const HeroHeading1 = props => (
  <h1
    {...props}
    className="mb-6 text-3xl font-bold leading-tight tracking-wider text-gray-300 font-display md:text-5xl"
  />
);
const sharedHeroParagraph =
  "mb-12 text-lg leading-normal tracking-wide text-gray-100 md:text-xl font-body";
const HeroParagraph = props => (
  <p {...props} className={`${sharedHeroParagraph}`} />
);
export const HeroLi = props => (
  <li {...props} className={`${sharedHeroParagraph}`} />
);

export const HeroA = props => (
  <a {...props} className={`${sharedHeroParagraph} underline`} />
);

export const MdHero = ({ children }) => (
  <Markdown
    children={children}
    options={{
      overrides: {
        h1: HeroHeading1,
        p: HeroParagraph,
        li: HeroLi,
        a: HeroA
      }
    }}
  />
);

// Base Styles

export const Heading1 = props => (
  <h1 {...props} className="mb-6 text-xl font-display lg:text-2xl" />
);

const sharedParagraphStyles = `mb-4 font-body text-base leading-snug`;

export const Paragraph = props => (
  <p {...props} className={`${sharedParagraphStyles}`} />
);

export const Li = props => (
  <li {...props} className={`${sharedParagraphStyles}`} />
);

export const A = props => (
  <a {...props} className={`${sharedParagraphStyles} underline`} />
);

export const Md = ({ children }) => (
  <Markdown
    children={children}
    options={{
      overrides: {
        h1: Heading1,
        p: Paragraph,
        li: Li,
        a: A
      }
    }}
  />
);

// Article Styles

const ArticleHeading1 = props => (
  <h1
    {...props}
    className="mb-6 text-3xl font-bold leading-tight tracking-wider text-gray-300 font-display md:text-5xl"
  />
);
const sharedArticleParagraph =
  "mb-12 text-lg leading-normal tracking-wide text-gray-100 md:text-xl";
const ArticleParagraph = props => (
  <p
    {...props}
    className={`mb-12 text-lg leading-normal tracking-wide text-gray-100 md:text-xl`}
  />
);
export const ArticleLi = props => (
  <li {...props} className={`${sharedArticleParagraph}`} />
);

export const ArticleA = props => (
  <a {...props} className={`${sharedArticleParagraph} underline`} />
);

export const MdArticle = ({ children }) => (
  <Markdown
    children={children}
    options={{
      overrides: {
        h1: ArticleHeading1,
        p: ArticleParagraph,
        li: ArticleLi,
        a: ArticleA
      }
    }}
  />
);

export const Label = ({ children }) => (
  <p className="inline-block w-full mb-2 text-sm font-bold tracking-widest text-teal-400 uppercase">
    {children}
  </p>
);

export { Markdown };
