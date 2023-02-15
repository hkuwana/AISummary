import {
	FIREBASE_DEV_API_KEY,
	FIREBASE_DEV_AUTH_DOMAIN,
	FIREBASE_DEV_PROJECT_ID,
	FIREBASE_DEV_STORAGE_BUCKET,
	FIREBASE_DEV_MESSAGING_SENDER_ID,
	FIREBASE_DEV_APP_ID,
	FIREBASE_DEV_MEASUREMENT_ID,
	FIREBASE_PROD_API_KEY,
	FIREBASE_PROD_AUTH_DOMAIN,
	FIREBASE_PROD_PROJECT_ID,
	FIREBASE_PROD_STORAGE_BUCKET,
	FIREBASE_PROD_MESSAGING_SENDER_ID,
	FIREBASE_PROD_APP_ID,
	FIREBASE_PROD_MEASUREMENT_ID
} from '$env/static/private';
import { dev } from '$app/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
// If the app is in dev mode use the firebase dev config
const firebaseConfig = dev
	? {
			apiKey: FIREBASE_DEV_API_KEY,
			authDomain: FIREBASE_DEV_AUTH_DOMAIN,
			databaseURL: FIREBASE_DEV_AUTH_DOMAIN,
			projectId: FIREBASE_DEV_PROJECT_ID,
			storageBucket: FIREBASE_DEV_STORAGE_BUCKET,
			messagingSenderId: FIREBASE_DEV_MESSAGING_SENDER_ID,
			appId: FIREBASE_DEV_APP_ID,
			measurementId: FIREBASE_PROD_MEASUREMENT_ID
	  }
	: {
			apiKey: FIREBASE_PROD_API_KEY,
			authDomain: FIREBASE_PROD_AUTH_DOMAIN,
			databaseURL: FIREBASE_PROD_AUTH_DOMAIN,
			projectId: FIREBASE_PROD_PROJECT_ID,
			storageBucket: FIREBASE_PROD_STORAGE_BUCKET,
			messagingSenderId: FIREBASE_PROD_MESSAGING_SENDER_ID,
			appId: FIREBASE_PROD_APP_ID,
			measurementId: FIREBASE_DEV_MEASUREMENT_ID
	  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveImages() {
	console.log('saveImages');
}

/**
 * Gets the image from firebaseStorage
 * @param {string} imageName the name of the image
 */
export async function getImageFromFirebaseStorage(imageName: string) {
	try {
		const storageRef = app.storage().ref();
		const imageRef = storageRef.child(imageName);
		const imageURL = await imageRef.getDownloadURL();
		return imageURL;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
