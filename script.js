// Custom cursor functionality
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.cursorOutline = document.getElementById('cursor-outline');
        this.init();
    }

    init() {
        // Only initialize cursor on non-mobile devices
        if (window.innerWidth > 768) {
            this.bindEvents();
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', this.updateCursor.bind(this));
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .social-link, .nav-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', this.addHoverEffect.bind(this));
            element.addEventListener('mouseleave', this.removeHoverEffect.bind(this));
        });
    }

    updateCursor(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        this.cursor.style.left = x + 'px';
        this.cursor.style.top = y + 'px';
        
        // Smooth follow for outline
        setTimeout(() => {
            this.cursorOutline.style.left = (x - 16) + 'px';
            this.cursorOutline.style.top = (y - 16) + 'px';
        }, 50);
    }

    addHoverEffect() {
        this.cursor.classList.add('cursor-hover');
        this.cursorOutline.classList.add('cursor-outline-hover');
    }

    removeHoverEffect() {
        this.cursor.classList.remove('cursor-hover');
        this.cursorOutline.classList.remove('cursor-outline-hover');
    }
}

// Smooth scrolling navigation
class SmoothNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.bindNavigation();
        this.bindMobileMenu();
    }

    bindNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
    }

    bindMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.add('hidden');
    }
}

// Scroll animations using Intersection Observer
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.skillBarsAnimated = false;
        this.init();
    }

    init() {
        this.createObserver();
        this.observeElements();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skill bars when skills section is visible (only once)
                    if (!this.skillBarsAnimated && entry.target.closest('#skills')) {
                        this.skillBarsAnimated = true;
                        this.animateSkillBars();
                    }
                }
            });
        }, this.observerOptions);
    }

    observeElements() {
        const animatedElements = document.querySelectorAll('.section-content');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            bar.style.transition = 'none';
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-out';
                bar.style.width = targetWidth;
            }, index * 150 + 100);
        });
    }
}

// Navbar background on scroll
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('nav');
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 50) {
            this.navbar.classList.add('bg-black/80');
            this.navbar.classList.remove('bg-black/10');
        } else {
            this.navbar.classList.add('bg-black/10');
            this.navbar.classList.remove('bg-black/80');
        }
    }
}

// Parallax effect for hero section
class ParallaxEffect {
    constructor() {
        this.heroSection = document.getElementById('home');
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (this.heroSection) {
            this.heroSection.style.transform = `translateY(${rate}px)`;
        }
    }
}

// Form handling
class FormHandler {
    constructor() {
        this.form = document.querySelector('form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const name = formData.get('name') || this.form.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.form.querySelector('input[type="email"]').value;
        const message = formData.get('message') || this.form.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            this.showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showNotification('Thank you! Your message has been sent.', 'success');
        this.form.reset();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white transition-all duration-300 ${
            type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Loading animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', this.hideLoading.bind(this));
    }

    hideLoading() {
        // Add a slight delay for smooth transition
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 500);
    }
}

// Typing animation for hero text
class TypingAnimation {
    constructor() {
        this.texts = [
            'Machine Learning Developer',
            'Web Developer',
            'Cloud Computing Enthusiast',
            'Binus University Student'
        ];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        const heroSubtitle = document.querySelector('#home p');
        if (heroSubtitle) {
            this.animateText(heroSubtitle);
        }
    }

    animateText(element) {
        let currentText = '';
        let isDeleting = false;
        let textIndex = 0;
        let charIndex = 0;

        const type = () => {
            const fullText = this.texts[textIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            element.textContent = currentText;
            
            let typeSpeed = isDeleting ? 100 : 150;
            
            if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % this.texts.length;
                typeSpeed = 500; // Pause before next text
            }
            
            setTimeout(type, typeSpeed);
        };
        
        // Start the animation after a delay
        setTimeout(type, 1000);
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.preloadImages();
        this.lazyLoadImages();
        this.optimizeScrollEvents();
    }

    preloadImages() {
        const imagesToPreload = [
            // Add any critical images here
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    optimizeScrollEvents() {
        let ticking = false;
        
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-based animations here
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }
}
// ============================
// ANTIGRAVITY EFFECTS
// ============================

// Antigravity Particle System — particles float upward and react to mouse
class AntigravityParticles {
    constructor() {
        this.canvas = document.getElementById('antigravity-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -1000, y: -1000, radius: 150 };
        this.particleCount = 80;
        this.connectionDistance = 120;
        this.running = true;

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        const section = this.canvas.parentElement;
        this.canvas.width = section.offsetWidth;
        this.canvas.height = section.offsetHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: -(Math.random() * 0.8 + 0.2), // float UPWARD (antigravity!)
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
                pulsePhase: Math.random() * Math.PI * 2,
                // Each particle has a subtle color tint
                hue: Math.random() > 0.7 ? 220 + Math.random() * 40 : 0 // some blue-ish, most white
            });
        }
    }

    bindEvents() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });

        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        // Pause when not visible for performance
        const observer = new IntersectionObserver((entries) => {
            this.running = entries[0].isIntersecting;
        }, { threshold: 0.1 });
        observer.observe(this.canvas);
    }

    animate() {
        if (!this.running) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((p, i) => {
            // Antigravity: float upward
            p.x += p.vx;
            p.y += p.vy;

            // Pulse glow
            p.pulsePhase += p.pulseSpeed;
            const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;

            // Mouse repulsion — particles flee from cursor
            const dx = p.x - this.mouse.x;
            const dy = p.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.mouse.radius) {
                const force = (this.mouse.radius - dist) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);
                p.x += Math.cos(angle) * force * 3;
                p.y += Math.sin(angle) * force * 3;
            }

            // Wrap around edges (respawn at bottom when floating to top)
            if (p.y < -10) {
                p.y = this.canvas.height + 10;
                p.x = Math.random() * this.canvas.width;
            }
            if (p.x < -10) p.x = this.canvas.width + 10;
            if (p.x > this.canvas.width + 10) p.x = -10;

            // Draw particle with glow
            const currentOpacity = p.opacity * pulse;
            if (p.hue > 0) {
                this.ctx.fillStyle = `hsla(${p.hue}, 60%, 70%, ${currentOpacity})`;
            } else {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
            this.ctx.fill();

            // Outer glow
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius * pulse * 3, 0, Math.PI * 2);
            const glowGrad = this.ctx.createRadialGradient(
                p.x, p.y, 0, p.x, p.y, p.radius * pulse * 3
            );
            if (p.hue > 0) {
                glowGrad.addColorStop(0, `hsla(${p.hue}, 60%, 70%, ${currentOpacity * 0.3})`);
            } else {
                glowGrad.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.3})`);
            }
            glowGrad.addColorStop(1, 'transparent');
            this.ctx.fillStyle = glowGrad;
            this.ctx.fill();

            // Draw connections between nearby particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const cdx = p.x - other.x;
                const cdy = p.y - other.y;
                const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

                if (cdist < this.connectionDistance) {
                    const lineOpacity = (1 - cdist / this.connectionDistance) * 0.15;
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Magnetic repulsion on interactive elements — elements push away from cursor
class MagneticElements {
    constructor() {
        this.elements = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.elements = document.querySelectorAll('.btn-primary, .btn-secondary, .social-link, .skill-icon');
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.updateElements();
        });
    }

    updateElements() {
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elX = rect.left + rect.width / 2;
            const elY = rect.top + rect.height / 2;
            
            const dx = this.mouse.x - elX;
            const dy = this.mouse.y - elY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 200;
            
            if (dist < maxDist) {
                // Inverse magnetic — push AWAY from cursor (antigravity)
                const force = (maxDist - dist) / maxDist;
                const moveX = -(dx / dist) * force * 8;
                const moveY = -(dy / dist) * force * 8;
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
                el.style.transition = 'transform 0.2s ease-out';
            } else {
                el.style.transform = '';
                el.style.transition = 'transform 0.4s ease-out';
            }
        });
    }
}

// Floating levitation for cards — gentle bobbing like zero gravity
class FloatingCards {
    constructor() {
        this.init();
    }

    init() {
        const skillCards = document.querySelectorAll('.skill-card');
        const projectCards = document.querySelectorAll('.project-card');
        
        // Apply staggered floating animations
        skillCards.forEach((card, i) => {
            card.classList.add('antigravity-float');
            card.style.animationDelay = `${i * 0.7}s`;
        });

        projectCards.forEach((card, i) => {
            card.classList.add('antigravity-float');
            card.style.animationDelay = `${i * 0.5}s`;
        });
    }
}

// ============================
// ENHANCED ANTIGRAVITY EFFECTS
// ============================

// Gravity Warp on Scroll — sections bounce-in from above with rubber-band physics
class GravityWarpScroll {
    constructor() {
        this.init();
    }

    init() {
        // Target section headings and major content blocks
        const warpElements = document.querySelectorAll(
            '#about .section-content, #skills .skill-card, #projects .project-card, #contact .section-content'
        );

        warpElements.forEach((el, i) => {
            el.classList.add('gravity-warp-ready');
            el.style.animationDelay = `${i * 0.1}s`;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove section-content visible to avoid conflict
                    entry.target.classList.remove('visible');
                    entry.target.classList.add('gravity-warp-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

        warpElements.forEach(el => observer.observe(el));
    }
}

// Text Disintegrate & Reform — headings explode into particles and reform on scroll
class TextDisintegrate {
    constructor() {
        this.animations = [];
        this.init();
    }

    init() {
        const headings = document.querySelectorAll(
            '#about h2 span, #skills h2 span, #projects h2 span, #contact h2 span'
        );

        headings.forEach(heading => {
            this.setupHeading(heading);
        });
    }

    setupHeading(heading) {
        const wrapper = document.createElement('div');
        wrapper.className = 'text-disintegrate-wrapper';
        heading.parentNode.insertBefore(wrapper, heading);
        wrapper.appendChild(heading);
        heading.classList.add('disintegrate-text');

        const canvas = document.createElement('canvas');
        canvas.className = 'text-disintegrate-canvas';
        wrapper.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animating = false;
        let reforming = false;
        let hasPlayed = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasPlayed) {
                    hasPlayed = true;
                    startDisintegrate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(wrapper);

        const startDisintegrate = () => {
            const rect = heading.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            canvas.width = wrapperRect.width;
            canvas.height = wrapperRect.height;

            // Read text pixels
            ctx.font = window.getComputedStyle(heading).font;
            ctx.fillStyle = '#ffffff';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(heading.textContent, canvas.width / 2, canvas.height / 2);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            particles = [];

            // Sample pixels to create particles
            const step = 3;
            for (let y = 0; y < canvas.height; y += step) {
                for (let x = 0; x < canvas.width; x += step) {
                    const i = (y * canvas.width + x) * 4;
                    if (imageData.data[i + 3] > 128) {
                        particles.push({
                            x, y,
                            origX: x, origY: y,
                            vx: (Math.random() - 0.5) * 8,
                            vy: -(Math.random() * 6 + 2), // float upward (antigravity)
                            alpha: 1,
                            size: Math.random() * 2 + 1,
                            color: `rgba(${imageData.data[i]}, ${imageData.data[i+1]}, ${imageData.data[i+2]}, `
                        });
                    }
                }
            }

            // Start by showing particles scattered
            wrapper.classList.add('disintegrating');
            animating = true;
            reforming = false;

            // After scattering, reform
            setTimeout(() => {
                reforming = true;
                setTimeout(() => {
                    animating = false;
                    wrapper.classList.remove('disintegrating');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }, 1200);
            }, 800);

            animateParticles();
        };

        const animateParticles = () => {
            if (!animating) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                if (reforming) {
                    // Reform: pull back to original position
                    p.x += (p.origX - p.x) * 0.08;
                    p.y += (p.origY - p.y) * 0.08;
                    p.alpha = Math.min(1, p.alpha + 0.03);
                } else {
                    // Disintegrate: scatter outward + upward
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vx *= 0.97;
                    p.vy *= 0.97;
                    p.alpha = Math.max(0, p.alpha - 0.015);
                }

                ctx.fillStyle = p.color + p.alpha + ')';
                ctx.fillRect(p.x, p.y, p.size, p.size);
            });

            requestAnimationFrame(animateParticles);
        };
    }
}

// Zero-G Bubbles — persistent floating bubbles across the entire page
class ZeroGBubbles {
    constructor() {
        this.canvas = document.getElementById('zerog-bubbles-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.bubbles = [];
        this.bubbleCount = 25;
        this.init();
    }

    init() {
        this.resize();
        this.createBubbles();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createBubbles() {
        this.bubbles = [];
        for (let i = 0; i < this.bubbleCount; i++) {
            this.bubbles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 30 + 10,
                vy: -(Math.random() * 0.3 + 0.05), // float up slowly
                vx: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.08 + 0.02,
                wobbleSpeed: Math.random() * 0.02 + 0.005,
                wobblePhase: Math.random() * Math.PI * 2,
                wobbleAmp: Math.random() * 15 + 5,
                hue: Math.random() > 0.5 ? 220 : 260 // blue or purple tint
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.bubbles.forEach(b => {
            b.y += b.vy;
            b.wobblePhase += b.wobbleSpeed;
            const wobbleX = Math.sin(b.wobblePhase) * b.wobbleAmp;

            // Respawn at bottom
            if (b.y + b.radius < -50) {
                b.y = this.canvas.height + b.radius + 20;
                b.x = Math.random() * this.canvas.width;
            }

            const drawX = b.x + wobbleX;

            // Main bubble
            const gradient = this.ctx.createRadialGradient(
                drawX, b.y, 0,
                drawX, b.y, b.radius
            );
            gradient.addColorStop(0, `hsla(${b.hue}, 40%, 70%, ${b.opacity * 1.5})`);
            gradient.addColorStop(0.5, `hsla(${b.hue}, 30%, 60%, ${b.opacity})`);
            gradient.addColorStop(1, `hsla(${b.hue}, 20%, 50%, 0)`);

            this.ctx.beginPath();
            this.ctx.arc(drawX, b.y, b.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Highlight / specular
            this.ctx.beginPath();
            this.ctx.arc(drawX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 2})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Gravitational Lens — dynamic radial glow follows mouse on project cards
class GravitationalLens {
    constructor() {
        this.init();
    }

    init() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.classList.add('gravitational-lens');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--lens-x', `${x}%`);
                card.style.setProperty('--lens-y', `${y}%`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--lens-x', '50%');
                card.style.setProperty('--lens-y', '50%');
            });
        });
    }
}

// Navbar Antigravity — magnetic nav links, zero-G bounce on scroll, floating particles + enhanced effects
class NavbarAntigravity {
    constructor() {
        this.navbar = document.querySelector('nav');
        if (!this.navbar) return;
        this.navLinks = this.navbar.querySelectorAll('.nav-link');
        this.logo = this.navbar.querySelector('.text-xl');
        this.lastScrollY = window.scrollY;
        this.velocity = 0;
        this.currentOffset = 0;
        this.particles = [];
        this.init();
    }

    init() {
        this.setupMagneticLinks();
        this.setupScrollBounce();
        this.setupNavParticles();
        this.setupWeightlessFloat();
        this.setupGravityWaveRipple();
        this.setupAntiGravityUnderline();
        this.setupNavbarGlassWarp();
    }

    // Nav links magnetically float away from cursor
    setupMagneticLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const linkCenterX = rect.left + rect.width / 2;
                const linkCenterY = rect.top + rect.height / 2;
                const dx = e.clientX - linkCenterX;
                const dy = e.clientY - linkCenterY;

                const moveX = dx * 0.3;
                const moveY = dy * 0.4;
                link.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
                link.style.textShadow = '0 0 12px rgba(255,255,255,0.4)';
                link.style.transition = 'transform 0.2s ease-out, text-shadow 0.2s ease';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
                link.style.textShadow = '';
                link.style.transition = 'transform 0.4s ease-out, text-shadow 0.4s ease';
            });
        });

        if (this.logo) {
            this.logo.addEventListener('mouseenter', () => {
                this.logo.style.transform = 'translateY(-3px) scale(1.05)';
                this.logo.style.filter = 'drop-shadow(0 4px 12px rgba(255,255,255,0.2))';
                this.logo.style.transition = 'all 0.3s ease-out';
            });
            this.logo.addEventListener('mouseleave', () => {
                this.logo.style.transform = '';
                this.logo.style.filter = '';
                this.logo.style.transition = 'all 0.5s ease-out';
            });
        }
    }

    // Navbar bounces with rubber-band physics on scroll
    setupScrollBounce() {
        let animating = false;

        const updateBounce = () => {
            const scrollY = window.scrollY;
            const delta = scrollY - this.lastScrollY;
            this.lastScrollY = scrollY;

            this.velocity += delta * 0.15;
            this.velocity -= this.currentOffset * 0.08;
            this.velocity *= 0.85;
            this.currentOffset += this.velocity;
            this.currentOffset = Math.max(-12, Math.min(12, this.currentOffset));

            if (Math.abs(this.velocity) > 0.01 || Math.abs(this.currentOffset) > 0.01) {
                this.navbar.style.transform = `translateY(${this.currentOffset}px)`;
                requestAnimationFrame(updateBounce);
            } else {
                this.currentOffset = 0;
                this.velocity = 0;
                this.navbar.style.transform = '';
                animating = false;
            }
        };

        window.addEventListener('scroll', () => {
            if (!animating) {
                animating = true;
                requestAnimationFrame(updateBounce);
            }
        }, { passive: true });
    }

    // Floating micro-particles inside the navbar on mouse move
    setupNavParticles() {
        this.navbar.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.6) return;

            const rect = this.navbar.getBoundingClientRect();
            const particle = document.createElement('div');
            particle.className = 'nav-antigravity-particle';
            particle.style.left = (e.clientX - rect.left) + 'px';
            particle.style.top = (e.clientY - rect.top) + 'px';

            this.navbar.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        });
    }

    // NEW: Weightless idle float — each nav link gently bobs at different rhythms
    setupWeightlessFloat() {
        this.navLinks.forEach((link, i) => {
            link.classList.add('nav-weightless-float');
            link.style.animationDelay = `${i * 0.6}s`;
            link.style.animationDuration = `${3 + i * 0.5}s`;
        });

        // Logo also floats gently
        if (this.logo) {
            this.logo.classList.add('nav-weightless-float');
            this.logo.style.animationDelay = '0s';
            this.logo.style.animationDuration = '4s';
        }
    }

    // NEW: Gravity wave ripple — clicking a nav link sends a shockwave across the navbar
    setupGravityWaveRipple() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const rect = this.navbar.getBoundingClientRect();
                const ripple = document.createElement('div');
                ripple.className = 'nav-gravity-ripple';
                ripple.style.left = (e.clientX - rect.left) + 'px';
                ripple.style.top = (e.clientY - rect.top) + 'px';

                this.navbar.appendChild(ripple);

                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 1200);
            });
        });
    }

    // NEW: Anti-gravity underline — hover creates a floating glow line above the link
    setupAntiGravityUnderline() {
        this.navLinks.forEach(link => {
            const glowLine = document.createElement('span');
            glowLine.className = 'nav-antigravity-glow-line';
            link.appendChild(glowLine);
        });
    }

    // NEW: Navbar glass warp — background subtly warps/distorts following cursor
    setupNavbarGlassWarp() {
        this.navbar.addEventListener('mousemove', (e) => {
            const rect = this.navbar.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            this.navbar.style.setProperty('--warp-x', `${x}%`);
            this.navbar.style.setProperty('--warp-y', `${y}%`);
        });

        this.navbar.addEventListener('mouseleave', () => {
            this.navbar.style.setProperty('--warp-x', '50%');
            this.navbar.style.setProperty('--warp-y', '50%');
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new CustomCursor();
    new SmoothNavigation();
    new ScrollAnimations();
    new NavbarScroll();
    new ParallaxEffect();
    new FormHandler();
    new LoadingAnimation();
    new PerformanceOptimizer();

    // Antigravity features
    new AntigravityParticles();
    new MagneticElements();
    new FloatingCards();

    // Enhanced Antigravity features
    new GravityWarpScroll();
    new TextDisintegrate();
    new ZeroGBubbles();
    new GravitationalLens();
    new NavbarAntigravity();
    
    // Smooth page entrance - body starts visible via CSS,
    // briefly fades for a smooth entrance effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

    // Bouncing character animation
    const character = document.querySelector(".character");
    const container = document.querySelector("#about");

    if (character && container) {
        let posX = 10;
        let posY = 10;
        let velocityX = 2;
        let velocityY = 2;

        const moveCharacter = () => {
            const containerRect = container.getBoundingClientRect();
            const characterRect = character.getBoundingClientRect();

            posX += velocityX;
            posY += velocityY;

            if (posX + characterRect.width >= containerRect.width || posX <= 0) {
                velocityX *= -1;
            }
            if (posY + characterRect.height >= containerRect.height || posY <= 0) {
                velocityY *= -1;
            }

            character.style.left = `${posX}px`;
            character.style.top = `${posY}px`;

            requestAnimationFrame(moveCharacter);
        };

        moveCharacter();
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const cursor = document.getElementById('cursor');
        const cursorOutline = document.getElementById('cursor-outline');
        if (cursor) cursor.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    } else {
        const cursor = document.getElementById('cursor');
        const cursorOutline = document.getElementById('cursor-outline');
        if (cursor) cursor.style.display = 'block';
        if (cursorOutline) cursorOutline.style.display = 'block';
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

