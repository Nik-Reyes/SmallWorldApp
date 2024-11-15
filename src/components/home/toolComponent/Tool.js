import { View, Text } from "react-native";
import Button from "../Button/Button";
import { styles } from "../../../styles/Home.styles";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { useNavigation } from "@react-navigation/native";

const exploreImage = require("../../../../assets/images/explore.1.png");
const learnImage = require("../../../../assets/images/Learn.png");
const careImage = require("../../../../assets/images/Care.png");

export default function ToolComponent() {
  const dynamicContainer = dynamicContainerStyles();
  const navigation = useNavigation();

  return (
    <View style={dynamicContainer("tools")}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Tools</Text>
      </View>

      <View style={[styles.toolButtonContainer]}>
        <Button
          label="Explore"
          onPress={() => navigation.getParent()?.navigate("Explore")}
          text="button"
          imgSrc={exploreImage}
        />

        <Button
          label="Learn"
          onPress={() => navigation.getParent()?.navigate("Learn")}
          text="button"
          imgSrc={learnImage}
        />

        <Button
          label="Care"
          onPress={() => navigation.getParent()?.navigate("Care")}
          text="button"
          imgSrc={careImage}
        />
      </View>
    </View>
  );
}
