/* ========================================
   PORTFOLIO — Mateus Gavet
   Interactive scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- NAV SCROLL ---
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Active nav link on scroll
    const observerOptions = { rootMargin: '-40% 0px -55% 0px' };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // --- MOBILE NAV ---
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
    });

    navLinksContainer.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('open');
        });
    });

    // --- TYPING EFFECT ---
    const roles = [
        'Dev FullStack',
        'Android Developer',
        'Python Engineer',
        'Automation Specialist',
        'DevOps Enthusiast',
        'Problem Solver'
    ];
    const typedRole = document.getElementById('typedRole');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeRole() {
        const current = roles[roleIndex];

        if (isDeleting) {
            typedRole.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typedRole.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === current.length) {
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500;
        }

        setTimeout(typeRole, typingDelay);
    }
    typeRole();

    // --- SCROLL ANIMATIONS ---
    const animateElements = document.querySelectorAll('[data-animate]');

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                animateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => animateObserver.observe(el));

    // --- COUNTER ANIMATION ---
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                let current = 0;
                const increment = target / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 50);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- SKILL BAR ANIMATION ---
    const skillBars = document.querySelectorAll('.skill-card__level div');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // --- PROJECT FILTERING ---
    const filterBtns = document.querySelectorAll('.projects__filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach((card, index) => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;

                card.style.transition = 'opacity 0.4s, transform 0.4s';

                if (shouldShow) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- PARALLAX ON HERO GLOWS ---
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        document.querySelectorAll('.hero__glow').forEach((glow, i) => {
            const factor = i === 0 ? 1 : -0.7;
            glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
});
