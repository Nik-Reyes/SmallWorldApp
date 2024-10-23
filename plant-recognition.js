
import fs from 'fs';
import axios from 'axios'; // HTTP client
import FormData from 'form-data'; // Readable "multipart/form-data" streams';
import { firebaseUpload, getPhotoUrl } from './firebaseConfig.js';
import { PLANTNET_API_KEY } from '@env';


// PlantNet API constants
const PROJECT = 'all'; // try 'weurope' or 'canada'
const API_KEY = process.env.PLANTNET_API_KEY;
const API_URL = `https://my-api.plantnet.org/v2/identify/all?api-key=${PLANTNET_API_KEY}`;
const API_LANG = '&lang=fr'; // default: en

// Call the PlantNet API with the image URL
const callPlantApi = async (imageUrl, organ) => {
    let form = new FormData();
    form.append('organs', organ);
    // form.append('images', fs.createReadStream(imageUrl)); // Use the image URL

    try {

        // // Fetch the image and convert to a buffer
        // const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        // const buffer = Buffer.from(response.data, 'binary').toString('base64');

        form.append('images', imageUrl); 
        //{
        //     filename: 'image.jpg', // Change to your desired filename
        //     contentType: 'image/jpeg', // Change to the correct content type
        // });

        const { status, data } = await axios.post(API_URL, form, {
            headers: {
                ...form.getHeaders(),
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log('status', status); // should be: 200
        // console.log('data', require('util').inspect(data, false, null, true));
        console.log('data', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('error', error);
    }
};

// Main function to handle the image upload and API call
const processImage = async (imageUri, organ) => {
    try {
        const imageName = imageUri.split('/').pop(); // Extract the image name from URI
        const { downloadURL } = await firebaseUpload(imageUri, imageName); // Upload and get URL
        console.log('Image uploaded to Firebase. Download URL:', downloadURL);
        
        await callPlantApi(downloadURL, organ); // Call API with image URL
    } catch (error) {
        console.error('Error processing image:', error);
    }
};


// Example usage
const imageUri = 'path/to/local/image.jpg'; // This will be dynamically set from user input
const organ = 'flower'; // This can also be dynamically set based on user input
processImage(imageUri, organ);
