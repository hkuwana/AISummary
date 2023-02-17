<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { dev } from '$app/environment';
	import type { PageData, ActionData } from './$types';
	import type { Tensor3D } from '@tensorflow/tfjs';

	import MonetJPG from '$lib/images/Monet1.jpg';
	import PicassoJPG from '$lib/images/Picasso.jpg';
	import HokusaiJPG from '$lib/images/Hokusai1.jpg';
	import Hiro from '$lib/images/Hiro_face.jpg';

	export let data: PageData;
	export let form: ActionData;

	let mergeImage: Tensor3D;
	let artistFilePath = HokusaiJPG;
	let avatar: string;
	let selectedFile: File;

	let userImage8Int, artistImage8Int: Uint8Array;

	function stringToUint8Array(intString: string): Uint8Array {
		const encoder = new TextEncoder();
		return encoder.encode(intString);
	}

	function handleFileInput(e: Event) {
		const target = e.target as HTMLButtonElement;
		if (!target) return;
		selectedFile = target.files[0];
		if (!selectedFile) return;
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onload = (e: Event) => {
			// checks if reader.result is not a string
			if (typeof reader.result !== 'string') return;
			avatar = reader.result;
			console.log(avatar);
		};
	}

	async function handleFormSubmit() {
	// 	// Gets the name of the file in a pathway
		// const artistChosen = artistFilePath.split('/').pop()?.split('.')[0];
		// const userImage = document.getElementById('picasso') as HTMLImageElement;
		// if (!artistChosen) return;
		// const artistImage = document.getElementById(artistChosen) as HTMLImageElement;
		// applyArtStyle(userImage, artistImage).then((result) => {
		// 	mergeImage = result;
		// });
		console.log(mergeImage);
	}

	// Based on the button clicked, uses a switch case to determine the artist and then sets the filepath to the artist's image
	function handleButtonClick(artist: string) {
		switch (artist) {
			case MonetJPG:
				artistFilePath = MonetJPG;
				break;
			case PicassoJPG:
				artistFilePath = PicassoJPG;
				break;
			case HokusaiJPG:
				artistFilePath = HokusaiJPG;
				break;
			default:
				artistFilePath = HokusaiJPG;
				break;
		}
		return artistFilePath;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="AI create cards with style" />
</svelte:head>

<section>
	<div class="grid grid-cols-2 justify-center  ">
		<div class="max-w-md">
			<div id="Monet" class="carousel-item w-full">
				{#if avatar}
					<img class="avatar" src={avatar} alt="d" />
				{:else}
					<img
						id="avatar"
						src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
						alt="self uploaded "
					/>
				{/if}
			</div>
			<form
				method="POST"
				action="?/match"
				use:enhance={({ form, data, action, cancel }) => {
					// `form` is the `<form>` element
					// `data` is its `FormData` object
					// `action` is the URL to which the form is posted
					// `cancel()` will prevent the submission

					return async ({ result, update }) => {
						// `result` is an `ActionResult` object
						// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
						if (result.type === 'success') {
							// `result.data` is the data returned by the server

							await applyAction(result);
						}
					};
				}}
			>
				<div class="file-input">
					<input
						type="file"
						name="imageFile"
						class=" file-input file-input-bordered w-full max-w-xs"
						on:change={handleFileInput}
					/>
				</div>
				<input
					class:hidden={!dev}
					class="btn  btn-primary btn-sm md:btn-md"
					name="artistPath"
					type="text"
					value={artistFilePath}
				/>
				<button value="finish" class=" btn btn-outline btn-primary btn-sm md:btn-md">
					Match
				</button>
			</form>
			<button
				on:click={() => handleFormSubmit()}
				class=" btn btn-outline  btn-primary btn-sm md:btn-md"
			>
				Match
			</button>
		</div>
		<div class="max-w-md">
			<div class="flex justify-center w-full py-2 sm:gap-2">
				<button on:click={() => handleButtonClick(MonetJPG)} class="btn btn-xs">Monet</button>
				<button on:click={() => handleButtonClick(PicassoJPG)} class="btn btn-xs">Picasso</button>
				<button on:click={() => handleButtonClick(HokusaiJPG)} class="btn btn-xs">Hokusai</button>
			</div>
			<div class="carousel w-full">
				<div class:hidden={artistFilePath != MonetJPG} class="carousel-item w-full">
					<img id="Monet" alt="Monet" src={MonetJPG} class="w-full object-scale-down" />
				</div>
				<div class:hidden={artistFilePath != PicassoJPG} class="carousel-item w-full">
					<img id="Picasso" alt="Picasso" src={PicassoJPG} class="w-full object-scale-down" />
				</div>
				<div class:hidden={artistFilePath != HokusaiJPG} class="carousel-item w-full">
					<img id="Hokusai" alt="Hokusai" src={HokusaiJPG} class="w-full object-scale-down" />
				</div>
			</div>

			<div />
		</div>
	</div>
	{#if form?.type === 'success'}
		<!-- this message is ephemeral; it exists because the page was rendered in       response to a form submission. it will vanish if the user reloads -->
		<div class="bg-accent container px-3 py-10 mx-auto">
			<h1
				class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white"
			>
				Merged Photo
			</h1>

			<p class="mt-4 text-center text-gray-500 dark:text-gray-300">
				Here is the merged photo of you and the artist
			</p>

			<div
				class="grid grid-cols-1 gap-4 sm:gap-8 sm:mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3"
			>
				<h1>{mergeImage}</h1>
			</div>
		</div>
	{/if}
	{#if dev}
		<h1>Dev mode</h1>
		<p>Selected file path: {mergeImage}</p>
	{/if}
</section>
