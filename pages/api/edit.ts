
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';
import checkCurrentUser from "@/libs/checkCurrentUser";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method!=='PATCH'){
        return res.status(405).end()
    }
    try{
        
        const{name, username, bio, profileImage, coverImage} = req.body;
        const {currentUser} = await checkCurrentUser(req);
        if(!name || !username){
            throw new Error("missing fields")
        }
        const updatedUser = await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });
        return res.status(200).json(updatedUser)
    }catch(e){
        console.log(e);
        return res.status(400).end()
        
    }
}