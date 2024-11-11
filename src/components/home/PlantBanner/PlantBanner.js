import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import { styles } from "../../../styles/Home.styles";

const plantImage = require("../../../../assets/images/TopComponent.png");

export default function PlantBanner() {
  return (
    <ImageBackground source={plantImage} style={styles.image}>
      <LinearGradient
        colors={[
          "rgba(240,253,242, 1)",
          "rgba(240,253,242, 0.5)",
          "rgba(240,253,242, 0)",
        ]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.imageOverlay}
      />
    </ImageBackground>
  );
}
