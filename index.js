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
    cunterView.innerText = ++count;
    textView.innerText = text;
}

function onEndHandler() {
    isProcessing = false;
}

utterance.onend = onEndHandler;

let timeoutId;
const delay = 7000;

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

document.getElementById("speak-btn").onclick = speak;
document.getElementById("play-btn").onclick = play;
document.getElementById("pause-btn").onclick = pause;
