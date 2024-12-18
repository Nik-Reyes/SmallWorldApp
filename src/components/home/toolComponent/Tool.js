import { View, Text } from "react-native";
import Button from "../Button/Button";
import { styles } from "../../../styles/Home.styles";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { useNavigation } from "@react-navigation/native";
<<<<<<< HEAD

export default function ToolComponent() {
=======
import { useContext } from "react";
import AuthContext from "../../../services/authContext";

export default function ToolComponent() {

  const { user } = useContext(AuthContext)

>>>>>>> main
  const dynamicContainer = dynamicContainerStyles();
  const navigation = useNavigation();

  return (
    <View style={dynamicContainer("tools")}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Tools</Text>
      </View>

      <View style={[styles.toolButtonContainer]}>
<<<<<<< HEAD
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
=======
        {user ?
          <>
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
          </>
          
          :
          <>
          <Button
            label="Explore"
            onPress={() => navigation.getParent()?.navigate("Sign-In")}
          />

          <Button
            label="Learn"
            onPress={() => navigation.getParent()?.navigate("Sign-In")}
          />

          <Button
            label="Care"
            onPress={() => navigation.getParent()?.navigate("Sign-In")}
          />
          </>
        }
>>>>>>> main
      </View>
    </View>
  );
}
