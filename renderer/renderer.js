

const updateOnlineStatus = () => {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus();

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let stream = null;
let mediaRecorder = null;

startButton.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log('Microphone access granted');

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    console.log('Recording started');

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        console.log('Recorded data available:', event.data);
        // You can handle the recorded data here, e.g., send it to a server
      }
    };

    mediaRecorder.onstop = () => {
      console.log('Recording stopped');
    };
  } catch (err) {
    console.error('Microphone access denied or error:', err);
  }
});

stopButton.addEventListener('click', () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    console.log('Recording stopped');
  }
});
