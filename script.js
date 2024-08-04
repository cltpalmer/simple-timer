let timer;
let timerInterval;
let isRunning = false;
const ballElement = document.getElementById('ball');
const timerElement = document.getElementById('timer');
const startPauseButton = document.getElementById('startPauseButton');
const endButton = document.getElementById('endButton');
const timeInput = document.getElementById('timeInput');
const colorCircles = document.querySelectorAll('.color-circle');

function updateTimer() {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;

    if (timer > 0) {
        timer--;
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startPauseButton.textContent = 'start';
        ballElement.style.animationPlayState = 'paused';
    }
}

startPauseButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startPauseButton.textContent = 'pause';
        ballElement.style.animationPlayState = 'running';
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        isRunning = false;
        startPauseButton.textContent = 'start';
        ballElement.style.animationPlayState = 'paused';
        clearInterval(timerInterval);
    }
});

endButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    timer = 0;
    updateTimer();
    startPauseButton.textContent = 'start';
    ballElement.style.animationPlayState = 'paused';
});

timeInput.addEventListener('change', () => {
    const inputMinutes = parseInt(timeInput.value, 10);
    if (inputMinutes > 0) {
        timer = inputMinutes * 60;
        updateTimer();
    }
});

colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
        colorCircles.forEach(c => c.classList.remove('selected')); // Remove selection from all
        circle.classList.add('selected'); // Add selection to clicked
        ballElement.style.backgroundColor = circle.getAttribute('data-color');
    });
});

// Initialize with default timer value
timer = 120; // 2 minutes
updateTimer();
