import fs from 'fs';
import path from 'path';
const tokensPath = path.join(process.cwd(), 'data/tokens.json');

// Créer fichier vide si inexistant
if (!fs.existsSync(tokensPath)) fs.writeFileSync(tokensPath, '[]', 'utf8');

export default function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { role, requesterRole, createdBy } = req.body;
  if(!role || !requesterRole || !createdBy) return res.status(400).json({error:'Paramètre manquant'});

  const token = Math.random().toString(36).substring(2,12);

  const tokensData = JSON.parse(fs.readFileSync(tokensPath,'utf8'));
  tokensData.push({ token, role, requesterRole, createdBy, used:false, createdAt: new Date().toISOString() });
  fs.writeFileSync(tokensPath, JSON.stringify(tokensData,null,2));

  res.status(200).json({token});
}
