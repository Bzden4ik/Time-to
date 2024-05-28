function updateCountdown() {
    var countDownDate = new Date("July 9, 2024 23:00:00").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var milliseconds = distance % 1000;

    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}

let usedPositions = [];
const margin = 20;
const container = document.querySelector('.container');
const containerRect = container.getBoundingClientRect();
const exclusionZone = 60;

function showHandwrittenText(text) {
    const body = document.body;
    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'handwritten';
    body.appendChild(span);

    const spanWidth = span.offsetWidth;
    const spanHeight = span.offsetHeight;
    let x, y, overlapping, attempts = 0;

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
    } while (overlapping && attempts < 100);

    if (attempts === 100) {
        body.removeChild(span);
        return;
    }

    usedPositions.push({ x: x, y: y, width: spanWidth, height: spanHeight });

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
                usedPositions = usedPositions.filter(pos => pos.x !== x || pos.y !== y);
            }, 500);
        }, 3000);
    }, 100);
}

function displayMilliseconds() {
    var now = new Date().getTime();
    var milliseconds = now % 1000;
    showHandwrittenText(milliseconds);

    const randomTime = Math.floor(Math.random() * 450); // случайное время от 200 до 700 миллисекунд
    setTimeout(displayMilliseconds, randomTime);
}

// Первоначальное обновление обратного отсчёта
updateCountdown();

// Обновление обратного отсчёта каждую секунду
var x = setInterval(updateCountdown, 1000);

// Запуск отображения миллисекунд
displayMilliseconds();
