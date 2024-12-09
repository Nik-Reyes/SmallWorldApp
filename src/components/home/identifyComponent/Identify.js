import { View, Text } from "react-native";
import Button from "../Button/Button";
import { styles } from "../../../styles/Home.styles";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { useCamera } from "../../../hooks/takePicture.js";
import { useLibrary } from "../../../hooks/selectPicture.js";
import { callPlantApi } from "../../../../plant-recognition";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function IdentifyComponent() {

  const navigation = useNavigation()
  const dynamicContainer = dynamicContainerStyles();
  const { takePhoto } = useCamera();
  const { pickPhoto } = useLibrary();

  handleCameraButton = async () => {
    const photo = await takePhoto();
    if (photo) {
      const results = await callPlantApi(photo, 'flower')
      navigation.navigate("Results", { results, photo })
    }
  };

  handleLibraryButton = async () => {
    const photo = await pickPhoto();
    if (photo) {
      const results = await callPlantApi(photo, 'flower')
      navigation.navigate("Results", { results, photo })
    }
  };


  return (
    <View style={dynamicContainer("identify")}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Identify a Plant</Text>
      </View>
      <View style={styles.identifyButtonContainer}>
        <Button label="camera" onPress={handleCameraButton} />
        <Button label="library" onPress={handleLibraryButton} />
      </View>
    </View>
  );
}
