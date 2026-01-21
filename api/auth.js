let users = [];

export default function handler(req,res){
  const { username, password, role, type } = req.body;

  if(type==="signup"){
    if(users.find(u=>u.username===username)) return res.status(400).json({error:"Utilisateur existant"});
    users.push({ username, password, role });
    return res.status(200).json({msg:"Compte créé"});
  }

  if(type==="login"){
    const user = users.find(u=>u.username===username && u.password===password);
    if(!user) return res.status(400).json({error:"Identifiants incorrects"});
    return res.status(200).json({msg:"Login OK", role:user.role});
  }

  res.status(405).json({error:"Méthode non autorisée"});
}
