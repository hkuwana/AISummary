<script lang="ts">
	import MonetJPG from '$lib/images/Monet1.jpg';
	import PicassoJPG from '$lib/images/Picasso.jpg';
	import HokusaiJPG from '$lib/images/Hokusai1.jpg';

	let imageData;

	async function uploadImage() {
		const image = new Image();
		const file = document.querySelector('input[type="file"]').files[0];
	const reader = new FileReader();

	reader.readAsDataURL(file);
	reader.onload = (event) => {
		image.src = event.target.result;
		document.body.appendChild(image);
		imageData = event.target.result;
	};
}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="AI create cards with style" />
</svelte:head>

<section >
	<div class="grid justify-center  ">
		<form on:submit|preventDefault={uploadImage}>
			<input type="file" id="img" class="file-input file-input-bordered w-full max-w-xs" />
			<button type="submit">Upload</button>
		</form>
			<div class="carousel w-full">
		<div id="Monet" class="carousel-item w-full">
			<img src={MonetJPG} class="w-full object-scale-down" />
		</div> 
		<div id="Picasso" class="carousel-item w-full">
			<img src={PicassoJPG} class="w-full object-scale-down" />
		</div> 
		<div id="Hokusai" class="carousel-item w-full">
			<img src={HokusaiJPG} class="w-full object-scale-down" />
		</div>
	</div> 			

	<div class="flex justify-center w-full py-2 gap-2">
	<a href="#Monet" class="btn btn-xs">1</a> 
	<a href="#Picasso" class="btn btn-xs">2</a> 
	<a href="#Hokusai" class="btn btn-xs">3</a> 
	</div>
	<div/>
	<div class="flex justify-center w-full py-2 gap-2">
	<a href="#Monet" class="btn btn-xs">1</a> 
	<a href="#Picasso" class="btn btn-xs">2</a> 
	<a href="#Hokusai" class="btn btn-xs">3</a> 
	</div>
	<div/>
	
	<h2>
		try uploading an image <strong>src/routes/+page.svelte</strong>
	</h2>
</section>

