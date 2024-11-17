import { View, Text } from "react-native";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { styles } from "../../../styles/Home.styles";
import Button from "../Button/Button";

const terrariumImage = require("../../../../assets/images/garden.png");

export default function Terrarium() {
  const dynamicContainer = dynamicContainerStyles();

  return (
    <View style={dynamicContainer("terrarium")}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Terrarium</Text>
      </View>

      <View style={styles.terrariumButtonContainer}>
        <Button
          label="Terrarium"
          onPress={() => console.log("Test Button Pressed!")}
          text="button"
          imgSrc={terrariumImage}
        />
      </View>
    </View>
  );
}
