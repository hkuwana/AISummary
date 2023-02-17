// import * as tf from '@tensorflow/tfjs';

// tf.ENV.set('WEBGL_PACK', false);

// // Define the input shapes for the model
// const contentShape = [1, 512, 512, 3];
// const styleShape = [1, 512, 512, 3];
// const tfModel = await tf.loadGraphModel('src/lib/style_transfer_tfjs/model.json');

// /**
//  * Utilizes a tensorflow model to stylize an image based on the artist of choice
//  * @param {HTMLImageElement} contentImage the path to the image to be stylized
//  * @param {HTMLImageElement} styleImage the path to the image to be used as the style
//  * @returns {Promise<tf.Tensor3D>} the stylized image
//  */
// export async function applyArtStyle(
// 	contentImage: HTMLImageElement,
// 	styleImage: HTMLImageElement
// ): Promise<tf.Tensor3D> {
// 	// Load the Magenta style transfer model

// 	// Load the input images and preprocess them into tensors
// 	const contentTensor = preprocessImage(contentImage);
// 	const styleTensor = preprocessImage(styleImage);

// 	await stylizeImage(contentTensor, styleTensor);
// }

// // Define a function to preprocess the input images into tensors
// function preprocessImage(image: HTMLImageElement): tf.Tensor {
// 	const tensor = tf.browser.fromPixels(image).toFloat();
// 	const resized = tf.image.resizeBilinear(tensor, [512, 512]);
// 	const expanded = resized.expandDims();
// 	return expanded;
// }

// // Define the stylize function
// async function stylizeImage(contentTensor: tf.Tensor, styleTensor: tf.Tensor) {
// 	const stylized = tf.tidy(() => {
// 		// Scale the style image to match the content image size
// 		const scaledStyle = tf.image.resizeBilinear(styleTensor, [512, 512]);

// 		// Normalize the pixel values of the style and content images
// 		const normalizedStyle = tf.div(tf.sub(scaledStyle, 127.5), 127.5);
// 		const normalizedContent = tf.div(tf.sub(contentTensor, 127.5), 127.5);

// 		// Run the style transfer model
// 		const stylized = tfModel.execute(
// 			{
// 				content: normalizedContent,
// 				style: normalizedStyle
// 			},
// 			'transform/Tanh'
// 		);

// 		// Denormalize the stylized image pixel values
// 		const denormalized = tf.add(tf.mul(tf.add(stylized, 1), 127.5), 0.5);
// 		return denormalized;
// 	});

// 	const stylizedImage = tf.browser.toPixels(stylized);
// 	// do something with the stylizedImage (e.g. display it on the page or send it back to the server)
// 	stylized.dispose();
// }
