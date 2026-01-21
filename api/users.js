// Fichier: api/users.js
import fs from 'fs';
import path from 'path';

const usersFile = path.join(process.cwd(), 'data/users.json');

export default function handler(req,res){
  let users = JSON.parse(fs.readFileSync(usersFile));

  // GET → liste des utilisateurs
  if(req.method === "GET"){
    return res.status(200).json(users);
  }

  // POST → mettre à jour messages ou status
  if(req.method === "POST"){
    const { email, updates } = req.body;
    const user = users.find(u=>u.email===email);
    if(!user) return res.status(400).json({error:"Utilisateur non trouvé"});
    Object.assign(user,updates);
    fs.writeFileSync(usersFile,JSON.stringify(users,null,2));
    return res.status(200).json({success:true});
  }

  // DELETE → révoquer utilisateur
  if(req.method === "DELETE"){
    const { email } = req.body;
    users = users.filter(u=>u.email!==email);
    fs.writeFileSync(usersFile,JSON.stringify(users,null,2));
    return res.status(200).json({success:true});
  }

  return res.status(400).json({error:"Méthode non supportée"});
}
