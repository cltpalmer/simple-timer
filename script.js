let timer;
let timerInterval;
let isRunning = false;
let initialTime = 120; // Initial time in seconds (2 minutes)
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
        ballElement.style.transform = 'scale(1)'; // Final state to indicate end
    }
}

startPauseButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startPauseButton.textContent = 'pause';
        ballElement.style.animation = `pulse ${initialTime}s linear infinite`; // Start pulsing with correct duration

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
    timer = initialTime; // Reset to initial time
    updateTimer();
    startPauseButton.textContent = 'start';
    ballElement.style.animationPlayState = 'paused';
    ballElement.style.transform = 'scale(0.25)'; // Reset the ball size
});

timeInput.addEventListener('change', () => {
    const inputMinutes = parseInt(timeInput.value, 10);
    if (inputMinutes > 0) {
        initialTime = inputMinutes * 60; // Update initial time
        timer = initialTime;
        updateTimer();
    }
});

colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
        colorCircles.forEach(c => c.classList.remove('selected')); // Remove selection from all
        circle.classList.add('selected'); // Add selection to clicked
        document.querySelector('.container').style.borderColor = circle.getAttribute('data-color'); // Change circle outline color
    });
});

// Initialize with default timer value
timer = initialTime;
updateTimer();
