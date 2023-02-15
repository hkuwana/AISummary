<script lang="ts">
	import MonetJPG from '$lib/images/Monet1.jpg';
	import PicassoJPG from '$lib/images/Picasso.jpg';
	import HokusaiJPG from '$lib/images/Hokusai1.jpg';



	let avatar: String;

	let selectedFile: File;

	function handleFileInput(e?: Event & { target: EventTarget & HTMLInputElement }) {
		if (!e) return;
		if (!e.target) return;
		if (!e.target.files) return;
		selectedFile = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onload = (e: Event) => {
			avatar = e.target?.result;
			console.log(avatar);
		};
	}

	async function handleFormSubmit(event: SubmitEvent) {
		event.preventDefault();
		try {
			const imageURL = await getImageFromFirebaseStorage(selectedFile.name);

			const formData = new FormData();
			formData.append('imageURL', imageURL);

			const response = await fetch('/api/generateImage', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error(error);
			throw error;
		}
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
						class="avatar"
						src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
						alt=""
					/>
				{/if}
			</div>
			<form on:submit={handleFormSubmit}>
				<div class="file-input">
					<input
						type="file"
						class=" file-input file-input-bordered w-full max-w-xs"
						on:change={handleFileInput}
					/>
				</div>

				<button type="submit" class="btn btn-primary"> Match </button>
			</form>
		</div>
		<div class="max-w-md">
			<div class="carousel w-full">
				<div id="Monet" class="carousel-item w-full">
					<img alt="Monet" src={MonetJPG} class="w-full object-scale-down" />
				</div>
				<div id="Picasso" class="carousel-item w-full">
					<img alt="Picasso" src={PicassoJPG} class="w-full object-scale-down" />
				</div>
				<div id="Hokusai" class="carousel-item w-full">
					<img alt="Hokusai" src={HokusaiJPG} class="w-full object-scale-down" />
				</div>
			</div>

			<div class="flex justify-center w-full py-2 gap-2">
				<a href="#Monet" class="btn btn-xs">1</a>
				<a href="#Picasso" class="btn btn-xs">2</a>
				<a href="#Hokusai" class="btn btn-xs">3</a>
			</div>
			<div />
		</div>
	</div>
</section>
