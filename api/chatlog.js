import fs from 'fs';
import path from 'path';
const chatPath = path.join(process.cwd(),'data/chatlogs.json');

export default function handler(req,res){
  const logs = JSON.parse(fs.readFileSync(chatPath,'utf8'));
  res.status(200).json(logs);
}
