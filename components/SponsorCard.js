import React from "react";
import { Md } from "./markdown-components";
import Card from "./Card";

const placeholderTitle = `
# Put a sponsorship message right here!
`;
const placeholderBody = `
Sometimes sponsors like to use big ads to sell something. Not us, we prefer clean text that says exactly what we mean. No gimmicks, pure eloquence wrapped up in a gradient. It's better, isn't it?
`;
const placeholderLink = "/";
const placeholderCta = `Click on this button!`;

const SponsorCard = ({
  ctaText = placeholderCta,
  ctaLink = placeholderLink,
  title = placeholderTitle,
  body = placeholderBody
}) => {
  return (
    <Card>
      <div className="px-8 py-6 flex flex-wrap flex-col self-stretch flex-1 content-start pb-12">
        <Md>{title}</Md>
        <Md>{body}</Md>
        <a
          href={ctaLink}
          className="py-4 mx-auto px-8 main-gradient inline-block mt-auto rounded-full font-bold"
        >
          {ctaText}
        </a>
      </div>
    </Card>
  );
};

export default SponsorCard;
