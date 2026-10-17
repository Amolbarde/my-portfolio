/* =========================================================
   LAMP ANIMATION — INTERACTION CONTROLLER
   ========================================================= */

const lampStage = document.getElementById("lampStage");
const lampTrigger = document.getElementById("lampTrigger");
const turnOffButton = document.getElementById("turnOff");
const typingMessage = document.getElementById("typingMessage");
const lampStatus = document.getElementById("lampStatus");

let lampOn = false;
let timers = [];

/* Personal message */
const message =
    "Thanks for exploring my portfolio. Turn the lamp on to discover my work, skills and projects.";

/* ---------------------------------------------------------
   Timer helper
   --------------------------------------------------------- */

function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
}

/* ---------------------------------------------------------
   Typewriter effect
   --------------------------------------------------------- */

function typeMessage() {
    typingMessage.textContent = "";

    let index = 0;

    const typeTimer = setInterval(() => {
        typingMessage.textContent += message[index];
        index++;

        if (index >= message.length) {
            clearInterval(typeTimer);
        }
    }, 25);

    timers.push(typeTimer);
}

/* ---------------------------------------------------------
   Turn lamp ON
   --------------------------------------------------------- */

function turnLampOn() {
    clearTimers();

    lampOn = true;

    // Stage 1 — lamp illuminates
    lampStage.classList.add("lit");
    lampStatus.textContent = "LAMP ON";

    // Stage 2 — lamp moves to the left
    timers.push(
        setTimeout(() => {
            lampStage.classList.add("lamp-side");
        }, 750)
    );

    // Stage 3 — message appears after lamp reaches side
    timers.push(
        setTimeout(() => {
            lampStage.classList.add("message-open");
            lampStage
                .querySelector(".lamp-message")
                .setAttribute("aria-hidden", "false");

            typeMessage();
        }, 1750)
    );
}

/* ---------------------------------------------------------
   Turn lamp OFF
   --------------------------------------------------------- */

function turnLampOff() {
    clearTimers();

    lampOn = false;

    // Hide message first
    lampStage.classList.remove("message-open");

    lampStage
        .querySelector(".lamp-message")
        .setAttribute("aria-hidden", "true");

    typingMessage.textContent = "";

    // Bring lamp back to center
    timers.push(
        setTimeout(() => {
            lampStage.classList.remove("lamp-side");
        }, 300)
    );

    // Switch lamp off after it returns
    timers.push(
        setTimeout(() => {
            lampStage.classList.remove("lit");
            lampStatus.textContent = "LAMP OFF";
        }, 1050)
    );
}

/* ---------------------------------------------------------
   Main toggle
   --------------------------------------------------------- */

function toggleLamp() {
    if (lampOn) {
        turnLampOff();
    } else {
        turnLampOn();
    }
}

/* ---------------------------------------------------------
   Events
   --------------------------------------------------------- */

lampTrigger.addEventListener("click", toggleLamp);

turnOffButton.addEventListener("click", (event) => {
    event.stopPropagation();
    turnLampOff();
});

/* ---------------------------------------------------------
   Keyboard accessibility
   --------------------------------------------------------- */

lampTrigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleLamp();
    }
});

/* ---------------------------------------------------------
   Mouse parallax — desktop only
   --------------------------------------------------------- */

if (window.matchMedia("(pointer: fine)").matches) {

    window.addEventListener("mousemove", (event) => {

        if (lampOn) return;

        const x = (event.clientX / window.innerWidth - 0.5) * 8;
        const y = (event.clientY / window.innerHeight - 0.5) * 5;

        lampStage.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        lampStage.style.setProperty(
            "--mouse-y",
            `${y}px`
        );
    });
}
