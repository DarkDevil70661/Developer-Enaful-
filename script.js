
/* ==========================================
   ENAFUL PORTFOLIO
   Main JavaScript: script.js
========================================== */

"use strict";

/* -------------------------------
   SELECT ELEMENTS
-------------------------------- */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const currentYear = document.getElementById("currentYear");


/* -------------------------------
   MOBILE NAVIGATION
-------------------------------- */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        navMenu.classList.toggle("open", !isOpen);

    });

}


/* -------------------------------
   CLOSE MENU AFTER CLICK
-------------------------------- */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navMenu && menuToggle) {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


/* -------------------------------
   CLOSE MENU OUTSIDE CLICK
-------------------------------- */

document.addEventListener("click", (event) => {

    if (!navMenu || !menuToggle) return;

    const clickedInside =
        navMenu.contains(event.target) ||
        menuToggle.contains(event.target);

    if (!clickedInside) {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* -------------------------------
   CLOSE MENU ON ESCAPE
-------------------------------- */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && navMenu && menuToggle) {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.focus();

    }

});


/* -------------------------------
   DYNAMIC COPYRIGHT YEAR
-------------------------------- */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* -------------------------------
   ACTIVE NAVIGATION
-------------------------------- */

const sections = document.querySelectorAll(
    "main section[id]"
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const activeId = entry.target.id;

                    navLinks.forEach((link) => {

                        const linkTarget =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            linkTarget === `#${activeId}`
                        );

                    });

                }

            });

        },
        {
            root: null,
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


/* -------------------------------
   SCROLL REVEAL ANIMATION
-------------------------------- */

const revealStyle = document.createElement("style");

revealStyle.textContent = `
    .js-reveal {
        opacity: 0;
        transform: translateY(24px);
        transition:
            opacity .7s ease,
            transform .7s ease;
    }

    .js-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
        .js-reveal {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }
`;

document.head.appendChild(revealStyle);


const revealElements = document.querySelectorAll(
    ".section-heading, .info-card, .skill-card, " +
    ".project-card, .service-card, .contact-box"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {

        element.classList.add("js-reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("is-visible");

    });

}


/* -------------------------------
   SKILL BAR ANIMATION
-------------------------------- */

const skillBars = document.querySelectorAll(
    ".skill-bar span"
);

if ("IntersectionObserver" in window) {

    const skillObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const bar = entry.target;

                    bar.style.animation = "none";

                    void bar.offsetWidth;

                    bar.style.animation =
                        "skill-fill 1.3s ease-out both";

                    observer.unobserve(bar);

                }

            });

        },
        {
            threshold: 0.5
        }
    );

    skillBars.forEach((bar) => {

        skillObserver.observe(bar);

    });

}


/* -------------------------------
   SMOOTH ANCHOR NAVIGATION
-------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth",
            block: "start"
        });

    });

});


/* -------------------------------
   TERMINAL STATUS EFFECT
-------------------------------- */

const terminalBadge = document.querySelector(
    ".terminal-badge span:not(.status-dot):not(.typing-cursor)"
);

if (terminalBadge) {

    const terminalMessages = [
        "$ welcome --portfolio",
        "$ developer --ready",
        "$ system.status()",
        "$ build --creative"
    ];

    let messageIndex = 0;

    window.setInterval(() => {

        messageIndex =
            (messageIndex + 1) % terminalMessages.length;

        terminalBadge.textContent =
            terminalMessages[messageIndex];

    }, 4000);

}


/* -------------------------------
   EXTERNAL LINK SAFETY
-------------------------------- */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach((link) => {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});


/* -------------------------------
   PAGE READY
-------------------------------- */

document.documentElement.classList.add(
    "js-loaded"
);

console.log(
    "%c ENAFUL PORTFOLIO ",
    "background:#00f58a;color:#001b0e;padding:8px;font-weight:bold;"
);

console.log(
    "%c System initialized successfully.",
    "color:#00f58a;font-family:monospace;"
);
