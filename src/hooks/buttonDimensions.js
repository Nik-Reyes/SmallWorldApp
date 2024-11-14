import { useWindowDimensions } from "react-native";

const dynamicButtonDimensions = {
  terrarium: { pWidth: 0.934, pHeight: 0.26 },
  identify: { pWidth: 0.934, pHeight: 0.14 },
  tools: { pWidth: 0.934, pHeight: 0.19 },
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
