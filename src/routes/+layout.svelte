<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<div class="min-h-screen">
	<Header />

	<main class="p-4 w-full max-w-5xl box-border">
		<slot />
	</main>
<p>
			visit <a class="font-bold" href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
		</p>
	<footer class="items-center p-3">
		<p>
			visit <a class="font-bold" href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
	</p>
</footer>
</div>
