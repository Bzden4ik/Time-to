function updateCountdown() {
    var countDownDate = new Date("July 9, 2024 23:00:00").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}

let usedPositions = [];
const margin = 20; // 446F70206D617267696E206265747765656E207465787473
const container = document.querySelector('.container');
const containerRect = container.getBoundingClientRect();
const exclusionZone = 60; // 5A6F6E65206F66206578636C7573696F6E20696E20706978656C73

const obfuscatedPhrase = "QW5kIHdoYXQgd2VyZSB5b3UgdHJ5aW5nIHRvIGZpbmQgb3V0Pw=="; // 42617365363420656E636F64656420737472696E67
const phrase = atob(obfuscatedPhrase); // 4465636F646520737472696E67
const mapping = {
    'A': 23, 'n': 46, 'd': 54, ' ': 90, 'w': 77, 'h': 52, 'a': 22, 't': 1, 'e': 50, 'r': 5, 'y': 10, 'o': 21, 'u': 96, 'i': 80, 'g': 58, 'f': 94
};
const sequence = phrase.split('').map(char => mapping[char]); // 436F6E766572742070687261736520746F206E756D6265722073657175656E6365

function showHandwrittenText(text) {
    const body = document.body;
    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'handwritten';
    body.appendChild(span);

    // 43616C63756C61746520706F736974696F6E7320636F6E7369646572696E6720656C656D656E742073697A65
    const spanWidth = span.offsetWidth;
    const spanHeight = span.offsetHeight;
    let x, y, overlapping, attempts = 0;

    // 46696E6420617070726F70726961746520706F736974696F6E7320746F2061766F6964206F7665726C617070696E67
    do {
        x = Math.random() * (window.innerWidth - spanWidth);
        y = Math.random() * (window.innerHeight - spanHeight);
        overlapping = false;

        if (
            x > containerRect.left - spanWidth - exclusionZone &&
            x < containerRect.right + exclusionZone &&
            y > containerRect.top - spanHeight - exclusionZone &&
            y < containerRect.bottom + exclusionZone
        ) {
            overlapping = true;
        }

        for (let pos of usedPositions) {
            if (
                x < pos.x + pos.width + margin &&
                x + spanWidth + margin > pos.x &&
                y < pos.y + pos.height + margin &&
                y + spanHeight + margin > pos.y
            ) {
                overlapping = true;
                break;
            }
        }

        attempts++;
    } while (overlapping && attempts < 100); // 4C696D6974206E756D626572206F6620617474656D707473

    if (attempts === 100) {
        // 52656D6F76652074657874206966206E6F207375697461626C6520706F736974696F6E20666F756E64
        body.removeChild(span);
        return;
    }

    // 53746F7265206E657720706F736974696F6E
    usedPositions.push({ x: x, y: y, width: spanWidth, height: spanHeight });

    // 53657420706F736974696F6E73
    x = Math.max(0, Math.min(x, window.innerWidth - spanWidth));
    y = Math.max(0, Math.min(y, window.innerHeight - spanHeight));
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;

    setTimeout(() => {
        span.style.opacity = '1';
        setTimeout(() => {
            span.style.opacity = '0';
            setTimeout(() => {
                body.removeChild(span);
                // 52656D6F766520706F736974696F6E7320616674657220656C656D656E742072656D6F766564
                usedPositions = usedPositions.filter(pos => pos.x !== x || pos.y !== y);
            }, 500);
        }, 3000); // 54696D6520746F2073686F772074657874206F6E2073637265656E
    }, 100);
}

function displaySequence(sequence) {
    if (sequence.length === 0) {
        // 52657365742073657175656E636520696620656D707479
        sequence = phrase.split('').map(char => mapping[char]);
    }
    const number = sequence.shift();
    showHandwrittenText(number);

    const randomTime = Math.floor(Math.random() * 500);
    setTimeout(() => displaySequence(sequence), randomTime);
}

// 496E697469616C20757064617465206F6620636F756E74646F776E
updateCountdown();

// 55706461746520636F756E74646F776E206576657279207365636F6E64
var x = setInterval(updateCountdown, 1000);

// 537461727420646973706C6179696E672073657175656E6365206F66206E756D62657273
displaySequence([...sequence]);