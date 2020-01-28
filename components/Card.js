import React from "react";

const Card = ({ children }) => {
  return (
    <div className="px-4 mb-6 w-1/3 py-4">
      <div className="hover:shadow-xl shadow-lg bg-gray-200 relative z-10 rounded-sm overflow-hidden transform hover:-translate-y-1 animate text-gray-100 bg-darkgray-900 h-full flex flex-wrap flex-col">
        {children}
        <div className="main-gradient h-1 w-full" />
      </div>
    </div>
  );
};

export default Card;
