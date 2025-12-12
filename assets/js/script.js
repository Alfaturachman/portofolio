// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll animation
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document
    .querySelectorAll('.timeline-item, .project-card, .skill-card')
    .forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Pagination untuk Projects
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
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        }
    });

    renderPagination();
}

function renderPagination() {
    const container = document.getElementById('pagination');
    if (!container || totalPages <= 1) return; // Tidak perlu pagination jika hanya satu halaman

    container.innerHTML = '';

    // Previous Button
    const prev = document.createElement('button');
    prev.className = 'nav-btn';
    prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prev.disabled = currentPage === 1;
    prev.onclick = () => changePage(-1);
    container.appendChild(prev);

    // Page Numbers
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

    // Next Button
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

// Initialize pagination on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initially hide all cards
    cards.forEach((card, index) => {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    showPage(1);
});

// Typing Text Effect
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
        // Mengetik
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, 100); // Kecepatan mengetik
    } else if (isDeleting && charIndex > 0) {
        // Menghapus
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, 50); // Kecepatan menghapus
    } else {
        // Ganti arah (mengetik/menghapus)
        isDeleting = !isDeleting;

        if (!isDeleting) {
            // Pindah ke teks berikutnya
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500); // Jeda sebelum mengetik teks baru
        } else {
            setTimeout(typeEffect, 1000); // Jeda sebelum mulai menghapus
        }
    }
}

// Start typing effect
typeEffect();

// Create particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    particlesContainer.appendChild(particle);
}
