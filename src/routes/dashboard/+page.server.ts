import { sveltekit } from '@sveltejs/kit/vite';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    return {};
};

export const actions: Actions = {
    nyide: async ({request}) => {
        redirect(303, "/dashboard/request")
    },
};
