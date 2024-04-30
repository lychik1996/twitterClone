
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';
import checkCurrentUser from "@/libs/checkCurrentUser";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method !== 'POST' && req.method!=="DELETE"){
        return res.status(405).end();
    }
    try{
        
        const {userId} =req.body;
        const {currentUser} = await checkCurrentUser(req);
        
        if(!userId || typeof userId !=='string'){
            throw new Error("Invalid ID");
        }

        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        });
        if(!user){
            throw new Error("Invalid ID")
        }
        
        let updatedFollowerIds = [...(user.followerIds || [])];
        let updateFollowingIds = [...(currentUser.followingIds || [])];

        if(req.method === "POST"){
            updateFollowingIds.push(user.id);
            updatedFollowerIds.push(currentUser.id);
        }
        if(req.method === 'DELETE'){
            updatedFollowerIds = updatedFollowerIds.filter(followerId=>followerId!== currentUser.id);
            updateFollowingIds = updateFollowingIds.filter(followingId=>followingId!==user.id);
        }

        const updatedUser = await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                followerIds:updatedFollowerIds
            }
        });
        const updateCurentUser = await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                followingIds:updateFollowingIds
            }
        })

        return res.status(200).json({updatedUser, updateCurentUser});

    }catch(e){
        console.log(e);
        return res.status(400).end()
        
    }
} 