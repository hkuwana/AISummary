import { saveImages } from '$lib/server/firebase';
import { error } from '@sveltejs/kit';
import path from 'path';
import type { Actions, PageServerLoad } from './$types';


import { readFile, readdir } from 'fs';
// import { getImageFromFirebaseStorage } from '$lib/server/firebase';

let model;
let artistFile;
let tensor;

export const actions = {
	/**
	 * Modify game state in reaction to a guessed word. This logic always runs on
	 * the server, so that people can't cheat by peeking at the JavaScript
	 */
	match: async ({ request, cookies, url }) => {
		// Gets the image from the input
		const data = await request.formData();
		let userImageFile = data.get('imageFile') as File;
		// Uploads Hiro's face if the size of File is 0 or undefined
		console.log(userImageFile.size);
		if (userImageFile.size === 0 || userImageFile == undefined) {
			console.log('userImageFile is not uploaded');
			userImageFile = await imageFilePathToFile('src/lib/images/Hiro_face.jpg');
		}
		console.log('user image file is:', userImageFile);

		const artistFilePath = (data.get('artistPath') as string).slice(1);
		const fileName = path.basename(artistFilePath);
		console.log('fileName: ');
		console.log(fileName);

		if (!pathExists(path.dirname(artistFilePath))) {
			console.log('Path does not exist');
			return {
				type: 'internal error',
				status: 500
			};
		}
		artistFile = await imageFilePathToFile(artistFilePath);

		console.log(artistFile);
		const userImage8Int = await imageFileToUint8Array(userImageFile);
		const artistImage8Int = await imageFileToUint8Array(artistFile);

		console.log('userImage8Int: ');
		console.log(userImage8Int);
		console.log('artistImage8Int: ');
		console.log(artistImage8Int);
		// Converting uint8array as it's not a plain old javascript object (POJO)
		const userImageStr = uint8ArrayToString(userImage8Int);
		const artistImageStr = uint8ArrayToString(artistImage8Int);

		return {
			type: 'success',
			status: 200,
			dataUserImageStr: userImageStr,
			dataAristImageStr: artistImageStr
		};
	}
} satisfies Actions;

/**
 * Checks if given a path, the path exists
 * @param {string} imageFilePath the path to the image to be converted
 * @returns {File} the image file
 */
function pathExists(imageFilePath: string): boolean {
	readdir(imageFilePath, (err, files) => {
		if (err) {
			console.error(`Error reading directory: ${err}`);
			return false;
		}
		console.log(`Files in directory: ${files}`);
	});
	return true;
}

/**
 * Given a path to file, returns the File object
 * @param {string} imageFilePath the path to the image to be converted
 * @returns {File} the image file
 */
function imageFilePathToFile(imageFilePath: string): Promise<File> {
	return new Promise(
		(resolve: (arg0: File) => void, reject: (arg0: NodeJS.ErrnoException) => void) => {
			readFile(imageFilePath, (err, data) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					const file = new File([data], imageFilePath);
					resolve(file);
				}
			});
		}
	);
}

/**
 * Node.js, given a file object, returns the file as a Uint8Array
 * @param {File} imageFile the image file to be converted
 * @returns {Uint8Array} the image file as a Uint8Array
 */
async function imageFileToUint8Array(imageFile: File): Promise<Uint8Array> {
	const buffer = await imageFile.arrayBuffer();
	return new Uint8Array(buffer);
}

function uint8ArrayToString(array: Uint8Array): string {
	const decoder = new TextDecoder('utf-8');
	return decoder.decode(array);
}
