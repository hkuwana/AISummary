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
import { getAnalytics } from 'firebase/analytics';

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref } from 'firebase/storage';

import 'firebase/storage';

// If the app is in dev mode use the firebase dev config
const firebaseConfig = dev
	? {
			apiKey: FIREBASE_DEV_API_KEY,
			authDomain: FIREBASE_DEV_AUTH_DOMAIN,
			projectId: FIREBASE_DEV_PROJECT_ID,
			storageBucket: FIREBASE_DEV_STORAGE_BUCKET,
			messagingSenderId: FIREBASE_DEV_MESSAGING_SENDER_ID,
			appId: FIREBASE_DEV_APP_ID,
			measurementId: FIREBASE_DEV_MEASUREMENT_ID
	  }
	: {
			apiKey: FIREBASE_PROD_API_KEY,
			authDomain: FIREBASE_PROD_AUTH_DOMAIN,
			projectId: FIREBASE_PROD_PROJECT_ID,
			storageBucket: FIREBASE_PROD_STORAGE_BUCKET,
			messagingSenderId: FIREBASE_PROD_MESSAGING_SENDER_ID,
			appId: FIREBASE_PROD_APP_ID,
			measurementId: FIREBASE_PROD_MEASUREMENT_ID
	  };

const app = initializeApp(firebaseConfig);
// // Checks if analytics is supported with cookies enabled
// if  analytics.isSupported() {
// 	const analytics = getAnalytics(app);
// }
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
		// Create a root reference
		const storage = getStorage();
		// Create a reference to 'mountains.jpg'
		const mountainsRef = ref(storage, 'mountains.jpg');

		// Create a reference to 'images/mountains.jpg'
		const mountainImagesRef = ref(storage, 'images/mountains.jpg');

		const imageURL = await imageRef.getDownloadURL();
		return imageURL;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
