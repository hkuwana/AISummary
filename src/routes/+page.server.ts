import { saveImages } from '$lib/server/firebase';
import { error } from '@sveltejs/kit';
import path from 'path';
import type { Actions, PageServerLoad } from './$types';

import * as tf from '@tensorflow/tfjs';
import * as tfNode from '@tensorflow/tfjs-node';
import { readFile, readdir } from 'fs';
import modelJson from '$lib/style_transfer_tfjs/model.json';
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
		const userImageFile = data.get('imageFile') as File;
		if (!userImageFile) {
			await imageFilePathToFile('src/lib/images/Hiro_face.jpg');
		}

		const artistFilePath = (data.get('artistPath') as string).slice(1);
		const fileName = path.basename(artistFilePath);
		console.log('fileName: ');
		console.log(fileName);
		console.log(userImageFile);

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
		// Load the model

		// Load the style transfer model from TF Hub
		console.log(modelJson);
		const handler = new JSONHandler(modelJson);
		const styleTransferModel = await tf.loadGraphModel(handler);
		console.log('styleTransferModel: ');
		console.log(styleTransferModel);
		const styledImage = await applyArtStyle(userImage8Int, artistImage8Int);
		console.log('styledImage: ');
		console.log(styledImage);
		return {
			type: 'success',
			status: 200
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

/**
 * Utilizes a tensorflow model to stylize an image based on the artist of choice
 * @param {Uint8Array} contentImage the path to the image to be stylized
 * @param {Uint8Array} styleImage the path to the image to be used as the style
 * @returns {Promise<tf.Tensor3D>} the stylized image
 */
async function applyArtStyle(
	contentImage: Uint8Array,
	styleImage: Uint8Array
): Promise<tf.Tensor3D> {
	// Load the content and style images as TensorFlow tensors
	const tfContentImage = tfNode.node.decodeImage(contentImage);
	const tfStyleImage = tfNode.node.decodeImage(styleImage);

	// Load the style transfer model from TF Hub
	const styleTransferModel = await tf.loadGraphModel(models);

	// Preprocess the images
	const contentImageResized = tf.image.resizeBilinear(contentImage, [256, 256]);
	const styleImageResized = tf.image.resizeBilinear(styleImage, [256, 256]);
	const contentImageNormalized = contentImageResized.toFloat().div(tf.scalar(255));
	const styleImageNormalized = styleImageResized.toFloat().div(tf.scalar(255));

	// Run the style transfer operation
	const stylizedImage = styleTransferModel.execute({
		'content_image:0': contentImageNormalized,
		'style_image:0': styleImageNormalized
	}) as tf.Tensor3D;

	console.log(styleImage);
	return stylizedImage;
}
