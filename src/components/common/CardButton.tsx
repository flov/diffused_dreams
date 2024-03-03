import { FC } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

interface CardButtonProps {
  text: string;
  icon: FC | string;
  onPress: () => void;
}

export const CardButton: FC<CardButtonProps> = ({
  onPress,
  text,
  icon: Icon,
}) => {
  return (
    <Card
      className="py-4 w-48 h-48 sm:w-60 sm:h-60"
      isPressable
      isHoverable
      isBordered
      isBlurred
      onPress={onPress}
    >
      <CardHeader className="pb-0 flex justify-center items-start">
        <h4 className="text-large">{text}</h4>
      </CardHeader>
      <CardBody className="overflow-visible flex justify-center items-center p-0">
        {typeof Icon === "string" ? (
          <Image src={`/${Icon}.png`} alt={text} />
        ) : (
          <Icon />
        )}
      </CardBody>
    </Card>
  );
};
