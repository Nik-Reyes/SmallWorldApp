
import axios from 'axios';
import { firebaseUpload, getPhotoUrl } from './firebaseConfig.js';
import * as FileSystem from 'expo-file-system'
import Config from 'react-native-config';

// PlantNet API constants
const API_KEY = Config.PLANTNET_API_KEY;
const API_URL = 'https://my-api.plantnet.org/v2/identify/all?api-key=2b10b5BBeinjraYHuiW1SKcN';

// Call the PlantNet API with the image URL
const callPlantApi = async (downloadURL, organ) => {
    const form = new FormData();
    form.append('organs', organ);
    form.append('images', {
        uri: downloadURL, // Use the download URL from Firebase
        name: 'image.jpg',
        type: 'image/jpeg',
    });

    try {
        const { status, data } = await axios.post(API_URL, form, {
            headers: { 
                // headers: form.getHeaders(),
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${API_KEY}` // Add this line if the API requires Bearer token
            },
            
        });

        console.log('API Status:', status);
        console.log('API Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.response?.data);
        } else {
            console.error('Error calling API:', error);
        }
    }
};

// Main function to handle the image upload and API call
const processImage = async (imageUri, organ) => {
    try {
        console.log("Selected image URI:", imageUri);
        const imageName = imageUri.split('/').pop();

        // Upload to Firebase
        const { downloadURL } = await firebaseUpload(imageUri, imageName);

        if (downloadURL) {
            console.log("Image uploaded to Firebase. Download URL:", downloadURL);

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

