// ================================
// MOBILE MENU FUNCTIONALITY
// ================================

// Mobile menu toggle functionality
document.getElementById('mobileToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileToggle');
    
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        const toggle = document.getElementById('mobileToggle');
        
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileToggle');
    const nav = document.querySelector('nav');
    
    // Check if the clicked element is outside the navigation
    if (!nav.contains(event.target)) {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
    }
});

// ================================
// SMOOTH SCROLLING
// ================================

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// HEADER SCROLL EFFECTS
// ================================

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ================================
// INTERSECTION OBSERVER ANIMATIONS
// ================================

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ================================
// RESPONSIVE IMAGE LOADING
// ================================

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// TOUCH AND SWIPE HANDLERS
// ================================

// Touch handling for mobile menu
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    
    // Close mobile menu on upward swipe
    if (touchStartY - touchEndY > 50) {
        const navMenu = document.getElementById('navMenu');
        const toggle = document.getElementById('mobileToggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            toggle.classList.remove('active');
        }
    }
});

// ================================
// WINDOW RESIZE HANDLERS
// ================================

// Handle window resize events
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileToggle');
    
    // Close mobile menu when resizing to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
    }
});

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
}, 10);

// Replace the original scroll handler
window.removeEventListener('scroll', window.addEventListener);
window.addEventListener('scroll', optimizedScrollHandler);

// ================================
// ACCESSIBILITY IMPROVEMENTS
// ================================

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    const navMenu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileToggle');
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
    }
    
    // Toggle mobile menu with Enter/Space on hamburger
    if ((e.key === 'Enter' || e.key === ' ') && e.target === toggle) {
        e.preventDefault();
        navMenu.classList.toggle('active');
        toggle.classList.toggle('active');
    }
});

// Focus management for mobile menu
document.getElementById('mobileToggle').addEventListener('focus', function() {
    this.style.outline = '2px solid #ff6b6b';
});

document.getElementById('mobileToggle').addEventListener('blur', function() {
    this.style.outline = 'none';
});

// ================================
// STATS COUNTER ANIMATION
// ================================

// Animate numbers in stats section
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.innerHTML = current + (element.innerHTML.includes('+') ? '+' : '') + 
                           (element.innerHTML.includes('%') ? '%' : '') +
                           (element.innerHTML.includes('/') ? '/7' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observer for stats animation
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('500')) {
                    animateValue(stat, 0, 500, 2000);
                } else if (text.includes('98')) {
                    animateValue(stat, 0, 98, 2000);
                } else if (text.includes('15')) {
                    animateValue(stat, 0, 15, 1500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

console.log('TechVision Solutions - Interactive features loaded successfully!');