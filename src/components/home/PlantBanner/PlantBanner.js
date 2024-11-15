import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, View } from "react-native";
import { styles } from "../../../styles/Home.styles";

const plantImage = require("../../../../assets/images/TopComponent.png");

export default function PlantBanner() {
  return (
    <View style={[styles.header]}>
      <ImageBackground
        source={plantImage}
        style={styles.image}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(232,245,233, 1)",
            "rgba(232,245,233, 0.6)",
            "rgba(232,245,233, 0)",
          ]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.imageOverlay}
        />
      </ImageBackground>
    </View>
  );
}
