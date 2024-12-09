import { View, Text } from "react-native";
import Button from "../Button/Button";
import { styles } from "../../../styles/Home.styles";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { useCamera } from "../../../hooks/takePicture.js";
import { useLibrary } from "../../../hooks/selectPicture.js";
import { callPlantApi } from "../../../../plant-recognition";
import { onAuthStateChanged } from "firebase/auth";

export default function IdentifyComponent() {
  const dynamicContainer = dynamicContainerStyles();
  const { takePhoto } = useCamera();
  const { pickPhoto } = useLibrary();

  handleCameraButton = async () => {
    const photo = await takePhoto();
    if (photo) {
      results = await callPlantApi(photo, 'flower')
      console.log("Photo taken", photo);
      onAuthStateChanged(async (user) => {
        if (user){
          console.log('user is signed in')
        }
      })
    }
  };

  handleLibraryButton = async () => {
    const photo = await pickPhoto();
    if (photo) {
      results = await callPlantApi(photo, 'flower')
      console.log("Photo taken", photo);
      onAuthStateChanged(async (user) => {
        if (user){
          console.log('user is signed in')
        }
      })
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
