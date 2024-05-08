import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler (req:NextApiRequest,res:NextApiResponse){
    if(req.method !=='GET'){
        return res.json('not get')
    }try{
        return res.json('qerqwerqewr')
    }catch(e){  
        return res.json(e+'errrrrrrorr')
        
    }
}