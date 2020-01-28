import React from "react";

const Card = ({ children }) => {
  return (
    <article className="px-4 md:mb-6 w-full md:w-1/2 lg:w-1/3 md:py-4">
      <section className="lg:hover:shadow-xl md:shadow-lg bg-gray-200 relative z-10 md:rounded-sm overflow-hidden transform md:hover:-translate-y-1 animate text-gray-100 bg-darkgray-900 h-full flex flex-wrap md:flex-col">
        {children}
        <div className="main-gradient h-1 w-full" />
      </section>
    </article>
  );
};

export default Card;
