    // (Removed duplicate/old dark mode toggle logic. See updated version below.)

    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const toggleIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        toggleIcon.classList.toggle('fa-bars');
        toggleIcon.classList.toggle('fa-times');
    });

    // Close menu on link click
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            toggleIcon.classList.add('fa-bars');
            toggleIcon.classList.remove('fa-times');
        });
    });

    // Close menu when clicking outside
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('navbar-overlay');
        overlay.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.classList.remove('fa-times');
            document.body.style.overflow = '';
            removeOverlay();
        });
        document.body.appendChild(overlay);
    }

    function removeOverlay() {
        const overlay = document.querySelector('.navbar-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    // Add scrolled class to header on scroll
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Header scroll effect - updated for transparent on home section
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) { // Changed from homeSectionHeight - 100 to just 10px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set active link based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.navbar a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Testimonial Slider Functionality
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    let currentIndex = 0;
    let slideWidth = slides[0].clientWidth;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Update slider position
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Button events
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-slide (optional)
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover (if using auto-slide)
    sliderTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 4000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = slides[0].clientWidth;
        updateSlider();
    });

    document.addEventListener('DOMContentLoaded', function () {
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="button-text">Sending...</span>' +
                '<span class="button-icon"><i class="fas fa-spinner fa-spin"></i></span>' +
                '<span class="glow"></span>';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully! Redirecting...';
                    formStatus.className = 'form-feedback success';
                    contactForm.reset();

                    submitButton.classList.add('success-pulse');
                    submitButton.innerHTML = '<span class="button-text">Sent!</span>' +
                        '<span class="button-icon"><i class="fas fa-check"></i></span>' +
                        '<span class="glow"></span>';

                    setTimeout(() => {
                        const redirectURL = contactForm.querySelector('[name="_redirect"]')?.value;
                        if (redirectURL) {
                            window.location.href = redirectURL;
                        }
                    }, 2000);
                } else {
                    const result = await response.json();
                    throw new Error(result.errors?.[0]?.message || 'Unknown error');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                formStatus.textContent = 'Error sending message: ' + error.message;
                formStatus.className = 'form-feedback error';

                submitButton.classList.add('error-shake');
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span class="button-text">Try Again</span>' +
                        '<span class="button-icon"><i class="fas fa-paper-plane"></i></span>' +
                        '<span class="glow"></span>';
                    submitButton.classList.remove('error-shake');
                }, 1000);
            }
        });

        // Reset floating labels when form is reset
        contactForm.addEventListener('reset', function () {
            document.querySelectorAll('.floating-input').forEach(input => {
                if (input.value === '') {
                    input.nextElementSibling.style.top = '1.5rem';
                    input.nextElementSibling.style.fontSize = '1rem';
                    input.nextElementSibling.style.opacity = '0.7';
                }
            });
        });
    });

    // Footer JavaScript (Add to your existing script.js)
    document.addEventListener('DOMContentLoaded', function () {
        // Update copyright year automatically
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Smooth scroll for footer links
        document.querySelectorAll('.footer-links a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });

    // Dark Mode Toggle - Updated Version
    const darkMode = document.getElementById('darkMode-icon');
    darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');

        // Standardize storage to use 'enabled'/'disabled'
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

        // Update icon
        darkMode.classList.toggle('fa-sun');
        darkMode.classList.toggle('fa-moon');

        // Update all links to blog page
        updateBlogLinks();
    });

    // Check for saved dark mode preference - Updated
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkMode.classList.add('fa-sun');
        darkMode.classList.remove('fa-moon');
    } else {
        // Ensure default is set
        localStorage.setItem('darkMode', 'disabled');
    }

    // Update blog links function
    function updateBlogLinks() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        document.querySelectorAll('a[href*="blog.html"]').forEach(link => {
            const url = new URL(link.href, window.location.origin);
            url.searchParams.set('theme', isDarkMode ? 'dark' : 'light');
            link.href = url.toString();
        });
    }

    // Initialize links on page load
    document.addEventListener('DOMContentLoaded', function () {
        updateBlogLinks();
    });

    // Check for theme parameter on home page load
    document.addEventListener('DOMContentLoaded', function () {
        const urlParams = new URLSearchParams(window.location.search);
        const urlTheme = urlParams.get('theme');

        if (urlTheme === 'dark') {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            darkMode.classList.add('fa-sun');
            darkMode.classList.remove('fa-moon');
        } else if (urlTheme === 'light') {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            darkMode.classList.remove('fa-sun');
            darkMode.classList.add('fa-moon');
        }
    });

    // Animation on scroll for About Section
    window.addEventListener('scroll', () => {
        const aboutSection = document.querySelector('.about');
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (aboutPosition < screenPosition) {
            aboutSection.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
