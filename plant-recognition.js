import axios from 'axios';
import { firebaseUpload } from './firebaseConfig';
import Config from 'react-native-config';
import { PLANTNET_API_KEY } from "@env";


const API_KEY = Config.PLANTNET_API_KEY || '2b10AYemxBmUt7qKBoWFpFq9u'; // Use .env or fallback
const API_URL = `https://my-api.plantnet.org/v2/identify/all`;

const callPlantApi = async (downloadURL, organ) => {

    //Making console logs to debug
    console.log("Using API Key:", API_KEY);
    console.log("Calling API URL:", API_URL);

    const form = new FormData();

    // Append organs and images to FormData
    form.append('images', {
        uri: downloadURL, // Firebase download URL
        name: 'image.jpg', // File name
        type: 'image/jpeg', // MIME type
    });
    form.append('organs', 'flower');  // We have to specify what type of prgan we are trying to idenify. In our case its flower

    // Debugging FormData
    for (const [key, value] of form.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        //Make POST request
        const { status, data } = await axios.post('https://my-api.plantnet.org/v2/identify/all', form, {
            headers: {
                "Authorization": `Bearer ${PLANTNET_API_KEY}`,
                'Content-Type': 'multipart/form-data',
            },
          });

        console.log('API Status:', status);
        console.log('API Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.response?.data || error.message);
        } else {
            console.error('Error calling API:', error);
        }
    }
};

const processImage = async (imageUri, organ) => {
    try {
        console.log("Selected image URI:", imageUri);
        const imageName = imageUri.split('/').pop();

        // Upload to Firebase
        const { downloadURL } = await firebaseUpload(imageUri, imageName);

        if (downloadURL) {
            console.log("Image uploaded to Firebase. Download URL:", downloadURL);

            // Call the PlantNet API with the Firebase URL and organ type
            await callPlantApi(downloadURL, organ);
        } else {
            console.error("No download URL received.");
        }
    } catch (error) {
        console.error("Error processing image:", error);
    }
};

export { callPlantApi, processImage };
