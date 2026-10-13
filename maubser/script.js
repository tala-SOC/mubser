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


/* =====================================================
   MUBSIR — ANIMATED LIGHT PARTICLES
   Add this at the END of script.js
===================================================== */

(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "mubsir-background";
    canvas.setAttribute("aria-hidden", "true");

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrame = null;
    let lastFrame = 0;

    const pointer = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
    };

    const PARTICLE_COUNT = Math.min(
        100,
        Math.max(35, Math.floor(window.innerWidth / 14))
    );

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        particles = Array.from(
            { length: PARTICLE_COUNT },
            () => createParticle(true)
        );

        drawScene(0);
    }

    function createParticle(randomY = false) {
        return {
            x: Math.random() * width,
            y: randomY ? Math.random() * height : height + 10,
            size: Math.random() * 1.8 + 0.35,
            speed: Math.random() * 0.32 + 0.08,
            drift: (Math.random() - 0.5) * 0.3,
            phase: Math.random() * Math.PI * 2,
            alpha: Math.random() * 0.55 + 0.15
        };
    }

    function drawLightRibbons(time) {
        const t = time * 0.00012;

        for (let i = 0; i < 4; i++) {
            const baseY = height * (0.25 + i * 0.17);
            const amplitude = 28 + i * 10;

            ctx.beginPath();

            for (let x = -20; x <= width + 20; x += 8) {
                const progress = x / width;

                const y =
                    baseY +
                    Math.sin(progress * 5 + t + i) * amplitude +
                    Math.sin(progress * 9 - t * 1.5 + i) * 13;

                if (x === -20) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            const gradient = ctx.createLinearGradient(
                0, baseY - 60, width, baseY + 60
            );

            gradient.addColorStop(0, "rgba(0, 217, 255, 0)");
            gradient.addColorStop(0.45, "rgba(40, 120, 255, 0.12)");
            gradient.addColorStop(0.7, "rgba(0, 217, 255, 0.08)");
            gradient.addColorStop(1, "rgba(0, 100, 255, 0)");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = i === 1 ? 1.3 : 0.7;
            ctx.stroke();
        }
    }

    function drawParticles(time) {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            if (!reduceMotion) {
                p.y -= p.speed;
                p.x += p.drift;

                if (p.y < -10) {
                    particles[i] = createParticle(false);
                    continue;
                }

                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
            }

            const pulse = reduceMotion
                ? 1
                : 0.65 + Math.sin(time * 0.001 + p.phase) * 0.35;

            const alpha = p.alpha * pulse;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(112, 190, 255, ${alpha})`;
            ctx.fill();

            /* هالة خفيفة حول بعض الجسيمات */
            if (p.size > 1.35) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 180, 255, ${alpha * 0.12})`;
                ctx.fill();
            }
        }
    }

    function drawConnections() {
        const maxDistance = Math.min(width, height) * 0.14;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i];
                const b = particles[j];

                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.09;

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(55, 145, 255, ${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function drawScene(time) {
        ctx.clearRect(0, 0, width, height);

        /* توهج مركزي عميق */
        const glow = ctx.createRadialGradient(
            width * 0.63, height * 0.35, 0,
            width * 0.63, height * 0.35,
            Math.max(width, height) * 0.62
        );

        glow.addColorStop(0, "rgba(0, 75, 180, 0.09)");
        glow.addColorStop(0.55, "rgba(0, 35, 90, 0.035)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        drawLightRibbons(time);
        drawConnections();
        drawParticles(time);
    }

    function animate(time) {
        if (reduceMotion) {
            drawScene(0);
            return;
        }

        /* تحديد معدل الرسم لتخفيف استهلاك الموارد */
        if (time - lastFrame >= 1000 / 30) {
            lastFrame = time;

            pointer.x += (pointer.targetX - pointer.x) * 0.025;
            pointer.y += (pointer.targetY - pointer.y) * 0.025;

            canvas.style.transform =
                `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;

            drawScene(time);
        }

        animationFrame = requestAnimationFrame(animate);
    }

    window.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;

        pointer.targetX =
            (event.clientX / window.innerWidth - 0.5) * -10;

        pointer.targetY =
            (event.clientY / window.innerHeight - 0.5) * -10;
    }, { passive: true });

    window.addEventListener("resize", resizeCanvas, { passive: true });

    resizeCanvas();

    if (!reduceMotion) {
        animationFrame = requestAnimationFrame(animate);
    }
})();
