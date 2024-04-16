import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib';

export const load = (async ({cookies}) => {
    let cookieUser = cookies.get("activeUser");
    let isAdmin = false;
    if(!cookieUser){
        redirect(303, "/")
    }
    else{
        let user = await prisma.user.findUnique({
            where: {
                name: cookieUser
            }
        });
        if(user)
            if(user.admin == true){
                isAdmin = user.admin;
            } 
    }
    return {isAdmin};
}) satisfies PageServerLoad;

export const actions: Actions = {
    newRequest: async ({request}) => {
        let data = await request.formData();
        let name = data.get("request")?.toString();
        let desc = data.get("description")?.toString();
        let checkedName = await prisma.tjanst.findUnique({
            where:{
                name:name
            }
        })
        if(name && desc){
            if(!checkedName){
                await prisma.tjanst.create({
                    data:{
                        name:name,
                        desc:desc,
                        accepted: false
                    }
                })
            }
        }
    }
};