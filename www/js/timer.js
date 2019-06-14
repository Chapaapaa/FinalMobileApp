// pojedyncze przyciski
const plusWorkTime = document.getElementById("plusWorkTime");
const minusWorkTime = document.getElementById("minusWorkTime");
const plusBreakTime = document.getElementById("plusBreakTime");
const minusBreakTime = document.getElementById("minusBreakTime");


// Timer display - PRACA / PRZERWA
const workLengthDisplay = document.getElementById("work-length");
const breakLengthDisplay = document.getElementById("break-length");


// Countdown CZAS 
const countdownDisplay = document.getElementById("countdown");

// HEADER NAPIS - CZY PRACA CZY PTRZERWA 
const timeTypeDisplay = document.getElementById("time-type");

const resetCountdownBtn = document.getElementById("reset-session");
const pauseStartCountdownBtn = document.getElementById("pause-session");
const startCountdownBtn = document.getElementById("start-session");
// CALY DIV
const countdownContainer = document.getElementById("countdown-container");

// zmienne

let sessionLength = 20;
let breakLength = 5;

let timeinterval = false;
let workSession = true;
let pausedTime = 0;
let timePaused = false;
let timeStopped = false;

function resetVariables() {
  timeinterval = false;
  workSession = true;
  pausedTime = 0;
  timeStopped = false;
  timePaused = false;
}

workLengthDisplay.innerHTML = 20;
breakLengthDisplay.innerHTML = 5;
countdownDisplay.innerHTML = "20:00";

function updateDisplay() {
  workLengthDisplay.innerHTML = sessionLength;
  breakLengthDisplay.innerHTML = breakLength;
  countdownDisplay.innerHTML = sessionLength + ":00";
  resetVariables();
}

// functions for buttons +/-
function incrSession() {
  if (sessionLength < 60) {
    sessionLength++;
    updateDisplay()
  }
}

function decrSession() {
  if (sessionLength > 1) {
    sessionLength--;
    updateDisplay()
  }
}

function incrBreak() {
  if (breakLength < 20) {
    breakLength++;
    updateDisplay()
  }
}

function decrBreak() {
  if (breakLength > 1) {
    breakLength--;
    updateDisplay()
  }
}

plusWorkTime.addEventListener('click', incrSession);
minusWorkTime.addEventListener('click', decrSession);
plusBreakTime.addEventListener('click', incrBreak);
minusBreakTime.addEventListener('click', decrBreak);

function displayType() {
  if (workSession === true) {
    timeTypeDisplay.innerHTML = "work session";
  } else {
    timeTypeDisplay.innerHTML = "break";
  }
}

function startCountdown() {
  displayType();
  startTime = new Date().getTime();
  if (timePaused === false) {
    if (workSession === true) {
      endTime = startTime + (sessionLength * 60000);
    } else {
      endTime = startTime + (breakLength * 60000);
    }
  } else {
    endTime = startTime + pausedTime;
    timePaused = true;
  }
  timeinterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  let currTime = new Date().getTime();
  let difference = endTime - currTime;
  let seconds = Math.floor((difference / 1000) % 60);
  let minutes = Math.floor((difference / 1000) / 60 % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (difference > 1000) {
    countdownDisplay.innerHTML = `${minutes}:${seconds}`;
  } else {
    changeSessions();
  }
}

function changeSessions() {
  clearInterval(timeinterval);
  if (workSession === true) {
    workSession = false;
  } else {
    workSession = true;
  }
  timeinterval = false;
  startCountdown();
}

function resetCountdown() {
  sessionLength = 20;
  breakLength = 5;
  pauseStartCountdownBtn.textContent = "Pause";
  clearInterval(timeinterval);
  updateDisplay();
}

function pauseCountdown() {
  let currTime = new Date().getTime();
  pausedTime = endTime - currTime;
  timePaused = true;
  clearInterval(timeinterval);
  timeinterval = false;
  pauseStartCountdownBtn.textContent = "Continue";
}

function pauseStartCountdown() {
  if (!timePaused) {
    pauseCountdown();
  } else {
    pauseStartCountdownBtn.textContent = "Pause";
    startCountdown();
    timePaused = !timePaused;
  }
}


startCountdownBtn.addEventListener('click', startCountdown);
countdownDisplay.addEventListener('click', startCountdown);
resetCountdownBtn.addEventListener('click', resetCountdown);
pauseStartCountdownBtn.addEventListener('click', pauseStartCountdown)