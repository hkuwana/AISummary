import { saveImages } from '$lib/server/firebase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getImageFromFirebaseStorage } from '$lib/server/firebase';

export const load = (({ params }) => {
	return {
		post: {
			title: `Title for ${params.slug} goes here`,
			content: `Content for ${params.slug} goes here`
		}
	};
}) satisfies PageLoad;
