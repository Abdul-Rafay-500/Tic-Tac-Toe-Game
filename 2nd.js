let boxes = document.querySelectorAll(".btn");
let resetBtn = document.querySelector(".reset");
let msg = document.querySelector("#msg");
let turnO = true;

let count = 0;
let p1Score = 0;
let p2Score = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const p1ScorePara = document.querySelector("#p1-score");
const p2ScorePara = document.querySelector("#p2-score");

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBox();
  msg.innerText = "Player O Starts";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      msg.innerText = "Player X's Turn";
      turnO = false;
    } else {
      box.innerText = "X";
      msg.innerText = "Player O's Turn";
      turnO = true;
    }
    count++;
    box.disabled = true;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      drawGame();
    }
  });
});

const drawGame = () => {
  msg.innerText = "Game Was Draw !";
};

const disBox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Player ${winner} Win's.`;
  disBox();
  if (winner === "O") {
    p1Score++;
    p1ScorePara.innerText = p1Score;
  } else {
    p2Score++;
    p2ScorePara.innerText = p2Score;
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

resetBtn.addEventListener("click", resetGame);
