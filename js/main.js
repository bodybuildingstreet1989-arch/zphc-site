/* ========================================
   ZPHC Official Website - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initButtonEffects();
    initScrollAnimations();
});

/* ========================================
   Particle Animation System
   ======================================== */

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning and timing
    const randomX = Math.random() * 100;
    const randomDelay = Math.random() * 8;
    const randomDuration = 6 + Math.random() * 4;
    const randomSize = 2 + Math.random() * 4;
    
    // Random color variation
    const colors = [
        'rgba(0, 212, 255, 0.8)',
        'rgba(0, 102, 255, 0.8)',
        'rgba(255, 255, 255, 0.6)',
        'rgba(0, 212, 255, 0.6)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        left: ${randomX}%;
        width: ${randomSize}px;
        height: ${randomSize}px;
        background: ${randomColor};
        animation-delay: ${randomDelay}s;
        animation-duration: ${randomDuration}s;
        box-shadow: 0 0 ${randomSize * 2}px ${randomColor};
    `;
    
    container.appendChild(particle);
}

/* ========================================
   Button Effects
   ======================================== */

function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        // Ripple effect on click
        btn.addEventListener('click', function(e) {
            createRipple(e, this);
        });
        
        // Magnetic effect on hover (subtle)
        btn.addEventListener('mousemove', function(e) {
            magneticEffect(e, this);
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function createRipple(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function magneticEffect(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Subtle magnetic pull effect
    const moveX = x * 0.05;
    const moveY = y * 0.05;
    
    button.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

// Add ripple animation to stylesheet dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* ========================================
   Scroll Animations
   ======================================== */

function initScrollAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.btn, .feature, .info-card').forEach(el => {
        observer.observe(el);
    });
}

/* ========================================
   Utility: Smooth scroll for anchor links
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

/* ========================================
   Performance: Debounce utility
   ======================================== */

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

/* ========================================
   Easter Egg: Konami Code
   ======================================== */

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(easterEggStyle);

/* ========================================
   Console Message
   ======================================== */

console.log('%c ZPHC Official ', 'background: linear-gradient(135deg, #0066ff, #00d4ff); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
