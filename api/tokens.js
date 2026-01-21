// Fichier: api/tokens.js
import fs from 'fs';
import path from 'path';
import { generateToken } from '../utils/generateToken.js';

const tokensFile = path.join(process.cwd(), 'data/tokens.json');

export default function handler(req,res){
  let tokens = JSON.parse(fs.readFileSync(tokensFile));

  // POST → créer un token invitation
  if(req.method === "POST"){
    const { role } = req.body;
    const token = generateToken();
    tokens.push({ token, role, used:false });
    fs.writeFileSync(tokensFile,JSON.stringify(tokens,null,2));
    return res.status(200).json({token});
  }

  // GET → liste tokens (admin)
  if(req.method==="GET"){
    return res.status(200).json(tokens);
  }

  return res.status(400).json({error:"Méthode non supportée"});
}
