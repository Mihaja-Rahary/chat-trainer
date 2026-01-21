import fs from 'fs';
import path from 'path';
const usersPath = path.join(process.cwd(),'data/users.json');

// Créer fichier vide si inexistant
if (!fs.existsSync(usersPath)) fs.writeFileSync(usersPath,'[]','utf8');

export default function handler(req,res){
  const users = JSON.parse(fs.readFileSync(usersPath,'utf8'));
  res.status(200).json(users);
}
