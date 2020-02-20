import React from "react";
const md5 = require("blueimp-md5");

const Label = ({ children }) => (
  <p className="block mb-2 text-sm font-bold tracking-widest text-teal-400 uppercase">
    {children}
  </p>
);

const PeopleBlock = ({ people, label }) => {
  return (
    <div className="w-full">
      <Label>{label}</Label>
      <div className="flex w-full mb-6 -mx-2">
        {people.map((person, index) => {
          return (
            <div className="w-1/2 text-center">
              <div className="relative w-full mx-2 overflow-hidden rounded-full">
                <span className="block h-0 pt-full" />
                <img
                  className="absolute top-0 left-0 object-cover w-full h-full"
                  src={
                    person.photo
                      ? person.photo.url
                      : `https://www.gravatar.com/avatar/${md5(
                          person.email
                        )}?s=200`
                  }
                />
              </div>
              <p className="mt-2 font-bold">{person.fullName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PeopleBlock;
