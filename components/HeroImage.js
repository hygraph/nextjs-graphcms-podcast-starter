import React from "react";

const HeroImage = ({ image }) => {
  return (
    <div className="w-full md:w-4/6 flex justify-end">
      <div className="w-9/12 bg-darkgray-800 shadow-xl rounded-sm overflow-hidden relative">
        <span className="h-0 float -ml-px w-px block pt-full" />
        {image && (
          <img
            src={image.url}
            className="object-cover w-full h-full absolute top-0 object-center"
          />
        )}
      </div>
    </div>
  );
};

export default HeroImage;
