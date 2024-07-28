const video = document.getElementById('myVideo');
let loopStart = 0;
let loopEnd = 0;
let looping = false;
let timeData = [];

function initializeTimeData() {
    const rows = document.querySelectorAll('#segmentTable tbody tr');

    rows.forEach((row, index) => {
        const timeCell = row.querySelector('td:nth-child(1)');
        const timeRange = timeCell.textContent.split(' - ');
        const startTime = convertToSeconds(timeRange[0]);
        const endTime = convertToSeconds(timeRange[1]);
        timeData.push({ start: startTime, end: endTime });

        // Add click event listener to each row
        row.addEventListener('click', () => playSegment(index));
    });
}

function convertToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
}

function playSegment(index) {
    if (index >= 0 && index < timeData.length) {
        const segment = timeData[index];
        video.currentTime = segment.start;
        loopStart = segment.start;
        loopEnd = segment.end;
        looping = true;
        video.play();
    }
}

video.addEventListener('timeupdate', () => {
    if (looping && video.currentTime >= loopEnd) {
        video.currentTime = loopStart;
        video.play();
    }
});

function playPause() {
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
}

function stopVideo() {
    looping = false;
    video.pause();
    video.currentTime = 0;
}

function skip(seconds) {
    video.currentTime += seconds;
}

function setVolume(value) {
    video.volume = value;
}

// Initialize timeData and set up click listeners when the page loads
window.onload = initializeTimeData;