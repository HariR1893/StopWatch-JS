let tensEl = document.getElementById('tens');
let secondsEl = document.getElementById('seconds');
let minEl = document.getElementById('min');
let buttonDiv = document.getElementById('btn-div');
let lapList = document.getElementById('lap-list');
let lapButton = document.getElementById('lap');
let clearLapsButton = document.getElementById('clear-laps');

// Selecting Buttons
let startBtn = document.getElementById('start');
let resetBtn = document.getElementById('reset');

// Creating variables
let minute = 0;
let seconds = 0;
let tens = 0;
let interval;
let timer = false;

// Variable to track lap count
let lastRunningLap  = 1;

// Variable to store lap time data
let lapData = [];

function createStopBtn() {
    startBtn.textContent = "STOP";
    startBtn.onclick = stopTimer;
}

function createStartBtn() {
    startBtn.textContent = "START";
    startBtn.onclick = startStopTimer;
}

function startStopTimer() {
    if (timer) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    timer = true;
    lapButton.textContent = "LAP";
    createStopBtn();
    stopWatch();
}

function stopTimer() {
    timer = false;
    lapButton.textContent = "LAP";
    createStartBtn();
    clearInterval(interval);
}

function resetTimer() {
    timer = false;
    tens = 0;
    minute = 0;
    seconds = 0;
    tensEl.textContent = "0" + tens;
    minEl.textContent = "0" + minute;
    secondsEl.textContent = "0" + seconds;
    clearInterval(interval);
    lapList.innerHTML = "";
    lapCounter = 1;
    lapData = [];
}

function addLap() {
    if (timer) {
        const lapTime = `${minute}:${seconds}.${tens}`;
        lapData.push({ lap: lastRunningLap, time: lapTime });
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lastRunningLap}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lastRunningLap++;
    }
}

function clearLaps() {
    lapList.innerHTML = "";
    lapData = [];
    lapCounter = 1;
}


clearLapsButton.addEventListener("click", clearLaps);
resetBtn.addEventListener("click", resetTimer);
createStartBtn(); // Initialize the button as "START"

function stopWatch() {
    if (timer === true) {
        tens++;
        if (tens <= 9) {
            tensEl.textContent = "0" + tens;
        }
        if (tens >= 10) {
            tensEl.textContent = tens;
        }
        if (tens === 99) {
            tens = 0;
            seconds++;
            if (seconds <= 9) {
                secondsEl.textContent = "0" + seconds;
            }
            if (seconds >= 10) {
                secondsEl.textContent = seconds;
            }
            if (seconds === 59) {
                seconds = 0;
                minute++;
                if (minute <= 9) {
                    minEl.textContent = "0" + minute;
                }
                if (minute >= 10) {
                    minEl.textContent = minute;
                }
            }
        }
        interval = setTimeout(stopWatch, 10);
    }
}
