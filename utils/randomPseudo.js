// Fichier: utils/randomPseudo.js
const pseudoPool = ["Alex","Sam","Max","Léo","Tom","Lucas","Nico","Jules","Chris","Mika"];
export function getRandomPseudo(){
  return pseudoPool[Math.floor(Math.random()*pseudoPool.length)];
}
