import { sveltekit } from '@sveltejs/kit/vite';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib';

export const load: PageServerLoad = async () => {
    let tjansts = await prisma.tjanst.findMany({
        where:{
            accepted:true
        }
    });
    return {tjansts};
};

export const actions: Actions = {
    nyide: async ({request}) => {
        redirect(303, "/dashboard/request")
    },
};
