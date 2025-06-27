// Custom cursor with hover effects
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .form-group input, .form-group textarea');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Enhanced mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate menu items
    const menuItems = navLinks.querySelectorAll('li');
    menuItems.forEach((item, index) => {
        item.style.animation = navLinks.classList.contains('active') 
            ? `slideIn 0.3s ease forwards ${index * 0.1}s`
            : 'none';
    });
});

// Smooth scroll with enhanced animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Add active class to current section
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('active');
            });
            target.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Enhanced navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        navbar.classList.remove('scroll-down');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
    
    // Add scroll progress indicator
    const scrollProgress = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
});


// Enhanced scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .project-card, .section-header, .info-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

// Initial check for elements in view
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Enhanced typing animation for hero section
const heroTitle = document.querySelector('.hero-title');
const lines = heroTitle.querySelectorAll('.line');

lines.forEach((line, index) => {
    const text = line.textContent;
    line.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            line.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Add cursor effect after typing
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            line.appendChild(cursor);
            
            // Remove cursor after delay
            setTimeout(() => cursor.remove(), 1000);
        }
    };
    
    setTimeout(() => {
        typeWriter();
    }, index * 500);
});

// Enhanced parallax effect
const heroSection = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');
const heroShapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    
    // Parallax background
    heroBackground.style.transform = `translateY(${scroll * 0.5}px)`;
    
    // Parallax shapes
    heroShapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scroll * speed}px)`;
    });
});

// Enhanced project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelectorAll('.project-link');
        
        image.style.transform = 'scale(1.1)';
        overlay.style.opacity = '1';
        
        links.forEach((link, index) => {
            link.style.animation = `fadeInUp 0.3s ease forwards ${index * 0.1}s`;
        });
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelectorAll('.project-link');
        
        image.style.transform = 'scale(1)';
        overlay.style.opacity = '0';
        
        links.forEach(link => {
            link.style.animation = 'none';
        });
    });
});

// Enhanced form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
        input.parentElement.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('active');
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Add ripple effect on click
    input.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        input.parentElement.appendChild(ripple);
        
        const rect = input.parentElement.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        ripple.addEventListener('animationend', () => ripple.remove());
    });
});



