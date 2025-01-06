import React from "react";
import Square from "./square.tsx";
import { useServiceContext } from "../../ServiceContext.tsx";

interface SquareProps {
  topImage: string;
  bottomText: string;
  description: string;
  serviceId: number;
  userServices: string[];
}

const ServiceCase: React.FC<SquareProps> = ({
  topImage,
  bottomText,
  description,
  serviceId,
  userServices,
}) => {

  const { setService } = useServiceContext();
  const isServiceInUserServices = userServices.includes(bottomText);
  const handleServiceClick = () => {
    setService({ topImage, bottomText, description, serviceId });
  };

  return (
    <div>
      <div onClick={handleServiceClick}>
        <Square
          topImage={topImage}
          bottomText={bottomText}
          description={description}
          serviceId={serviceId}
          showCheckmark={isServiceInUserServices}
        />
      </div>
    </div>
  );
};

export default ServiceCase;
