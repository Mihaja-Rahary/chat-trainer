import fs from 'fs';
import path from 'path';
import { generateToken } from '../utils/generateToken.js';

const usersFile = path.join(process.cwd(), 'data/users.json');
const tokensFile = path.join(process.cwd(), 'data/tokens.json');

export default async function handler(req,res){
  const { type } = req.body;
  let users = JSON.parse(fs.readFileSync(usersFile));
  let tokens = JSON.parse(fs.readFileSync(tokensFile));

  // Signup via invitation
  if(type === "inviteSignup"){
    const { username,email,password,token } = req.body;
    const tokenObj = tokens.find(t=>t.token===token && !t.used);
    if(!tokenObj) return res.status(400).json({error:"Token invalide ou déjà utilisé"});
    if(users.find(u=>u.email===email)) return res.status(400).json({error:"Email déjà utilisé"});

    const newUser = { username,email,password,role:tokenObj.role,messages:0,status:"actif" };
    users.push(newUser);
    tokenObj.used = true;

    fs.writeFileSync(usersFile,JSON.stringify(users,null,2));
    fs.writeFileSync(tokensFile,JSON.stringify(tokens,null,2));

    return res.status(200).json({role:tokenObj.role});
  }

  // Login
  if(type==="login"){
    const { email,password } = req.body;
    const user = users.find(u=>u.email===email && u.password===password);
    if(!user) return res.status(400).json({error:"Email ou mot de passe invalide"});

    // Retourner rôle pour redirection
    return res.status(200).json({username:user.username,role:user.role,token:generateToken()});
  }

  return res.status(400).json({error:"Type invalide"});
}
