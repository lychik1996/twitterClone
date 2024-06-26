import { NextApiRequest, NextApiResponse } from "next";
// import prisma from '@/libs/prismadb';
import checkCurrentUser from "@/libs/checkCurrentUser";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=="POST" && req.method !=="GET"){
        return res.status(405).end();
    }
    try{
        if(req.method==="POST"){
        
        const{body} = req.body;
        const {currentUser} = await checkCurrentUser(req);
        
        const post = await prisma.post.create({
            data:{
                body,
                userId:currentUser.id
            }
        });
        return res.status(200).json(post);
        }
        if(req.method ==="GET"){
            const {userId} =req.query;
            let posts;
            if(userId && typeof userId ==='string'){
                posts = await prisma.post.findMany({
                    where:{
                        userId
                    },
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                })
            }else{
                posts = await prisma.post.findMany({
                    include:{
                        user:true,
                        comments:true,
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                });
            }
            
            return res.status(200).json(posts);
        }

    }catch(e){
        console.log(e);
        return res.status(400).end();
        
    }
}