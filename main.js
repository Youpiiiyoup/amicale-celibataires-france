// Initialize Lucide Icons
lucide.createIcons();

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle (simple version)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', () => {
    // Basic implementation for demo purposes
    if(nav.style.display === 'flex') {
        nav.style.display = 'none';
        mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.backgroundColor = 'white';
        nav.style.padding = '2rem';
        nav.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
    }
    lucide.createIcons();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if(window.innerWidth <= 768 && nav.style.display === 'flex') {
                nav.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }

            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
