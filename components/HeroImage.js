import React from "react";

const HeroImage = ({ image }) => {
  return (
    <div className="w-full md:w-3/6 justify-end bg-darkgray-800 shadow-xl rounded-sm overflow-hidden relative ml-auto">
      <span className="block h-0 pt-full" />
      {image ? ( 
        <img
          src={image.url}
          className="object-cover w-full h-full absolute top-0 left-0 object-center"
        />
      ) : (
        <span className="w-full h-full float -ml-px w-px block" />
      )}
    </div>
  );
};

export default HeroImage;
