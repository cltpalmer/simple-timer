let startTime = 120; // Timer start in seconds (2 minutes)
let timer = startTime;
const timerElement = document.getElementById('timer');

function updateTimer() {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;

    if (timer > 0) {
        timer--;
    } else {
        clearInterval(timerInterval);
    }
}

const timerInterval = setInterval(updateTimer, 1000);
