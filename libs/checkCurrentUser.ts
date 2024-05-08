import { NextApiRequest } from "next";
// import prisma from '@/libs/prismadb';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
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