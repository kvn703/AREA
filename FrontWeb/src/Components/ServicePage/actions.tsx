import React from "react";

interface SquareProps {
  id: number;
  name: string;
  args_action: string;
  description: string;
  serviceId: number;
}

const ActionsCard: React.FC<SquareProps> = ({ name }) => {

  return (
    <div className="bg-[#2e1d9c] w-[400px] h-[50px] mb-[2%] flex flex-col shadow-md rounded-2xl">
      <div style={{ fontFamily: "merriweather" }} className="text-[#fff] flex items-center justify-center">
        <div className="font-bold text-[100%] pt-[3%]">{name}</div>
      </div>
    </div>
  );
};

export default ActionsCard;
