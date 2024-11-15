import { useWindowDimensions } from "react-native";

const dynamicButtonDimensions = {
  terrarium: { pWidth: 0.89, pHeight: 0.27 },
  identify: { pWidth: 0.89, pHeight: 0.25 },
  tools: { pWidth: 0.89, pHeight: 0.11 },
};

export const dynamicContainerStyles = () => {
  const { height, width } = useWindowDimensions();

  const dynamicContainer = (containerType) => {
    const { pWidth, pHeight } = dynamicButtonDimensions[containerType];
    console.log({ pWidth });

    return {
      height: pHeight * height,
      width: pWidth * width,
    };
  };
  return dynamicContainer;
};
