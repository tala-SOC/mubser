/* =====================================================
   MUBSIR WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "إغلاق القائمة" : "فتح القائمة"
        );

        menuButton.textContent = isOpen ? "×" : "☰";

    });


    /* Close mobile menu after clicking a link */

    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "فتح القائمة"
                );

                menuButton.textContent = "☰";

            });

        });

}


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    },
    { passive: true }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(
    ".section, .agent-section, .prototype-section, .intro-strip"
);

revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.08
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navLinks = document.querySelectorAll(
    ".nav-links a"
);


const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const currentId = entry.target.id;

            navLinks.forEach(link => {

                link.classList.remove("active");

                const linkTarget =
                    link.getAttribute("href");

                if (linkTarget === `#${currentId}`) {

                    link.classList.add("active");

                }

            });

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   IMPACT COUNTER
===================================================== */

const counters = document.querySelectorAll(
    ".counter"
);


const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const duration = 1400;

            const startTime = performance.now();


            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);


                const easedProgress =
                    1 - Math.pow(
                        1 - progress,
                        3
                    );


                current =
                    Math.floor(
                        target * easedProgress
                    );


                counter.textContent = current;


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent = target;

                }

            }


            requestAnimationFrame(
                updateCounter
            );


            counterObserver.unobserve(counter);

        });

    },
    {
        threshold: 0.5
    }
);


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =====================================================
   CLOSE MENU WITH ESC
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;

        if (!mobileMenu || !menuButton) return;

        mobileMenu.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "فتح القائمة"
        );

        menuButton.textContent = "☰";

    }
);


/* =====================================================
   PREVENT MOBILE MENU FROM STAYING OPEN
   AFTER RESIZING TO DESKTOP
===================================================== */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 1000) {

            if (mobileMenu) {

                mobileMenu.classList.remove("active");

            }

            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "فتح القائمة"
                );

                menuButton.textContent = "☰";

            }

        }

    }
);


/* =====================================================
   INITIAL PAGE STATE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (navbar && window.scrollY > 30) {

            navbar.classList.add("scrolled");

        }

    }
);