import { sveltekit } from '@sveltejs/kit/vite';
import type { PageServerLoad } from './$types';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib';
import * as crypto from "node:crypto";

function validatePassword(inputPassword : string, storedSalt : string, storedHash: string) {
    const hash = crypto.pbkdf2Sync(inputPassword, storedSalt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
}

export const load = (async ({cookies}) => {
    let ifLoggedIn = cookies.get("activeUser");
    if(ifLoggedIn){
        throw redirect(303, "/dashboard")
    }
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({request, cookies}) => {
        let data = await request.formData();
        let form_username = data.get("UserName")?.toString();
        let form_password = data.get("Password")?.toString();
        
        let database_user = await prisma.user.findUnique({where:{name:form_username}})

        if(form_username && form_password){
            console.log("boi1")
            if(form_username === database_user?.name){
                console.log("boi2")
                if(validatePassword(form_password, database_user.salt, database_user.youdontknowwhatdisis)){
                    cookies.set("activeUser", form_username, {secure : false, path:"/"})
                    throw redirect(303, "/dashboard")
                    
                }else{
                    return fail(400, {form_password: "Fel lösenord"})
                }
            }else{
                return fail(400, {form_username: "Användarnamnet finns inte, vill du registrera istället?"})
            }
        }
    },
    reg: async ({cookies}) => {
        let username = cookies.get("username");
        if(!username){
            throw redirect(303, "/registrera");
        }
        if(username){
            return fail(400, {username: "du är redan inloggad"});
        }
    }
        
};