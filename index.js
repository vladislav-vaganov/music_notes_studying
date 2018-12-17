const octaveNames = ['субконтроктава', 'контроктава', 'большая октава', 'малая октава',
    'первая октава', 'вторая октава', 'третья октава', 'четвертая октава', 'пятая октава'];

const noteNames = ['до', 'ре', 'ми', 'фа', 'соль', 'ля', 'си'];

const alterNames = [' бемоль', '', ' диез'];

const randomInteger = (min, max) =>
    Math.floor(Math.random() * (max + 1 - min) + min);

function getText() {
    const rnd = randomInteger(5, 56);
    const octave = Math.floor(rnd / 7);
    const note = rnd % 7;

    const alter = randomInteger(0, 2);

    if (rnd === 5 && alter == 0 ||
        rnd === 56 && alter == 2) {
        return getText();
    }

    return `${octaveNames[octave]} ${noteNames[note]}${alterNames[alter]}`;
}

let count = 0;
const cunterView = document.getElementById("counter-value");
const textView = document.getElementById("text");

const utterance = new SpeechSynthesisUtterance();
utterance.lang = 'ru-RU';

let isProcessing = false;
function speak() {
    if (isProcessing) {
        return;
    }

    isProcessing = true;
    const text = getText();
    utterance.text = text;
    speechSynthesis.speak(utterance);
    cunterView.textContent = ++count;
    textView.textContent = text;
}

function onEndHandler() {
    isProcessing = false;
}

utterance.onend = onEndHandler;

let timeoutId;
let delay = 7000;

function play() {
    speak();
    utterance.onend = () => {
        timeoutId = setTimeout(play, delay);
        onEndHandler();
    }
}

function pause() {
    utterance.onend = onEndHandler;

    if (!timeoutId) {
        return;
    }

    clearTimeout(timeoutId);
    timeoutId = null;
}

document.getElementById("speak-btn").onclick = () => {
    pause();
    speak();
};
document.getElementById("play-btn").onclick = play;
document.getElementById("pause-btn").onclick = pause;

const delayValue = document.getElementById("delay-value");

function changeDelay(diff) {
    const newValue = delay + diff;
    
    if (newValue < 1000) {
        return;
    }

    delay = newValue;
    delayValue.textContent = newValue / 1000;
}

document.getElementById("decrease-delay-btn").onclick = () => changeDelay(-1000);
document.getElementById("increase-delay-btn").onclick = () => changeDelay(1000);