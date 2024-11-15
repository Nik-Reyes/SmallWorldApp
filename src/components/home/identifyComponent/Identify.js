import { View, Text } from "react-native";
import Button from "../Button/Button";
import { styles } from "../../../styles/Home.styles";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { useCamera } from "../../../hooks/takePicture.js";
import { useLibrary } from "../../../hooks/selectPicture.js";

const cameraImage = require("../../../../assets/images/1.png");
const libraryImage = require("../../../../assets/images/2.png");

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
        <Button
          label="camera"
          onPress={handleCameraButton}
          imgSrc={cameraImage}
        />
        <Button
          label="library"
          onPress={handleLibraryButton}
          imgSrc={libraryImage}
        />
      </View>
    </View>
  );
}
