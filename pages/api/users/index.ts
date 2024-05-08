import { NextApiRequest, NextApiResponse } from "next";
// import prisma from '@/libs/prismadb';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method!=="GET"){
        return res.status(405).end();
    }
    try{
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt:'desc'
            }
        });
        return res.status(200).json(users);
    }catch(e){
        console.log(e);
        return res.status(400).end()
        
    }
}