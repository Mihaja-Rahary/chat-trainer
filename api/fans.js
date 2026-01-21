function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const FIRSTNAMES = [
  "alex","kevin","julien","nico","tom","max","leo","antoine",
  "sam","david","ryan","adam","yanis","enzo","lucas","mathis"
];

const WORDS = [
  "love","dark","boss","king","player","wild","solo","dream",
  "night","secret","heart","wolf","fire","shadow","mood"
];

const SEPARATORS = ["", "", "", "_", ".", ""];

function generatePseudo() {
  const type = Math.floor(Math.random() * 5);

  switch(type) {

    // alex92
    case 0:
      return randomFrom(FIRSTNAMES) + Math.floor(Math.random() * 99);

    // dark_wolf77
    case 1:
      return randomFrom(WORDS) + randomFrom(SEPARATORS) + randomFrom(WORDS) + Math.floor(Math.random() * 100);

    // julien.84
    case 2:
      return randomFrom(FIRSTNAMES) + randomFrom(SEPARATORS) + Math.floor(Math.random() * 999);

    // lonelywolf
    case 3:
      return randomFrom(WORDS) + randomFrom(WORDS);

    // max_1991
    case 4:
      return randomFrom(FIRSTNAMES) + "_" + (1980 + Math.floor(Math.random() * 25));
  }
}
