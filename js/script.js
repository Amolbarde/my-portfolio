/* =========================================================
   AMOL BARDE PORTFOLIO
   Main JavaScript
========================================================= */

'use strict';


/* =========================================================
   HELPERS
========================================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);


/* =========================================================
   LAMP INTRO
========================================================= */

const lampStage = $('#lampStage');
const lampScene = $('#lampScene');
const lampSwitch = $('#lampSwitch');
const enterPortfolio = $('#enterPortfolio');

let lampOn = false;
let messageTimer = null;
let sideTimer = null;


function toggleLamp() {

    lampOn = !lampOn;

    lampStage.classList.toggle('lit', lampOn);

    if (lampOn) {

        lampSwitch.textContent = 'OFF';

        lampSwitch.setAttribute(
            'aria-label',
            'Turn off lamp'
        );

        clearTimeout(sideTimer);
        clearTimeout(messageTimer);

        /*
         * Move lamp slightly to the side
         * after turning it on.
         */

        sideTimer = setTimeout(() => {

            lampStage.classList.add('lamp-side');

        }, 900);


        /*
         * Show hidden message.
         */

        messageTimer = setTimeout(() => {

            lampStage.classList.add('message-open');

        }, 1600);

    } else {

        lampSwitch.textContent = 'ON';

        lampSwitch.setAttribute(
            'aria-label',
            'Turn on lamp'
        );

        clearTimeout(sideTimer);
        clearTimeout(messageTimer);

        lampStage.classList.remove(
            'lamp-side',
            'message-open'
        );
    }
}


/*
 * Click anywhere on lamp.
 */

lampScene.addEventListener(
    'click',
    event => {

        /*
         * Prevent button click from firing twice.
         */

        if (event.target === lampSwitch) {
            toggleLamp();
            return;
        }

        toggleLamp();
    }
);


/*
 * Keyboard support.
 */

lampScene.addEventListener(
    'keydown',
    event => {

        if (
            event.key === 'Enter' ||
            event.key === ' '
        ) {

            event.preventDefault();

            toggleLamp();
        }
    }
);


/*
 * Enter portfolio.
 */

enterPortfolio.addEventListener(
    'click',
    () => {

        lampStage.classList.add('dismissed');

        lampOn = false;

        clearTimeout(sideTimer);
        clearTimeout(messageTimer);

        lampStage.classList.remove(
            'lit',
            'lamp-side',
            'message-open'
        );

    }
);


/* =========================================================
   BACKGROUND VIDEO
========================================================= */

const bgVideo = $('#mediaBg');


if (bgVideo) {

    bgVideo.addEventListener(
        'loadeddata',
        () => {

            bgVideo.classList.add('ready');

        }
    );


    bgVideo.addEventListener(
        'error',
        () => {

            console.log(
                'Background video could not be loaded.'
            );

        }
    );
}


/* =========================================================
   LIVE CANVAS BACKGROUND
========================================================= */

const bgCanvas = $('#liveBg');

const bgCtx =
    bgCanvas.getContext('2d');

let bgWidth = 0;
let bgHeight = 0;


const bgDots = Array.from(
    { length: 40 },
    () => ({

        x: Math.random(),

        y: Math.random(),

        radius:
            Math.random() * 2 + 0.5,

        speed:
            Math.random() * 0.00035 + 0.00012,

        phase:
            Math.random() * Math.PI * 2

    })
);


function resizeCanvas() {

    bgWidth = window.innerWidth;

    bgHeight = window.innerHeight;

    const ratio =
        window.devicePixelRatio || 1;

    bgCanvas.width =
        bgWidth * ratio;

    bgCanvas.height =
        bgHeight * ratio;

    bgCanvas.style.width =
        bgWidth + 'px';

    bgCanvas.style.height =
        bgHeight + 'px';

    bgCtx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}


function animateBackground(time) {

    bgCtx.clearRect(
        0,
        0,
        bgWidth,
        bgHeight
    );


    bgDots.forEach(
        (dot, index) => {

            dot.y -= dot.speed;

            if (dot.y < -0.05) {
                dot.y = 1.05;
            }


            const x =
                dot.x * bgWidth +
                Math.sin(
                    time * 0.00035 +
                    dot.phase
                ) * 18;


            const y =
                dot.y * bgHeight;


            bgCtx.beginPath();


            bgCtx.fillStyle =
                index % 3 === 0
                    ? 'rgba(167,139,250,.30)'
                    : 'rgba(99,230,255,.30)';


            bgCtx.shadowBlur = 14;

            bgCtx.shadowColor =
                bgCtx.fillStyle;


            bgCtx.arc(
                x,
                y,
                dot.radius,
                0,
                Math.PI * 2
            );


            bgCtx.fill();

        }
    );


    bgCtx.shadowBlur = 0;


    requestAnimationFrame(
        animateBackground
    );
}


resizeCanvas();

window.addEventListener(
    'resize',
    resizeCanvas
);

requestAnimationFrame(
    animateBackground
);


/* =========================================================
   LOADER
========================================================= */

const loader = $('#loader');

const loaderProgress =
    $('#loaderProgress');

const loaderPercent =
    $('#loaderPercent');

const loaderCode =
    $('#loaderCode');


let progress = 0;


const loadingMessages = [

    'initializing portfolio interface...',

    'loading Java modules...',

    'connecting project data...',

    'warming up animations...',

    'loading developer profile...',

    'ready — welcome to amol.dev'

];


const loadTimer = setInterval(
    () => {

        progress +=
            Math.floor(
                Math.random() * 7
            ) + 3;


        if (progress >= 100) {

            progress = 100;

            clearInterval(loadTimer);


            setTimeout(
                () => {

                    loader.classList.add(
                        'done'
                    );

                },
                500
            );
        }


        loaderProgress.style.width =
            progress + '%';


        loaderPercent.textContent =
            progress + '%';


        const messageIndex =
            Math.min(
                loadingMessages.length - 1,
                Math.floor(progress / 18)
            );


        loaderCode.textContent =
            loadingMessages[messageIndex];

    },
    100
);


/* =========================================================
   TYPEWRITER
========================================================= */

const typingElement =
    $('#typing');


const words = [

    'Java Applications',

    'Backend Systems',

    'Database Solutions',

    'Web Applications'

];


let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeWriter() {

    const currentWord =
        words[wordIndex];


    typingElement.textContent =
        currentWord.substring(
            0,
            characterIndex
        );


    if (!deleting) {

        if (
            characterIndex <
            currentWord.length
        ) {

            characterIndex++;

            setTimeout(
                typeWriter,
                80
            );

        } else {

            deleting = true;

            setTimeout(
                typeWriter,
                1500
            );
        }

    } else {

        if (characterIndex > 0) {

            characterIndex--;

            setTimeout(
                typeWriter,
                40
            );

        } else {

            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                words.length;

            setTimeout(
                typeWriter,
                350
            );
        }
    }
}


setTimeout(
    typeWriter,
    1400
);


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar =
    $('#navbar');

const navLinks =
    $$('.nav-links a');


window.addEventListener(
    'scroll',
    () => {

        navbar.classList.toggle(
            'scrolled',
            window.scrollY > 30
        );


        let currentSection =
            'home';


        $$('main section[id]')
            .forEach(
                section => {

                    const sectionTop =
                        section.offsetTop;

                    if (
                        window.scrollY >=
                        sectionTop - 220
                    ) {

                        currentSection =
                            section.id;

                    }

                }
            );


        navLinks.forEach(
            link => {

                const target =
                    link.getAttribute(
                        'href'
                    );


                link.classList.toggle(
                    'active',
                    target ===
                    '#' + currentSection
                );

            }
        );

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const hamburger =
    $('#hamb');

const navigation =
    $('#navLinks');


hamburger.addEventListener(
    'click',
    () => {

        navigation.classList.toggle(
            'open'
        );


        const opened =
            navigation.classList.contains(
                'open'
            );


        hamburger.textContent =
            opened
                ? '×'
                : '☰';

    }
);


navLinks.forEach(
    link => {

        link.addEventListener(
            'click',
            () => {

                navigation.classList.remove(
                    'open'
                );

                hamburger.textContent =
                    '☰';

            }
        );

    }
);


/* =========================================================
   THEME
========================================================= */

const themeButton =
    $('#themeBtn');


const savedTheme =
    localStorage.getItem(
        'amol-theme'
    );


if (savedTheme === 'light') {

    document.body.classList.add(
        'light'
    );

    themeButton.textContent =
        '☾';

}


themeButton.addEventListener(
    'click',
    () => {

        document.body.classList.toggle(
            'light'
        );


        const isLight =
            document.body.classList.contains(
                'light'
            );


        themeButton.textContent =
            isLight
                ? '☾'
                : '☀';


        localStorage.setItem(
            'amol-theme',
            isLight
                ? 'light'
                : 'dark'
        );

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    $$('.reveal');


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            'show'
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   TIMELINE
========================================================= */

const timeline =
    $('#timeline');


if (timeline) {

    const timelineObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            timeline.classList.add(
                                'active'
                            );

                            timelineObserver.unobserve(
                                timeline
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.2
            }
        );


    timelineObserver.observe(
        timeline
    );
}


/* =========================================================
   SKILL FILTER
========================================================= */

const filterButtons =
    $$('.filter-btn');

const skillCards =
    $$('.skill-card');


filterButtons.forEach(
    button => {

        button.addEventListener(
            'click',
            () => {

                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            'active'
                        );

                    }
                );


                button.classList.add(
                    'active'
                );


                const filter =
                    button.dataset.filter;


                skillCards.forEach(
                    card => {

                        const category =
                            card.dataset.cat;


                        const show =
                            filter === 'all' ||
                            category === filter;


                        card.classList.toggle(
                            'hide',
                            !show
                        );

                    }
                );

            }
        );

    }
);


/* =========================================================
   PROJECT MODAL
========================================================= */

const projectDetails = {

    smart: {

        title:
            'Smart Complaint Management System',

        text:
            'Currently developing a Java web application that helps organize, track and resolve complaints through automatic priority detection, department routing and pattern detection using structured workflows and PostgreSQL-backed data.',

        tech:
            [
                'Java',
                'Servlets',
                'JDBC',
                'PostgreSQL',
                'HTML',
                'CSS',
                'JavaScript'
            ]

    },


    clinic: {

        title:
            'Clinic Management System',

        text:
            'A completed desktop clinic management application for managing patients, doctors and appointments using a Java Swing interface and PostgreSQL database connectivity.',

        tech:
            [
                'Java',
                'Swing',
                'AWT',
                'JDBC',
                'PostgreSQL'
            ]

    },


    users: {

        title:
            'Java Swing User Management System',

        text:
            'A desktop user management application developed with Java Swing and AWT, with JDBC used for database connectivity and user operations.',

        tech:
            [
                'Java',
                'Swing',
                'AWT',
                'JDBC'
            ]

    },


    atm: {

        title:
            'ATM Simulation System',

        text:
            'A completed console-based ATM simulation created to practice Java programming, object-oriented concepts and common transaction operations.',

        tech:
            [
                'Java',
                'OOP',
                'Core Java'
            ]

    },


    calculator: {

        title:
            'Web-Based Calculator',

        text:
            'A responsive calculator application created using HTML, CSS and JavaScript to practice browser-side interaction and interface development.',

        tech:
            [
                'HTML',
                'CSS',
                'JavaScript'
            ]

    }

};


const projectButtons =
    $$('.project-btn');


const modal =
    $('#modal');

const modalTitle =
    $('#modalTitle');

const modalText =
    $('#modalText');

const modalTech =
    $('#modalTech');

const closeModal =
    $('#closeModal');


function openProjectModal(
    projectId
) {

    const project =
        projectDetails[projectId];


    if (!project) {
        return;
    }


    modalTitle.textContent =
        project.title;


    modalText.textContent =
        project.text;


    modalTech.innerHTML =
        '';


    project.tech.forEach(
        tech => {

            const tag =
                document.createElement(
                    'span'
                );


            tag.textContent =
                tech;


            modalTech.appendChild(
                tag
            );

        }
    );


    modal.classList.add(
        'open'
    );


    document.body.classList.add(
        'modal-open'
    );

}


function closeProjectModal() {

    modal.classList.remove(
        'open'
    );


    document.body.classList.remove(
        'modal-open'
    );

}


projectButtons.forEach(
    button => {

        button.addEventListener(
            'click',
            () => {

                openProjectModal(
                    button.dataset.project
                );

            }
        );

    }
);


closeModal.addEventListener(
    'click',
    closeProjectModal
);


const modalOverlay =
    document.querySelector(
        '.modal-overlay'
    );


modalOverlay.addEventListener(
    'click',
    closeProjectModal
);


document.addEventListener(
    'keydown',
    event => {

        if (
            event.key === 'Escape'
        ) {

            closeProjectModal();

        }

    }
);


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    $('#cursorGlow');


const finePointer =
    window.matchMedia(
        '(pointer:fine)'
    ).matches;


if (finePointer) {

    window.addEventListener(
        'pointermove',
        event => {

            cursorGlow.style.left =
                event.clientX + 'px';

            cursorGlow.style.top =
                event.clientY + 'px';

        }
    );


    /*
     * Card tilt.
     */

    const tiltCards =
        document.querySelectorAll(
            '.project-card, .skill-card, .about-card, .timeline-content'
        );


    tiltCards.forEach(
        card => {

            card.addEventListener(
                'pointermove',
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (event.clientX -
                        rect.left) /
                        rect.width -
                        0.5;


                    const y =
                        (event.clientY -
                        rect.top) /
                        rect.height -
                        0.5;


                    card.style.transform =
                        `
                        perspective(800px)
                        rotateX(${y * -3}deg)
                        rotateY(${x * 4}deg)
                        translateY(-5px)
                        `;

                }
            );


            card.addEventListener(
                'pointerleave',
                () => {

                    card.style.transform =
                        '';

                }
            );

        }
    );

} else {

    cursorGlow.style.display =
        'none';

}


/* =========================================================
   BUTTON MAGNETIC EFFECT
========================================================= */

if (finePointer) {

    const magneticElements =
        document.querySelectorAll(
            '.btn, .social-links a, .project-btn'
        );


    magneticElements.forEach(
        element => {

            element.addEventListener(
                'pointermove',
                event => {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    element.style.transform =
                        `
                        translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )
                        `;

                }
            );


            element.addEventListener(
                'pointerleave',
                () => {

                    element.style.transform =
                        '';

                }
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU ON RESIZE
========================================================= */

window.addEventListener(
    'resize',
    () => {

        if (
            window.innerWidth > 820
        ) {

            navigation.classList.remove(
                'open'
            );

            hamburger.textContent =
                '☰';

        }

    }
);