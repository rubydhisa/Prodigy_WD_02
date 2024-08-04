let timer;
let elapsedTime = 0;
let running = false;
let lapCounter = 1;

const timeElement = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTime() {
    elapsedTime += 100; // Increment by 100ms
    timeElement.textContent = formatTime(elapsedTime);
}

startButton.addEventListener('click', () => {
    if (!running) {
        timer = setInterval(updateTime, 100); // Update every 100ms
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
});

pauseButton.addEventListener('click', () => {
    if (running) {
        clearInterval(timer);
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    timeElement.textContent = formatTime(elapsedTime);
    lapList.innerHTML = ''; // Clear lap times
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapCounter = 1;
});

lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter++}: ${formatTime(elapsedTime)}`;
        lapList.appendChild(lapTime);
    }
});
