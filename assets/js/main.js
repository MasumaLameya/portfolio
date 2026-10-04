/**
 * Gray - Tailwind Personal vCard/Portfolio Template
 * Pure Vanilla JavaScript Implementation
 */

// Function to hide preloader safely
function hidePreloader() {
    const preloader = document.getElementById('preloader') || document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        document.body.classList.add('loaded');
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            preloader.style.pointerEvents = 'none';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 200);
    }
}

// Ensure preloader hides on window load OR DOMContentLoaded OR emergency fallback
window.addEventListener('load', hidePreloader);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hidePreloader, 300);
});
setTimeout(hidePreloader, 800);

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. THEME TOGGLE (DARK / LIGHT)
    // ==========================================
    const themeToggleBtns = document.querySelectorAll('button[aria-label="Toggle theme"], .theme-toggle');
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            try { localStorage.setItem('theme', 'dark'); } catch(e){}
            themeToggleBtns.forEach(btn => btn.textContent = 'Light Version');
        } else {
            document.documentElement.classList.remove('dark');
            try { localStorage.setItem('theme', 'light'); } catch(e){}
            themeToggleBtns.forEach(btn => btn.textContent = 'Dark Version');
        }
    }

    // Initialize Theme
    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem('theme') || 'dark';
    } catch(e){}
    applyTheme(savedTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentIsDark = document.documentElement.classList.contains('dark');
            applyTheme(currentIsDark ? 'light' : 'dark');
        });
    });

    // ==========================================
    // 2. TOGGLE DRAWER MENU
    // ==========================================
    const menuBtn = document.querySelector('.menu-btn');
    const menuCloseBtn = document.querySelector('.menu-close');
    const toggleMenu = document.querySelector('.toggle-menu');

    if (menuBtn && toggleMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu.classList.toggle('show');
        });
    }

    if (menuCloseBtn && toggleMenu) {
        menuCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu.classList.remove('show');
        });
    }

    // Close menu on click outside or escape
    document.addEventListener('click', (e) => {
        if (toggleMenu && toggleMenu.classList.contains('show')) {
            if (!toggleMenu.contains(e.target) && !menuBtn?.contains(e.target)) {
                toggleMenu.classList.remove('show');
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggleMenu && toggleMenu.classList.contains('show')) {
            toggleMenu.classList.remove('show');
        }
    });

    // ==========================================
    // 3. SCROLLSPY & SMOOTH NAVIGATION
    // ==========================================
    const navLinks = document.querySelectorAll('.section-link');
    const sections = document.querySelectorAll('.section');

    function highlightNav() {
        let scrollY = window.pageYOffset;
        let currentSectionId = '';

        sections.forEach(sec => {
            const secTop = sec.offsetTop - 140;
            const secHeight = sec.offsetHeight;
            if (scrollY >= secTop && scrollY < secTop + secHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 40;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // 4. TYPEWRITER EFFECT
    // ==========================================
    const typewriterElement = document.querySelector('[data-testid="typewriter-wrapper"]');
    if (typewriterElement) {
        const words = ['UI & UX Designer', 'Photographer', 'Web Developer', 'Freelancer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.innerHTML = currentWord.substring(0, charIndex - 1) + '<span class="Typewriter__cursor">|</span>';
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.innerHTML = currentWord.substring(0, charIndex + 1) + '<span class="Typewriter__cursor">|</span>';
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 400; // Pause before typing new word
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // ==========================================
    // 5. ANIMATED NUMBER COUNTERS
    // ==========================================
    const counterElements = document.querySelectorAll('.counter');
    const targetValues = [95, 90, 80, 14, 50, 90]; // Matches Photoshoot, Tailwind, SEO, Years, Hours, Projects

    counterElements.forEach((el, idx) => {
        const val = targetValues[idx] || 90;
        el.setAttribute('data-target', val);
        el.textContent = '0';
    });

    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        
        counterElements.forEach(counter => {
            const target = +counter.getAttribute('data-target') || 100;
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quad
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const currentCount = Math.floor(easeProgress * target);
                
                counter.textContent = currentCount;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });

        countersStarted = true;
    }

    const aboutSection = document.getElementById('about');
    if (aboutSection && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                }
            });
        }, { threshold: 0.2 });

        counterObserver.observe(aboutSection);
    } else {
        startCounters();
    }

    // ==========================================
    // 6. PORTFOLIO FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter ul li[data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Set initial active style for 'Show All'
    if (filterButtons.length > 0) {
        filterButtons[0].classList.add('filter-btn-active');
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('filter-btn-active'));
            btn.classList.add('filter-btn-active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.matches(filterValue)) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });

    // ==========================================
    // 7. SWIPER SLIDERS
    // ==========================================
    try {
        if (typeof Swiper !== 'undefined') {
            // Testimonials Swiper
            if (document.querySelector('.testimonial-swiper')) {
                new Swiper('.testimonial-swiper', {
                    slidesPerView: 1,
                    spaceBetween: 24,
                    loop: true,
                    autoplay: {
                        delay: 4500,
                        disableOnInteraction: false,
                    },
                    navigation: {
                        nextEl: '.swiper-testimonial-next',
                        prevEl: '.swiper-testimonial-prev',
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        }
                    }
                });
            }

            // Clients Swiper
            if (document.querySelector('.clients-swiper')) {
                new Swiper('.clients-swiper', {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 36,
                        }
                    }
                });
            }
        }
    } catch(e) {
        console.warn('Swiper initialization skipped:', e);
    }

    // ==========================================
    // 8. CONTACT FORM SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contactform');
    const toast = document.getElementById('toast');

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('button');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="bi bi-arrow-repeat animate-spin inline-block me-2"></i> Sending...';
            }

            // Simulate form submission delay
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                showToast('Thank you! Your message has been sent successfully.');
                contactForm.reset();
            }, 1000);
        });
    }

});
