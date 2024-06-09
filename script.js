function updateCountdown() {
    var countDownDate = new Date("June 9, 2024 19:59:00 GMT+0300").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
        clearInterval(x);
        clearInterval(y);
        showPlayers();
    } else if (distance <= 30000) {
        clearInterval(y);
        document.querySelector('.reveal-text').classList.add('fade-out');
        document.querySelector('.reveal-text1').classList.add('fade-out');
        document.getElementById("countdown").classList.add('large');
        document.getElementById("countdown").innerHTML = seconds + "s";
    } else {
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }

    if (distance <= 11000 && distance > 10000) {
        document.getElementById("countdown").classList.add('fade-out');
    }

    if (distance <= 10000 && distance > 0) {
        playVideo();
    }
}

    function playVideo() {
        var video = document.getElementById("background-video");
        var countdown = document.getElementById("countdown");
        var audio = document.getElementById("background-audio");

        video.style.display = "block";
        countdown.style.opacity = "0";

        video.play().catch(error => {
            console.log("Error playing video:", error);
        });

        audio.play().catch(error => {
            console.log("Error playing audio:", error);
        });
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

        const randomTime = Math.floor(Math.random() * 450);
        y = setTimeout(displayMilliseconds, randomTime);
    }

    function showPlayers() {
        document.getElementById("container").style.display = "none";
        const players = document.getElementById("players");
        players.style.display = "flex";
        document.getElementById("twitch-button").disabled = false;
        document.getElementById("youtube-button").disabled = false;
        setTimeout(() => {
            players.classList.add('show');
        }, 100); // small delay to ensure display change before opacity transition
    }

    function openStream(platform) {
        if (platform === 'twitch') {
            window.open('https://www.twitch.tv/Xbox', '_blank');
        } else if (platform === 'youtube') {
            window.open('https://www.youtube.com/@xbox/videos', '_blank');
        }
    }

    updateCountdown();

    var x = setInterval(updateCountdown, 1000);
    var y = setTimeout(displayMilliseconds, 200);
