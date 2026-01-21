import fs from 'fs';
import path from 'path';
const chatPath = path.join(process.cwd(),'data/chatlogs.json');

// Créer fichier vide si inexistant
if (!fs.existsSync(chatPath)) fs.writeFileSync(chatPath,'[]','utf8');

export default function handler(req,res){
  const logs = JSON.parse(fs.readFileSync(chatPath,'utf8'));
  res.status(200).json(logs);
}
