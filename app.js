let attemps = 0;
let index = 0;
let timer;

const answer = "APPLEE";
function appStart() {
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.block[data-index='${attemps}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };
  const displayGameover = () => {
    div.innerText = "게임종료";
    let div = document.createElement("div");
    document.body.appendChild(div);
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const enterKeydown = () => {
    let correctKey = 0;
    let wrongKey = 0;
    for (i = 0; i < 6; i++) {
      const block = document.querySelector(
        `.block[data-index='${attemps}${i}']`
      );
      const inputKey = block.innerText;
      const answerKey = answer[i];
      if (inputKey === answerKey) {
        correctKey++;
        block.style.background = "green";
      } else if (answer.includes(inputKey) === true) {
        block.style.background = "yellow";
      } else if (answerKey !== inputKey) {
        wrongKey++;
        if (wrongKey === 6) {
          return;
        }
      } else {
        block.style.background = "grey";
      }
    }
    const nextLine = () => {
      index = 0;
      attemps++;
    };
    if (correctKey === 6) gameover();
    nextLine();
  };
  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.block[data-index='${attemps}${index}']`
    );

    if (e.key === "Backspace") handleBackspace();
    if (index === 6) enterKeydown();
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  const starTimer = () => {
    const setDate = new Date();
    function setTime() {
      const presentDate = new Date();
      const flowDate = new Date(presentDate - setDate);
      const minutes = flowDate.getMinutes().toString().padStart(2, "0");
      const seconds = flowDate.getSeconds().toString().padStart(2, "0");
      const timeTag = document.querySelector(".time");
      timeTag.innerText = `${minutes}:${seconds}`;
    }
    timer = setInterval(setTime, 1000);
  };
  starTimer();
  window.addEventListener("keydown", handleKeydown);
}
appStart();
