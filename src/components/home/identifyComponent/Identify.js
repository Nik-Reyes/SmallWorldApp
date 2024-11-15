import { View, Text } from "react-native";
import Button from "../Button/Button";
import { styles } from "../../../styles/Home.styles";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { useCamera } from "../../../hooks/takePicture.js";
import { useLibrary } from "../../../hooks/selectPicture.js";

const libraryImage = require("../../../../assets/images/negative.webp");

export default function IdentifyComponent() {
  const dynamicContainer = dynamicContainerStyles();
  const { takePhoto } = useCamera();
  const { pickPhoto } = useLibrary();

  handleCameraButton = async () => {
    const photo = await takePhoto();
    if (photo) {
      console.log("Photo taken", photo);
    }
  };

  handleLibraryButton = async () => {
    const photo = await pickPhoto();
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
