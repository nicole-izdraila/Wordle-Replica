let num = Number.parseInt(Math.random() * 20);
let answer = "";
const res = document.getElementById("winner");
const loser = document.getElementById("loser");

const losingMes = () => {
  const losingmes = `You did not guess: <strong>${answer}</strong>`;
  loser.innerHTML = losingmes;
  loser.classList.remove("hidden");
};

const hideLoser = () => {
  loser.classList.add("hidden");
};

const showResult = () => {
  const mes = `You gessed <strong>${answer}</strong> correctly`;
  res.innerHTML = mes;
  res.classList.remove("hidden");
};

const hideResult = () => {
  res.classList.add("hidden");
};

const start = document.getElementById("start-again");
async () => {
  const start = document.getElementById("start-again");
  start.innerHTML = "Loading...";
  start.disabled = true;
  object = await res.json();
  start.innerHTML = "Restart";
  start.disabled = false;
};

async function retrieveWord(num) {
  let object;
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
      "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
  });
  object = await res.json();
  console.log(object);
  const hintWord = [object.dictionary[num].word, object.dictionary[num].hint];
  answer = hintWord[0];
  document.getElementById("Hint").innerHTML = "Hint: " + hintWord[1] + ".";
  return answer;
}
const restartButton = document.getElementById("start-again");
async function getWord() {
  answer = await retrieveWord(num);
  return answer;
}

// Keyup event listener
let row = 0;
let col = 0;
const tds = document.getElementsByTagName("td");
const startAgainButton = document.getElementById("start-again");

async function getWord() {
  answer = await retrieveWord(num);
  return answer;
}
getWord().then((res) => {
  console.log(answer);
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();

  // Handle backspace key press
  if (event.key === "Backspace" && col > 0) {
    col -= 1;
    tds[row * 4 + col].innerText = "";
    return;
  }

  // Check if a letter key is pressed
  if (/^[A-Z]$/.test(key) && col < 4) {
    const index = row * 4 + col;
    if (index >= tds.length) {
      return;
    }
    tds[index].innerText = key;
    col += 1;
    console.log(key);
    tds[index].style.backgroundColor = "";

    return;
  }
  // Check if enter key is pressed
  if (event.key === "Enter") {
    if (col < 4) {
      alert("You must complete the row first!");
      return;
    }

    if (row === 3 && col === 4) {
      losingMes();
    }

    let allMatch = true;
    for (let i = 0; i < 4; i++) {
      if (tds[row * 4 + i].innerText !== answer[i].toUpperCase()) {
        allMatch = false;
        break;
      }
    }

    if (allMatch) {
      for (let i = 0; i < 4; i++) {
        tds[row * 4 + i].style.backgroundColor = "#538d4e";
      }

      // user wins here
      showResult();

      var temp = document.getElementById("grid");
      temp.classList.toggle("hidden");
      var temp2 = document.getElementById("imageContainer");
      temp2.classList.toggle("hidden");

      /*var temp3 = document.getElementById("winner");
      temp3.classList.toggle("hidden");*/

      // wait for 1 second (1000 milliseconds) before showing the alert
    }

    for (let i = 0; i < 4; i++) {
      if (tds[row * 4 + i].innerText === answer[i].toUpperCase()) {
        tds[row * 4 + i].style.backgroundColor = "#538d4e";
      } else if (answer.toUpperCase().includes(tds[row * 4 + i].innerText)) {
        tds[row * 4 + i].style.backgroundColor = "#b59f3b";
      } else {
        tds[row * 4 + i].style.backgroundColor = "#3a3a3c";
      }
    }

    row += 1;
    col = 0;
  }
});

startAgainButton.addEventListener("click", () => {
  var temp = document.getElementById("grid");
  temp.classList.remove("hidden");
  var temp2 = document.getElementById("imageContainer");
  temp2.classList.add("hidden");
  // Reset row and col to 0
  hideResult();
  hideLoser();

  row = 0;
  col = 0;

  // Clear all td elements
  for (let i = 0; i < tds.length; i++) {
    tds[i].innerText = "";
    tds[i].style.backgroundColor = "";
  }

  // Call retrieveWord() again to retrieve a new word
  num = Number.parseInt(Math.random() * 20);
  retrieveWord(num).then((newAnswer) => {
    answer = newAnswer;
    console.log(answer);
  });
});

const toggle = document.getElementById("toggleDark");
const menu = document.querySelector(".menu");
const body = document.querySelector("body");
const footer = document.getElementById("footer");
const title = document.querySelector("h1");

toggle.addEventListener("click", function () {
  menu.classList.toggle("light-dark");
  footer.classList.toggle("footer-dark");
  if (menu.classList.contains("light-dark")) {
    body.style.background = "black";
    body.style.color = "white";
    body.style.transition = "2s";
  } else {
    body.style.background = "white";
    body.style.color = "black";
    body.style.transition = "2s";
  }
});

const questionMark = document.querySelector(".question-mark");
const hint = document.getElementById("hint-container");

questionMark.addEventListener("click", function () {
  console.log("clicked");
  hint.classList.toggle("hidden");
});

const infoBtn = document.getElementById("information");
infoBtn.addEventListener("click", function () {
  instructions.classList.toggle("hidden");
});

function infoToggle() {
  const instructions = document.getElementById("information");
  instructions.classList.toggle("hidden");
}

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
  button.addEventListener("keydown", (event) => {
    event.preventDefault();
  });
}
