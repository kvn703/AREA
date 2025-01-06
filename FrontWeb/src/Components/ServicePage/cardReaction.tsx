import React from "react";
import ReactionsCard from "./reactions.tsx";
import { ReactionData } from "../../Pages/servicePage.tsx";

interface ReactionsCardProps {
  id: number;
  name: string;
  args_reaction: string;
  description: string;
  serviceId: number;
  onCardClick: (data: ReactionData) => void;
}

const Card: React.FC<ReactionsCardProps> = ({
  id,
  name,
  args_reaction,
  description,
  serviceId,
  onCardClick,
}) => {

  const handleServiceClick = () => {
    onCardClick({ id, name, args_reaction, description, serviceId });
  };

  return (
    <div>
      <div onClick={handleServiceClick}>
        <ReactionsCard
          id={id}
          name={name}
          args_reaction={args_reaction}
          description={description}
          serviceId={serviceId}
        />
      </div>
    </div>
  );
};

export default Card;
