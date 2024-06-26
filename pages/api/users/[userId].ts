import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/libs/prismadb";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function  handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method!=="GET"){
        return res.status(405).end();
    }
    try{
        const{userId}= req.query;
        if(!userId || typeof userId!== 'string'){
            throw new Error("Invalid Id")
        }
        const existingUser = await prisma.user.findUnique({
            where:{
                id:userId
            }
        });
        
        
        return res.status(200).json({...existingUser })
    }catch(e){
        console.log(e);
        return res.status(400).end();
        
    }
}