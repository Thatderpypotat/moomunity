import type { PageServerLoad } from './$types';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { prisma } from '$lib';
import * as crypto from "node:crypto";

function hashPassword(password : string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
}

export const load = (async ({cookies}) => {
    let ifLoggedIn = cookies.get("activeUser");
    if(ifLoggedIn){
        throw redirect(303, "/dashboard")
    }
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    create:async ({cookies, request}) => {
        let data = await request.formData();
        let new_username = data.get("new_user")?.toString();
        let new_password = data.get("new_pass")?.toString();
        let lev = data.get("lev")?.toString() == "true";
        let age = parseInt(data.get("age")?.toString() ||"");
        let gender = data.get("gender")?.toString();
        let namn = data.get("personNamn")?.toString();
        let efternamn = data.get("personEfternamn")?.toString();
        
        const user = await prisma.user.findUnique({
            where:{
                name:new_username
            }
        })

        if(new_username && new_password && age && gender && namn && efternamn){
            console.log("workie")
            if(!user){
                console.log("workies")
                let fixed_pass = hashPassword(new_password);
                await prisma.user.create({
                    data: {
                        name: new_username,
                        youdontknowwhatdisis: fixed_pass.hash,
                        salt: fixed_pass.salt,
                        personNamn: namn,
                        personEfternamn: efternamn,
                        age: age,
                        gender: gender,
                        admin: false,
                        lev: lev
                    },
                })
                cookies.set("username", new_username, {secure : false, path:"/"})
                throw redirect(303, "/dashboard");
            } else{
                return fail(403, {error: 'Username taken', errorType: 1});
            }
        }

    }
};