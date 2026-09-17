document.addEventListener("DOMContentLoaded", () => {

          
/* =====================================================
   NAVBAR
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =====================================================
   NAVEGACIÓN ACTIVA
===================================================== */

const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 200;
        const bottom = top + section.offsetHeight;

        if (
            window.scrollY >= top &&
            window.scrollY < bottom
        ) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


/* =====================================================
   SCROLL SUAVE
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   MENÚ MÓVIL
===================================================== */

const menuButton =
    document.querySelector(".menu-button");

const nav =
    document.querySelector("nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("mobile-open");

    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            nav.classList.remove("mobile-open");
        });

    });

}


/* =====================================================
   PARTICULAS
===================================================== */

const particleContainer =
    document.querySelector(".hero-particles");

if (particleContainer) {

    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("span");

        particle.style.position = "absolute";
        particle.style.width =
            `${Math.random() * 3 + 1}px`;

        particle.style.height =
            particle.style.width;

        particle.style.background = "white";
        particle.style.borderRadius = "50%";
        particle.style.opacity =
            `${Math.random() * .4 + .1}`;

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.animation =
            `particleFloat ${Math.random() * 8 + 5}s infinite ease-in-out`;

        particle.style.animationDelay =
            `${Math.random() * 5}s`;

        particleContainer.appendChild(particle);

    }

}


/* =====================================================
   REVEAL AL HACER SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section, .stat, .skill-card, .gallery-item, .project-showcase, .timeline-item, .terminal"
    );

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform =
        "translateY(45px)";

    element.style.transition =
        "opacity .8s ease, transform .8s ease";

});


const observer =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.opacity = "1";
            entry.target.style.transform =
                "translateY(0)";

            observer.unobserve(entry.target);

        });

    }, {
        threshold: .1
    });


revealElements.forEach(element => {
    observer.observe(element);
});


/* =====================================================
   TERMINAL
===================================================== */

const terminal =
    document.querySelector(".terminal");

const terminalBody =
    document.querySelector(".terminal-body");

const terminalInput =
    document.querySelector(".terminal-input");


if (
    terminal &&
    terminalBody &&
    terminalInput
) {

    function escapeHTML(text) {

        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function output(text) {

        const element =
            document.createElement("div");

        element.className =
            "terminal-output";

        element.innerHTML = text;

        terminalBody.insertBefore(
            element,
            terminalInput.parentElement
        );

    }


    function commandLine(command) {

        const line =
            document.createElement("div");

        line.className =
            "terminal-line";

        line.innerHTML = `
            <span class="terminal-green">
                brayan@portfolio
            </span>
            <span>:</span>
            <span class="terminal-blue">~</span>
            <span>$</span>
            <span class="terminal-command">
                ${escapeHTML(command)}
            </span>
        `;

        terminalBody.insertBefore(
            line,
            terminalInput.parentElement
        );

    }


    function execute(command) {

        const cmd =
            command.trim().toLowerCase();

        if (!cmd) {
            return;
        }

        commandLine(cmd);

        switch (cmd) {

            case "help":

                output("────────────────────────────────");

                output("<strong>about</strong> — Información personal");

                output("<strong>skills</strong> — Tecnologías");

                output("<strong>project</strong> — Proyecto");

                output("<strong>education</strong> — Formación");

                output("<strong>contact</strong> — Contacto");

                output("<strong>clear</strong> — Limpiar");

                break;


            case "about":

                output(
                    "Brayan Cruz — estudiante de Desarrollo de Software."
                );

                output(
                    "Programación · Bases de datos · Desarrollo web"
                );

                break;


            case "skills":

                output(
                    "C# · JavaScript · HTML5 · CSS3"
                );

                output(
                    "SQL · SQL Server · MySQL"
                );

                output(
                    "Git · GitHub · VS Code"
                );

                break;


            case "project":

                output(
                    "<strong>Motivation KIngdom</strong>"
                );

                output(
                    "Proyecto destacado del portafolio."
                );

                break;


            case "education":

                output(
                    "Técnico en Ingeniería de Desarrollo de Software."
                );

                break;


            case "contact":

                output(
                    "Revisa la sección de contacto del portafolio."
                );

                break;


            case "whoami":

                output(
                    "brayan@portfolio — software developer"
                );

                break;


            case "clear":

                terminalBody
                    .querySelectorAll(
                        ".terminal-line:not(.terminal-input-line), .terminal-output"
                    )
                    .forEach(element => {
                        element.remove();
                    });

                break;


            default:

                output(
                    `Comando "${escapeHTML(cmd)}" no encontrado.`
                );

                output(
                    "Escribe <strong>help</strong> para ver los comandos."
                );

        }

        terminalBody.scrollTop =
            terminalBody.scrollHeight;

    }


    terminalInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                execute(
                    terminalInput.value
                );

                terminalInput.value = "";

            }

        }
    );


    terminal.addEventListener(
        "click",
        () => terminalInput.focus()
    );

}


/* =====================================================
   PARALLAX DEL HERO
===================================================== */

const hero =
    document.querySelector(".hero");

const profile =
    document.querySelector(".hero-profile");

const code =
    document.querySelector(".hero-code");


if (hero) {

    hero.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width - .5;

            const y =
                (event.clientY - rect.top)
                / rect.height - .5;


            if (profile) {

                profile.style.transform =
                    `translate(${x * 12}px, ${y * 12}px)`;

            }


            if (code) {

                code.style.transform =
                    `translate(${x * -18}px, ${y * -18}px)`;

            }

        }
    );

}


/* =====================================================
   TARJETAS 3D
===================================================== */

const cards =
    document.querySelectorAll(".skill-card");

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y - rect.height / 2)
                / (rect.height / 2)) * -4;

            const rotateY =
                ((x - rect.width / 2)
                / (rect.width / 2)) * 4;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =====================================================
   GALERÍA — TILT
===================================================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {

    item.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                item.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y - rect.height / 2)
                / rect.height) * -3;

            const rotateY =
                ((x - rect.width / 2)
                / rect.width) * 3;

            item.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.01)`;

        }
    );


    item.addEventListener(
        "mouseleave",
        () => {

            item.style.transform = "";

        }
    );

});


/* =====================================================
   BOTONES MAGNÉTICOS
===================================================== */

const magneticButtons =
    document.querySelectorAll(".magnetic");

magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * .15}px, ${y * .15}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* =====================================================
   TECNOLOGÍAS
===================================================== */

const technologies =
    document.querySelectorAll(
        ".technology-cloud span"
    );

const techObserver =
    new IntersectionObserver(entries => {

        if (
            !entries.some(
                entry => entry.isIntersecting
            )
        ) {
            return;
        }

        technologies.forEach(
            (technology, index) => {

                technology.style.opacity = "0";

                technology.style.transform =
                    "translateY(20px)";

                setTimeout(() => {

                    technology.style.transition =
                        ".5s ease";

                    technology.style.opacity = "1";

                    technology.style.transform =
                        "translateY(0)";

                }, index * 70);

            }
        );

        techObserver.disconnect();

    });


const cloud =
    document.querySelector(
        ".technology-cloud"
    );

if (cloud) {
    techObserver.observe(cloud);
}


/* =====================================================
   CURSOR GLOW
===================================================== */

const glow =
    document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "220px";
glow.style.height = "220px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.zIndex = "9999";

glow.style.background =
    "radial-gradient(circle, rgba(255,255,255,.045), transparent 70%)";

glow.style.transform =
    "translate(-50%, -50%)";

glow.style.transition =
    "left .15s ease-out, top .15s ease-out";

document.body.appendChild(glow);


document.addEventListener(
    "mousemove",
    event => {

        glow.style.left =
            `${event.clientX}px`;

        glow.style.top =
            `${event.clientY}px`;

    }
);


/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */

const footer =
    document.querySelector(
        ".footer-content p"
    );

if (footer) {

    footer.textContent =
        `© ${new Date().getFullYear()} Brayan Cruz — Software Developer`;

}


/* =====================================================
   CONSOLA
===================================================== */

console.log(`
          

╔══════════════════════════════════════╗
║                                      ║
║       BRAYAN CRUZ — PORTFOLIO        ║
║                                      ║
║       SOFTWARE DEVELOPER             ║
║                                      ║
║       Type "help" in terminal.       ║
║                                      ║
╚══════════════════════════════════════╝
`);

});
