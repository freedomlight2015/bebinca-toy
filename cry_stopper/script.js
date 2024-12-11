// 音频文件路径
const SOUNDS = {
    cry1: 'cry1.mp3',
    cry2: 'cry2.mp3',
    cry3: 'cry3.mp3',
    cry4: 'cry4.mp3', 
    cry5: 'cry5.mp3', 
    
};

let currentAudio = null;
let audioContext = null;
let mediaStreamSource = null;
let isLive = false;

// 播放预设声音
function playSound(soundId) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    currentAudio = new Audio(SOUNDS[soundId]);
    currentAudio.loop = true;
    currentAudio.play();
}

// 停止播放
function stopSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

// 实时录音相关
const liveButton = document.getElementById('liveButton');

async function startLiveAudio() {
    try {
        // 创建音频上下文
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 获取麦克风输入
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false
            } 
        });

        // 创建媒体流源节点
        mediaStreamSource = audioContext.createMediaStreamSource(stream);
        
        // 创建输出节点
        const destination = audioContext.destination;
        
        // 连接节点
        mediaStreamSource.connect(destination);

        isLive = true;
        liveButton.textContent = 'Stop';
        liveButton.classList.add('recording');

    } catch (err) {
        console.error('Recording failed:', err);
        alert('Cannot access microphone. Please ensure permission is granted.');
    }
}

function stopLiveAudio() {
    if (mediaStreamSource) {
        mediaStreamSource.disconnect();
        mediaStreamSource = null;
    }
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    isLive = false;
    liveButton.textContent = 'Start Recording';
    liveButton.classList.remove('recording');
}

liveButton.addEventListener('click', () => {
    if (!isLive) {
        startLiveAudio();
    } else {
        stopLiveAudio();
    }
});

function updateRecordButton() {
    const recordButton = document.getElementById('recordButton');
    recordButton.textContent = isRecording ? 'Stop Recording' : 'Start Recording';
    recordButton.classList.toggle('recording', isRecording);
}

function playRecordedWithDelay(delaySeconds) {
    if (!recordedAudio) {
        alert('Please record a sound first!');
        return;
    }

    // ... rest of the code ...

    alert(`Recording will play in ${delaySeconds} seconds`);
}

function cancelDelayedPlay() {
    if (delayTimeout) {
        clearTimeout(delayTimeout);
        delayTimeout = null;
        alert('Delayed playback cancelled');
    }
}