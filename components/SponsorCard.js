import React from "react";
import { Md } from "./markdown-components";
import Card from "./Card";

const SponsorCard = ({ sponsorship }) => {
  return (
    <Card>
      <div className="flex flex-col flex-wrap content-start self-stretch flex-1 px-8 py-6 pb-12">
        <Md>{sponsorship.title}</Md>
        <Md>{sponsorship.body}</Md>
        <a
          href={sponsorship.cta}
          className="inline-block px-8 py-4 mx-auto mt-auto font-bold rounded-full main-gradient"
        >
          Learn More
        </a>
      </div>
    </Card>
  );
};

export default SponsorCard;
