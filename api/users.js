import fs from 'fs';
import path from 'path';
const usersPath = path.join(process.cwd(),'data/users.json');

export default function handler(req,res){
  const users = JSON.parse(fs.readFileSync(usersPath,'utf8'));
  const role = req.query.role || null;
  if(role) res.status(200).json(users.filter(u=>u.role==="chatter" || role==="superadmin"));
  else res.status(200).json(users);
}
