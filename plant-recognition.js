import axios from 'axios';
import { firebaseUpload } from "./src/services/firebaseConfig.js";
import { PLANTNET_API_KEY } from "@env";  // Make sure the API key is correctly loaded from .env
import * as FileSystem from "expo-file-system";

// Define constants
const API_KEY = "2b10IaMdcjfI12UWRTNzi0lUu" // PLANTNET_API_KEY; // Use .env or fallback
const API_URL = `https://my-api.plantnet.org/v2/identify/all`;
console.log(API_KEY)

// Function to download the image from Firebase URL to local file
const downloadImage = async (url) => {
  try {
    const localUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
    console.log("Downloading image from URL:", url, "to local URI:", localUri);
    await FileSystem.downloadAsync(url, localUri);
    return localUri;
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;  // Re-throw the error to be caught in the calling function
  }
}

// Function to call PlantNet API
const callPlantApi = async (downloadURL, organ) => {
  try {
    console.log("Calling PlantNet API with URL:", downloadURL);
    // Download image locally from Firebase URL
    const localUri = await downloadImage(downloadURL);
    console.log("Downloaded image locally at:", localUri);

    let form = new FormData();
    form.append("images", {
      uri: localUri,
      name: "image.jpg",
      type: "image/jpeg",
    });
    form.append("organs", organ || "flower");  // Default organ is 'flower'

    // Make API call to PlantNet
    const response = await axios.post(`${API_URL}?api-key=${API_KEY}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Process the response from the API
    if (response.data && response.data.results) {
      console.log("Identified plants:", response.data.results);
      alert('results found')
      return response.data.results
      // You can process the results here, e.g., display or store the results
    } else {
      console.warn("No results from PlantNet API.");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
    } else {
      console.error("Error calling API:", error);
    }
  }
};

// Function to process the image
const processImage = async (imageUri, organ) => {
  try {
    console.log("Processing image:", imageUri);
    const imageName = imageUri.split("/").pop();

    // Upload image to Firebase
    const { downloadURL } = await firebaseUpload(imageUri, imageName);
    if (downloadURL) {
      console.log("Image uploaded successfully. Download URL:", downloadURL);
      // Call PlantNet API with the download URL
      await callPlantApi(downloadURL, organ);
    } else {
      console.error("No download URL received.");
    }
  } catch (error) {
    console.error("Error processing image:", error);
  }
};

export { callPlantApi, processImage };
