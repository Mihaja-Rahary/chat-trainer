import fs from 'fs';
import path from 'path';

const chatlogsFile = path.join(process.cwd(), 'data/chatlogs.json');

export default function handler(req,res){
  let chatlogs = JSON.parse(fs.readFileSync(chatlogsFile));

  if(req.method==="POST"){ 
    const {username, fanPseudo, content, responseTime, wpm, relevance} = req.body;
    let userLog = chatlogs.find(u=>u.username===username);
    if(!userLog){
      userLog = {username, messages:[]};
      chatlogs.push(userLog);
    }
    userLog.messages.push({fanPseudo, content, timestamp:new Date().toISOString(), responseTime, wpm, relevance});
    fs.writeFileSync(chatlogsFile, JSON.stringify(chatlogs,null,2));
    return res.status(200).json({ok:true});
  }

  if(req.method==="GET"){
    const {username, role} = req.query;
    if(role==="superadmin") return res.status(200).json(chatlogs);
    if(role==="admin") return res.status(200).json(chatlogs.filter(c=>c.username.startsWith(username)));
    return res.status(200).json(chatlogs.filter(c=>c.username===username));
  }

  return res.status(400).json({error:"Methode invalide"});
}
