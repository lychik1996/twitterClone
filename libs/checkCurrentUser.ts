import { NextApiRequest } from "next";
import prisma from '@/libs/prismadb';

export default async function checkCurrentUser(req:NextApiRequest){
    const {currentUser:user}=req.body;
    const currentUser = await prisma.user.findUnique({
        where:{
            email:user.email
        }
    });
    if(!currentUser){
        throw new Error('Not signed in')
    }
    return {currentUser}
}