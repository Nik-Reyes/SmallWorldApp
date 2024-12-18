import { alertMessage, obtainPhotoUrl } from "./photoHandler";
import * as ImagePicker from "expo-image-picker";

export const useCamera = () => {
  //permission state
  const [cameraPermission, setCameraPermission] =
    ImagePicker.useCameraPermissions();
  //async function to launch camera
  const takePhoto = async () => {
    try {
      // Check first if the user has granted permissions, and do not proceed until they have
      if (cameraPermission?.granted !== true) {
        const { status } = await setCameraPermission();
        if (status !== "granted") {
          alertMessage();
          return null;
        }
      }
      // Passed the initial permissions check which means they can take a photo
      const photo = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
      if (!photo.canceled) {
        return (snappedPhoto = await obtainPhotoUrl(photo));
      }
    } catch (e) {
      Alert.alert("Error uploading image " + e.message);
    }
  };
  return { takePhoto };
};
