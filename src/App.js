import React from "react";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./App.css";

import Header from "./Header";
import Box from "./Box";
import Input from "./Input";
import Keyboard from "./Keyboard";

function App() {
  const words = require("./thaiwords.json");
  const wordAnswer = require("./answer.json");
  const allWords = words;
  const specialAlphabets = [
    "\u0E31",
    "\u0E31",
    "\u0E34",
    "\u0E35",
    "\u0E36",
    "\u0E37",
    "\u0E38",
    "\u0E39",
    "\u0E47",
    "\u0E48",
    "\u0E49",
    "\u0E4A",
    "\u0E4B",
    "\u0E4C",
  ];

  if (JSON.parse(localStorage.getItem("timesGame"))) {
    var timesGame = JSON.parse(localStorage.getItem("timesGame"));
  } else {
    timesGame = [
      {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
      },
    ];
  }

  if (JSON.parse(localStorage.getItem("totalGames"))) {
    var totalGames = JSON.parse(localStorage.getItem("totalGames"));
  } else {
    totalGames = 0;
  }

  if (JSON.parse(localStorage.getItem("winGames"))) {
    var winGames = JSON.parse(localStorage.getItem("winGames"));
  } else {
    winGames = 0;
  }

  if (JSON.parse(localStorage.getItem("rateGames"))) {
    var rateGames = JSON.parse(localStorage.getItem("rateGames"));
  } else {
    rateGames = 0;
  }

  if (JSON.parse(localStorage.getItem("streakGames"))) {
    var streakGames = JSON.parse(localStorage.getItem("streakGames"));
  } else {
    streakGames = 0;
  }

  /*function arrangeWords() {
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
  }*/

  function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function checkWord(word) {
    const wordToStr = word.toString();
    const matchWord = allWords.includes(wordToStr);
    return matchWord;
  }

  let stage = [];
  const [word, setWord] = useState("");
  const [alphabet, setAlphabet] = useState([]);
  const [storeGuessed, setStoreGuessed] = useState([]);
  const [boxStage, setBoxStage] = useState(0);
  const [box, setBox] = useState(0);
  const [win, setWin] = useState(false);
  const [wordArr, setWordArr] = useState([]);
  const [alphabetGuide, setAlphabetGuide] = useState([]);

  function getKeyboardValue(e) {
    const value = e.target.value;
    const selectedBox = document.getElementsByClassName("Boxes");
    if (box < 5) {
      if (specialAlphabets.includes(value)) {
        var lastAlphabet = alphabet.slice(-1);
        lastAlphabet = lastAlphabet + value;
        alphabet.pop();
        alphabet.push(lastAlphabet);
        selectedBox[box + boxStage - 1].innerText += value;
      } else {
        selectedBox[box + boxStage].innerText = value;
        setAlphabet([...alphabet, value]);
        setBox(box + 1);
      }
    } else if (box === 5) {
      if (specialAlphabets.includes(value)) {
        var lastAlphabet = alphabet.slice(-1);
        lastAlphabet = lastAlphabet + value;
        alphabet.pop();
        alphabet.push(lastAlphabet);
        selectedBox[box + boxStage - 1].innerText += value;
      } else {
        setAlert2Open(true);
        setTimeout(() => {
          return setAlert2Open(false);
        }, 2000);
      }
    }
  }

  function updateGuessedWord() {
    const wordToArr = word.split("");
    for (let i = 0; i < word.length; i++) {
      if (specialAlphabets.includes(word[i])) {
        const lastWordToArr = wordArr.slice(-1);
        wordArr.pop();
        wordArr.push(lastWordToArr + word[i]);
      } else {
        wordArr.push(wordToArr[i]);
      }
    }

    var currentWord = alphabet.join("");
    if (checkWord(currentWord)) {
      const wordSplit = word.split("");
      const selectedBox = document.getElementsByClassName("Boxes");
      /*const GuessedToKeyboard = alphabet.join(""); //str alphabet
      const GuessedToKeyboardArr = GuessedToKeyboard.split(""); //แยกส่วนทุกตัวเป็น arr
      const wordToArrSplit = word.split("");
      for (let i = 0; i < GuessedToKeyboardArr.length; i++) {
        setTimeout(() => {
          if (GuessedToKeyboardArr[i] === wordToArrSplit[i]) { //ถ้าทุกตัวแยกเป็น arr เทียบกับ word ที่เป็น arr แยก
            let button = changeButtons(GuessedToKeyboardArr[i]);
            button.classList.remove("In", "Activated");
            button.classList.add("Match", "Activated");
          } else if (word.includes(GuessedToKeyboard[i])) {
            let button = changeButtons(GuessedToKeyboardArr[i]);
            if (!button.classList.contains("Activated")) {
              button.classList.add("In", "Activated");
            }
          } else {
            let button = changeButtons(GuessedToKeyboardArr[i]);
            button.classList.add("NotIn", "Activated");
          }
        }, i * 150);
      } */
      for (let i = 0; i < alphabet.length; i++) {
        setTimeout(() => {
          let GuessedAlphabet = alphabet[i];
          let keyboardChange = GuessedAlphabet.split("");
          let wordArrSplit = wordArr[i].split("");
          let thisBox = selectedBox[i + boxStage];
          thisBox.classList.add("Activated");
          let GuessedAlphabetNo = GuessedAlphabet.replace(
            /[\u0E2F\u0E31\u0E34-\u0E39\u0E47\u0E48\u0E49\u0E4A\u0E4B\u0E4C]/g,
            ""
          );

          let filterAlphabet = wordSplit.filter(function (filter) {
            return filter.match(GuessedAlphabetNo);
          });

          let filterSquare = document.createElement("span");
          filterSquare.innerText = filterAlphabet.length;

          if (
            GuessedAlphabet === wordArr[i] || //ตรงตัว
            wordArr[i].includes(GuessedAlphabet) || //ตัวที่เดามีอยู่ใน wordArr
            wordArr[i].includes(keyboardChange) || //ตัวที่เดาแบบแยกตัวอยู่ใน wordArr
            keyboardChange.includes(wordArr[i]) || //wordArr อยู่ในตัวแบบแยก
            wordArr[i].includes(GuessedAlphabetNo)
          ) {
            let CorrectAlphabet = wordArr[i];
            selectedBox[i + boxStage].innerText = CorrectAlphabet;
            /*for (let i = 0; i < keyboardChange.length; i++) {
              let button = changeButtons(keyboardChange[i]);
              button.classList.remove("InKey", "Activated");
              button.classList.add("MatchKey", "Activated");
            }*/
            for (let i = 0; i < wordArrSplit.length; i++) {
              let button = changeButtons(wordArrSplit[i]);
              button.classList.remove("InKey", "Activated");
              button.classList.add("MatchKey", "Activated");
            }
            if (
              filterAlphabet.length > 1 &&
              filterAlphabet.includes(GuessedAlphabetNo)
            ) {
              thisBox.appendChild(filterSquare);
            }
            return selectedBox[i + boxStage].classList.add("Match");
            /*} else if (wordArr[i].includes(GuessedAlphabet)) {
            GuessedAlphabet = wordArr[i];
            selectedBox[i + boxStage].innerText = GuessedAlphabet;
            for (let i = 0; i < keyboardChange.length; i++) {
              let button = changeButtons(keyboardChange[i]);
              button.classList.remove("In");
              button.classList.add("Match", "Activated");
            }
          return selectedBox[i + boxStage].classList.add("Match");*/
          } else if (word.includes(GuessedAlphabetNo)) {
            //เช็๋คว่าคำที่เขียนแบบไม่มีสระ ตัวไหนอยู๋ใน word ที่เป็น string บ้าง
            let replaceWord = word.replace(
              /[\u0E2F\u0E31\u0E34-\u0E39\u0E47\u0E48\u0E49\u0E4A\u0E4B\u0E4C]/g,
              ""
            );
            let list = replaceWord.indexOf(GuessedAlphabetNo);
            selectedBox[i + boxStage].innerText = wordArr[list];
            let wordArrSplit = wordArr[list].split("");
            /*for (let i = 0; i < keyboardChange.length; i++) {
              let button = changeButtons(keyboardChange[i]);
              if (word.includes(keyboardChange[i])) {
                if (!button.classList.contains("Activated", "Match")) {
                  button.classList.add("InKey", "Activated");
                }
              } else {
                button.classList.add("NotInKey", "Activated");
              }
            }*/
            for (let i = 0; i < wordArrSplit.length; i++) {
              let button = changeButtons(wordArrSplit[i]);
              if (button.classList.contains("Activated", "Match") === false) {
                button.classList.add("InKey", "Activated");
              }
            }
            if (
              filterAlphabet.length > 1 &&
              filterAlphabet.includes(GuessedAlphabetNo)
            ) {
              thisBox.appendChild(filterSquare);
            }
            return selectedBox[i + boxStage].classList.add("In");
          } else {
            selectedBox[i + boxStage].innerText = GuessedAlphabet;
            for (let i = 0; i < keyboardChange.length; i++) {
              alphabetGuide.push(keyboardChange[i]);
              let button = changeButtons(keyboardChange[i]);
              button.classList.add("NotInKey", "Activated");
            }
            if (
              filterAlphabet.length > 1 &&
              filterAlphabet.includes(GuessedAlphabetNo)
            ) {
              thisBox.appendChild(filterSquare);
            }
            return selectedBox[i + boxStage].classList.add("NotIn");
          }
        }, i * 100);
      }
      setBoxStage(boxStage + 5);
      storeGuessed.push(alphabet);
      localStorage.setItem("guessed", JSON.stringify(storeGuessed));
      if (currentWord === word) {
        localStorage.setItem("winGames", JSON.stringify((winGames += 1)));
        localStorage.setItem("streakGames", JSON.stringify((streakGames += 1)));
        localStorage.setItem("win", JSON.stringify(true));
        setTimesGame();
        setWin(true);
        setTimeout(() => {
          setWinOpen(true);
        }, 1000);
      }
      setWordArr([]);
      setAlphabet([]);
    } else {
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
    }
  }

  function restoreWord(guessed, x) {
    const storeWordArr = [];
    const storeWord = JSON.parse(localStorage.getItem("word"));
    const wordToArr = storeWord.split("");
    for (let i = 0; i < JSON.parse(localStorage.getItem("word")).length; i++) {
      if (specialAlphabets.includes(storeWord[i])) {
        const lastWordToArr = storeWordArr.slice(-1);
        storeWordArr.pop();
        storeWordArr.push(lastWordToArr + storeWord[i]);
      } else {
        storeWordArr.push(wordToArr[i]);
      }
    }
    var stage = x * 5;
    var currentWord = guessed.join("");
    if (checkWord(currentWord)) {
      const selectedBox = document.getElementsByClassName("Boxes");
      for (let i = 0; i < guessed.length; i++) {
        setTimeout(() => {
          let guessedAlp = guessed;
          let GuessedAlphabet = guessedAlp[i];
          let keyboardChange = GuessedAlphabet.split("");
          let wordArrSplit = storeWordArr[i].split("");
          let thisBox = selectedBox[i + stage];
          thisBox.classList.add("Activated");
          let GuessedAlphabetNo = GuessedAlphabet.replace(
            /[\u0E2F\u0E31\u0E34-\u0E39\u0E47\u0E48\u0E49\u0E4A\u0E4B\u0E4C]/g,
            ""
          );

          var filterAlphabet = storeWordArr.filter((filter) =>
            filter.includes(GuessedAlphabetNo)
          );
          var filterSquare = document.createElement("span");
          filterSquare.innerText = filterAlphabet.length;

          if (
            GuessedAlphabet === storeWordArr[i] ||
            storeWordArr[i].includes(GuessedAlphabet) ||
            storeWordArr[i].includes(keyboardChange) ||
            keyboardChange.includes(storeWordArr[i]) ||
            storeWordArr[i].includes(GuessedAlphabetNo)
          ) {
            let CorrectAlphabet = storeWordArr[i];
            selectedBox[i + stage].innerText = CorrectAlphabet;
            /*for (let i = 0; i < keyboardChange.length; i++) {
              let button = changeButtons(keyboardChange[i]);
              button.classList.remove("InKey", "Activated");
              button.classList.add("MatchKey", "Activated");
            }*/
            for (let i = 0; i < wordArrSplit.length; i++) {
              let button = changeButtons(wordArrSplit[i]);
              button.classList.remove("InKey", "Activated");
              button.classList.add("MatchKey", "Activated");
            }
            if (filterAlphabet.length > 1) {
              thisBox.appendChild(filterSquare);
            }
            return selectedBox[i + stage].classList.add("Match");
          } else if (storeWord.includes(GuessedAlphabetNo)) {
            //เช็๋คว่าคำที่เขียนแบบไม่มีสระ ตัวไหนอยู๋ใน word ที่เป็น string บ้าง
            let replaceWord = storeWord.replace(
              /[\u0E2F\u0E31\u0E34-\u0E39\u0E47\u0E48\u0E49\u0E4A\u0E4B\u0E4C]/g,
              ""
            );
            let list = replaceWord.indexOf(GuessedAlphabetNo);
            selectedBox[i + stage].innerText = storeWordArr[list];
            let wordArrSplit = storeWordArr[list].split("");
            /*for (let i = 0; i < keyboardChange.length; i++) {
              let button = changeButtons(keyboardChange[i]);
              if (storeWord.includes(keyboardChange[i])) {
                if (!button.classList.contains("Activated", "Match")) {
                  button.classList.add("InKey", "Activated");
                }
              } else {
                button.classList.add("NotInKey", "Activated");
              }
            }*/
            for (let i = 0; i < wordArrSplit.length; i++) {
              let button = changeButtons(wordArrSplit[i]);
              if (button.classList.contains("Activated", "Match") === false) {
                button.classList.add("InKey", "Activated");
              }
            }
            if (filterAlphabet.length > 1) {
              thisBox.appendChild(filterSquare);
            }
            return selectedBox[i + stage].classList.add("In");
          } else {
            selectedBox[i + stage].innerText = GuessedAlphabet;
            for (let i = 0; i < keyboardChange.length; i++) {
              alphabetGuide.push(keyboardChange[i]);
              let button = changeButtons(keyboardChange[i]);
              button.classList.add("NotInKey", "Activated");
            }
            if (filterAlphabet.length > 1) {
              thisBox.appendChild(filterSquare);
            }
            return selectedBox[i + stage].classList.add("NotIn");
          }
        }, i * 50);
      }
      storeGuessed.push(guessed);
    } else {
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
    }
  }

  function deleteAlphabet() {
    if (alphabet.length !== 0) {
      if (box !== 0) {
        var lastGroupAlphabet = alphabet.slice(-1); //เก็บค่าตัว arr สุดท้าย
        var deleted = lastGroupAlphabet.toString(); //แปลง arr เป็น str
        deleted = deleted.slice(0, -1); //เอา string ตัวแรกแล้วก็ตัวก่อนสุดท้าย
        alphabet.pop(); //ทำลายค่า arr alphabet ตัวสุดท้าย
        const selectedBox = document.getElementsByClassName("Boxes");
        selectedBox[box + boxStage - 1].innerText = deleted; //
        if (selectedBox[box + boxStage - 1].innerText === "") {
          selectedBox[box + boxStage - 1].classList.remove(
            "Selected",
            "SelectedNotIn"
          );
        }
        if (deleted !== "") {
          alphabet.push(deleted);
        } else {
          setBox(box - 1);
        }
      }
    }
  }

  function setStats() {
    localStorage.setItem("totalGames", JSON.stringify((totalGames += 1)));
    totalGames = JSON.parse(localStorage.getItem("totalGames"));
    winGames = JSON.parse(localStorage.getItem("winGames"));
    rateGames = ((winGames / totalGames) * 100).toFixed(0);
    localStorage.setItem("rateGames", JSON.stringify(rateGames));
  }

  function restartGame() {
    const Boxes = document.getElementsByClassName("Boxes");
    for (let i = 0; i < Boxes.length; i++) {
      Boxes[i].innerText = "";
      Boxes[i].classList.remove(
        "Activated",
        "Match",
        "In",
        "NotIn",
        "Selected",
        "SelectedNotIn"
      );
    }
    const Buttons = document.getElementsByClassName("Button");
    for (let i = 0; i < Buttons.length; i++) {
      Buttons[i].classList.remove("Activated", "MatchKey", "InKey", "NotInKey");
    }
    setWin(false);
    setBoxStage(0);
    setWordArr([]);
    setStoreGuessed([]);
    setAlphabetGuide([]);
    localStorage.removeItem("word");
    localStorage.removeItem("guessed");
    localStorage.removeItem("win");
    localStorage.removeItem("lose");
    setWord(random_item(wordAnswer));
    setAnswerOpen(false);
    setWinOpen(false);
    setStats();
  }

  function setTimesGame() {
    var times = (boxStage + 5) / 5;
    if (times === 6) {
      timesGame[0].six += 1;
    } else if (times === 5) {
      timesGame[0].five += 1;
    } else if (times === 4) {
      timesGame[0].four += 1;
    } else if (times === 3) {
      timesGame[0].three += 1;
    } else if (times === 2) {
      timesGame[0].two += 1;
    } else if (times === 1) {
      timesGame[0].one += 1;
    }
    localStorage.setItem("timesGame", JSON.stringify(timesGame));
  }

  const [keyboardStage, setKeyboardStage] = useState(true);

  function shiftButton() {
    const keyboard = document.getElementById("KeyboardContainer");
    const keyboardShift = document.getElementById("KeyboardContainerShift");
    if (!keyboardStage) {
      setTimeout(() => {
        keyboard.style.display = "block";
        keyboardShift.style.display = "none";
        setKeyboardStage(true);
      }, 200);
    } else {
      setTimeout(() => {
        keyboard.style.display = "none";
        keyboardShift.style.display = "block";
        setKeyboardStage(false);
      }, 200);
    }
  }

  function updateButton() {
    const buttons = document.getElementsByClassName("Button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].innerText = buttons[i].value;
    }
  }

  function changeButtons(button) {
    const buttons = document.getElementsByClassName("Button");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].value === button) {
        return buttons[i];
      }
    }
  }
  const [input, setInput] = useState(false);

  function getInput(InputToAlphabet) {
    setAlphabet(InputToAlphabet);
    setInput(true);
  }

  useEffect(() => {
    if (input) {
      updateGuessedWord();
      setInput(false);
    }
  }, [input]);

  useEffect(() => {
    setBox(0);
    if (boxStage === 30 && !win) {
      setAnswerOpen(true);
      localStorage.setItem("lose", JSON.stringify(true));
      localStorage.setItem("streakGames", JSON.stringify(0));
    }
  }, [boxStage]);

  useEffect(() => {
    const selectedBoxes = document.getElementsByClassName("Boxes");
    for (let i = 0; i < selectedBoxes.length; i++) {
      if (selectedBoxes[i].classList.contains("Activated")) {
        selectedBoxes[i].classList.remove("Selected");
      } else if (!selectedBoxes[i].classList.contains("Activated")) {
        if (alphabetGuide.includes(selectedBoxes[i].innerText)) {
          selectedBoxes[i].classList.add("SelectedNotIn");
        } else if (selectedBoxes[i].innerText !== "") {
          selectedBoxes[i].classList.add("Selected");
        }
      }
    }
  }, [box]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("word"))) {
      setWord(JSON.parse(localStorage.getItem("word")));
    } else {
      localStorage.setItem("word", JSON.stringify(word));
    }
  }, [word]);

  useEffect(() => {
    setWord(random_item(wordAnswer));
    updateButton();

    if (window.innerWidth > 768) {
      document.addEventListener("keydown", detectKeyDown);
    }

    if (JSON.parse(localStorage.getItem("guessed"))) {
      let guessed = JSON.parse(localStorage.getItem("guessed"));
      for (let i = 0; i < guessed.length; i++) {
        restoreWord(guessed[i], i);
      }
      setBoxStage(guessed.length * 5);
    }

    if (!JSON.parse(localStorage.getItem("info"))) {
      localStorage.setItem("info", JSON.stringify(true));
    } else {
      localStorage.setItem("info", JSON.stringify(false));
    }

    //setWord("บริหาร");
    if (JSON.parse(localStorage.getItem("win")) === true) {
      setWin(true);
      return setWinOpen(true);
    } else if (JSON.parse(localStorage.getItem("lose") === true)) {
      setWin(false);
      return setAnswerOpen(true);
    }
  }, []);

  const detectKeyDown = (e) => {
    const keyboardEl = document.getElementsByClassName("Button");
    if (e.key === "Backspace") {
      const Del = document.getElementById("Del");
      Del.style.filter = "brightness(80%)";
      setTimeout(() => {
        Del.style.filter = "none";
      }, 100);
      return Del.click();
    } else if (e.key === "Enter") {
      const Enter = document.getElementById("Enter");
      Enter.style.filter = "brightness(80%)";
      setTimeout(() => {
        Enter.style.filter = "none";
      }, 100);
      return Enter.click();
    } else if (e.key === "Shift") {
      const Shift = document.getElementById("Shift");
      Shift.style.filter = "brightness(80%)";
      setTimeout(() => {
        Shift.style.filter = "none";
      }, 100);
      return Shift.click();
    }
    for (let i = 0; i < keyboardEl.length; i++) {
      if (e.key === keyboardEl[i].value) {
        keyboardEl[i].style.filter = "sepia(100%)";
        setTimeout(() => {
          keyboardEl[i].style.filter = "none";
        }, 100);
        keyboardEl[i].click();
      }
    }
  };

  const [answerOpen, setAnswerOpen] = useState(false);
  const [winOpen, setWinOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert2Open, setAlert2Open] = useState(false);
  const Close = () => {
    setAnswerOpen(false);
    setWinOpen(false);
    setAlertOpen(false);
    setAlert2Open(false);
  };

  return (
    <div className="App">
      <Header restartGame={restartGame} />
      <Box />
      <Input getInput={getInput} specialAlphabets={specialAlphabets} />
      <Keyboard
        getKeyboardValue={getKeyboardValue}
        updateGuessedWord={updateGuessedWord}
        deleteAlphabet={deleteAlphabet}
        shiftButton={shiftButton}
      />
      <Popup
        className="Answer"
        modal
        open={answerOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        <div className="AnswerContainer">
          <div className="AnswerHeader">อุ้ยยย ทำไมทำไม่ได้ล่ะ</div>
          <div className="AnswerHeader">
            คำตอบคือ : <span className="InInfo">{word}</span>
          </div>
          <button className="Restart" onClick={restartGame}>
            กดเพื่อเริ่มใหม่
          </button>
        </div>
      </Popup>
      <Popup
        className="Win"
        modal
        open={winOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        <div className="WinContainer">
          <div className="WinHeader">ขอแสดงความยินดี คุณตอบถูก</div>
          <button className="Restart" onClick={restartGame}>
            กดเพื่อเริ่มใหม่
          </button>
        </div>
      </Popup>
      <Popup
        className="Alert"
        modal
        open={alertOpen}
        closeOnDocumentClick
        onClose={Close}
      >
        <div id="Alert">ไม่มีคำศัทพ์นี้ในคลังคำศัพท์</div>
      </Popup>
      <Popup
        className="Alert"
        modal
        open={alert2Open}
        closeOnDocumentClick
        onClose={Close}
      >
        <div id="Alert">จำนวนพยัญชนะเกิน</div>
      </Popup>
    </div>
  );
}

//<Input checkWord={checkWord} />

export default App;
