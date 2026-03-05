// ═══════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ═══════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// ═══════════════════════════════════════════
// NAVBAR SCROLL EFFECT
// ═══════════════════════════════════════════
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ═══════════════════════════════════════════
// SCROLL REVEAL (IntersectionObserver)
// ═══════════════════════════════════════════
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay based on element position among siblings
                const siblings = entry.target.parentElement
                    ? Array.from(entry.target.parentElement.children).filter(
                          (el) => el.classList.contains('reveal')
                      )
                    : [];
                const i = siblings.indexOf(entry.target);
                const delay = Math.min(i * 60, 400);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
    }
);

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});

// ═══════════════════════════════════════════
// ACTIVE NAV LINK ON SCROLL
// ═══════════════════════════════════════════
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ═══════════════════════════════════════════
// TYPING EFFECT
// ═══════════════════════════════════════════
const typingText = document.getElementById('typingText');
const texts = [
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex < currentText.length) {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, 80);
    } else if (isDeleting && charIndex > 0) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, 40);
    } else {
        isDeleting = !isDeleting;

        if (!isDeleting) {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 600);
        } else {
            setTimeout(typeEffect, 1800);
        }
    }
}

typeEffect();

// ═══════════════════════════════════════════
// PROJECT PAGINATION
// ═══════════════════════════════════════════
const projectsPerPage = 3;
let currentPage = 1;
const cards = document.querySelectorAll('.project-card');
const totalPages = Math.ceil(cards.length / projectsPerPage);

function showPage(page) {
    const start = (page - 1) * projectsPerPage;
    const end = start + projectsPerPage;

    cards.forEach((card, index) => {
        if (index >= start && index < end) {
            card.style.display = 'block';
            // Staggered entrance
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, (index - start) * 80);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
        }
    });

    renderPagination();
}

function renderPagination() {
    const container = document.getElementById('pagination');
    if (!container || totalPages <= 1) return;

    container.innerHTML = '';

    // Previous
    const prev = document.createElement('button');
    prev.className = 'nav-btn';
    prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prev.disabled = currentPage === 1;
    prev.onclick = () => changePage(-1);
    container.appendChild(prev);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn';
        btn.textContent = i;
        if (i === currentPage) btn.classList.add('active');
        btn.onclick = () => {
            currentPage = i;
            showPage(i);
        };
        container.appendChild(btn);
    }

    // Next
    const next = document.createElement('button');
    next.className = 'nav-btn';
    next.innerHTML = '<i class="fas fa-chevron-right"></i>';
    next.disabled = currentPage === totalPages;
    next.onclick = () => changePage(1);
    container.appendChild(next);
}

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        showPage(currentPage);
    }
}

// Init pagination
document.addEventListener('DOMContentLoaded', () => {
    cards.forEach((card) => {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    showPage(1);
});
