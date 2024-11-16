import { View, Text } from "react-native";
import Button from "../Button/Button";
import { styles } from "../../../styles/Home.styles";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { useNavigation } from "@react-navigation/native";

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
        />

        <Button
          label="Learn"
          onPress={() => navigation.getParent()?.navigate("Learn")}
        />

        <Button
          label="Care"
          onPress={() => navigation.getParent()?.navigate("Care")}
        />
      </View>
    </View>
  );
}
