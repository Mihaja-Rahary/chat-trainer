import fs from 'fs';
import path from 'path';
import { generateToken } from '../utils/generateToken.js';

const tokensFile = path.join(process.cwd(), 'data/tokens.json');

export default function handler(req,res){
  let tokens = fs.existsSync(tokensFile) ? JSON.parse(fs.readFileSync(tokensFile)) : [];

  if(req.method==="POST"){
    const {role, requesterRole} = req.body;
    if(requesterRole==="chatter") return res.status(403).json({error:"Pas autorisé"});
    
    const token = generateToken(16);
    tokens.push({token, role, used:false, createdBy:requesterRole});
    fs.writeFileSync(tokensFile,JSON.stringify(tokens,null,2));
    return res.status(200).json({token});
  }

  if(req.method==="GET") return res.status(200).json(tokens);

  return res.status(400).json({error:"Methode invalide"});
}
