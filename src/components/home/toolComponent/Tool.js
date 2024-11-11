import { View, Text } from "react-native";
import Button from "../Button/Button";
import { styles } from "../../../styles/Home.styles";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";

const exploreImage = require("../../../../assets/images/explore.jpg");
const learnImage = require("../../../../assets/images/learn.jpg");
const careImage = require("../../../../assets/images/Care.jpg");

export default function ToolComponent() {
  const dynamicContainer = dynamicContainerStyles();

  return (
    <View style={dynamicContainer("tools")}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Tools</Text>
      </View>

      <View style={styles.toolButtonContainer}>
        <Button
          label="Explore"
          onPress={() => console.log("Test Button Pressed!")}
          text="button"
          imgSrc={exploreImage}
        />

        <Button
          label="Learn"
          onPress={() => console.log("Test Button Pressed!")}
          text="button"
          imgSrc={learnImage}
        />

        <Button
          label="Care"
          onPress={() => console.log("Test Button Pressed!")}
          text="button"
          imgSrc={careImage}
        />
      </View>
    </View>
  );
}
