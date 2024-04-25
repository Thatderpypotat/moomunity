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
    like: async ({request, cookies}) => {
        let data = await request.formData();
        let tjunstName = data.get("tjunstName")?.toString();
        let userName = cookies.get("activeUser");

        let kontroll = await prisma.likeCheker.findFirst({
            where:{
                tname:tjunstName,
                userN:userName
            }
        })

        if(!kontroll){
            if(tjunstName && userName){

                console.log(userName,tjunstName);

                await prisma.likeCheker.create({
                    data:{
                        userN:userName,
                        tname:tjunstName,
                        likee: true
                    }
                });
                await prisma.tjanst.update({
                    where:{
                        name:tjunstName
                    },
                    data:{
                        likes: {
                            increment:1
                        }
                    }
                });
            }
        }else{
            if(kontroll.likee == false){
                if(tjunstName && userName){
                    await prisma.tjanst.update({
                        where:{
                            name:tjunstName
                        },
                        data:{
                            likes: {
                                increment:1
                            }
                        }
                    });
                    await prisma.likeCheker.updateMany({
                        where:{
                            userN:userName,
                            tname:tjunstName
                        }, data:{
                            likee: true
                        }
                    });
                }
            }else{
                if(tjunstName && userName){
                    await prisma.tjanst.update({
                        where:{
                            name:tjunstName
                        },
                        data:{
                            likes: {
                                decrement:1
                            }
                        }
                    });
                    await prisma.likeCheker.updateMany({
                        where:{
                            userN:userName,
                            tname:tjunstName
                        }, data:{
                            likee: false
                        }
                    });
                }
            }
        }
        
    },
    leverera: async ({request, cookies}) => {
        let data = await request.formData();
        let tjunstName = data.get("tjunstName")?.toString();
        let userName = cookies.get("activeUser");

        let kontroll = await prisma.levCheker.findFirst({
            where:{
                tjanstname:tjunstName,
                userName:userName
            }
        })

        if(!kontroll){
            if(tjunstName && userName){

                console.log(userName,tjunstName);

                await prisma.levCheker.create({
                    data:{
                        userName:userName,
                        tjanstname:tjunstName,
                        levee: true
                    }
                });
                await prisma.tjanst.update({
                    where:{
                        name:tjunstName
                    },
                    data:{
                        levs: {
                            increment:1
                        }
                    }
                });
            }
        }else{
            if(kontroll.levee == false){
                if(tjunstName && userName){
                    await prisma.tjanst.update({
                        where:{
                            name:tjunstName
                        },
                        data:{
                            levs: {
                                increment:1
                            }
                        }
                    });
                    await prisma.levCheker.updateMany({
                        where:{
                            userName:userName,
                            tjanstname:tjunstName
                        }, data:{
                            levee: true
                        }
                    });
                }
            }else{
                if(tjunstName && userName){
                    await prisma.tjanst.update({
                        where:{
                            name:tjunstName
                        },
                        data:{
                            levs: {
                                decrement:1
                            }
                        }
                    });
                    await prisma.levCheker.updateMany({
                        where:{
                            userName:userName,
                            tjanstname:tjunstName
                        }, data:{
                            levee: false
                        }
                    });
                }
            }
        }
    }
};