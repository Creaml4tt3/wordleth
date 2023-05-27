const words = require("./thaidict.json");
const checkWords = [];

function arrangeWords() {
  const checkedWords = [];
  for (let i = 0; i < words.length; i++) {
    const replaceWords = words[i].replace(
      /[\u0E2F\u0E31\u0E34-\u0E39\u0E47\u0E48\u0E49\u0E4A\u0E4B\u0E4C]/g,
      ""
    );
    const count = replaceWords.length;
    if (count === 5) {
      checkedWords.push(words[i]);
    }
  }
  return checkedWords;
}

var json = arrangeWords();

var fs = require("fs");
fs.writeFile("thaiwords.json", JSON.stringify(arrangeWords()), function (err) {
  if (err) throw err;
  console.log("complete");
});

/*function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function checkWord(word) {
  if (word === checkWords.match(word)) {
    return true;
  }
}*/
