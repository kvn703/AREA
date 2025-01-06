import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

interface SquareProps {
  topImage: string;
  bottomText: string;
  description: string;
  serviceId: number;
  showCheckmark: boolean;
}

const Square: React.FC<SquareProps> = ({
  topImage,
  bottomText,
  showCheckmark,
}) => {

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Link to="/servicePage">
      <div style={{ borderRadius: "10%", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }} className="bg-[#2e1d9c] relative w-[200px] h-[200px]">
        <div style={{ fontFamily: "merriweather" }} className="pt-8 flex items-center justify-center h-1/2">
          <img
            src={topImage}
            alt="Image"
            className="max-w-[100%] max-h-[100%]"
          />
        </div>
        <div style={{ fontFamily: "merriweather" }} className="text-[20px] text-[#fff] flex items-center justify-center h-1/2" >
          {capitalizeFirstLetter(bottomText)}
        </div>
        {showCheckmark && (
          <div className="absolute top-0 right-0 bg-green-800 rounded-full p-[4px]">
            <FaCheck style={{ color: "white" }} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default Square;
