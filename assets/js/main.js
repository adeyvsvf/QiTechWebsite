// QiTech Solar - Main JavaScript File
// Modern Solar Energy Company Interactive Features

// DOM Elements - will be initialized after DOM loads
let elements = {};

// Initialize DOM elements
function initElements() {
    elements = {
        mobileMenuButton: document.getElementById('mobile-menu-button'),
        mobileMenu: document.getElementById('mobile-menu'),
        contactForm: document.getElementById('contact-form'),
        formMessage: document.getElementById('form-message'),
        projectsGrid: document.getElementById('projects-grid'),
        filterButtons: document.querySelectorAll('.filter-btn'),
        faqItems: document.querySelectorAll('.faq-item'),
        counters: document.querySelectorAll('.counter')
    };
}

// Dark Mode Initialization
class DarkModeManager {
    constructor() {
        this.init();
    }

    init() {
        console.log('Initializing dark mode only...');

        // Ensure dark mode is applied
        this.applyDarkMode();
    }

    applyDarkMode() {
        const html = document.documentElement;

        // Remove any existing theme classes and force dark mode
        html.classList.remove('light');
        html.classList.add('dark');

        console.log('Dark mode applied');
    }
}

// Mobile Menu Management
class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        if (elements.mobileMenuButton && elements.mobileMenu) {
            elements.mobileMenuButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isOpen && 
                    !elements.mobileMenu.contains(e.target) && 
                    !elements.mobileMenuButton.contains(e.target)) {
                    this.close();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });

            // Close menu when clicking on navigation links
            const menuLinks = elements.mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.close();
                });
            });
        }
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        if (elements.mobileMenu) {
            elements.mobileMenu.classList.remove('hidden');
            this.isOpen = true;
            document.body.classList.add('menu-open');
            
            // Animate menu button icon
            if (elements.mobileMenuButton) {
                elements.mobileMenuButton.classList.add('active');
            }
        }
    }

    close() {
        if (elements.mobileMenu) {
            elements.mobileMenu.classList.add('hidden');
            this.isOpen = false;
            document.body.classList.remove('menu-open');
            
            // Reset menu button icon
            if (elements.mobileMenuButton) {
                elements.mobileMenuButton.classList.remove('active');
            }
        }
    }
}

// Contact Form Management
class ContactForm {
    constructor() {
        this.form = elements.contactForm;
        this.message = elements.formMessage;
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupFieldValidation();
        }
    }

    setupFieldValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        if (isRequired && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showMessage('Please correct the errors above.', 'error');
            return;
        }

        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin mr-2"></i>Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        try {
            await this.submitForm();
            this.showMessage('Thank you! Your solar consultation request has been submitted. We\'ll contact you within 24 hours to discuss your energy needs.', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Sorry, there was an error submitting your request. Please try again or call us directly at +234 801 234 5678.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            // Re-initialize icons
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    }

    async submitForm() {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showMessage(text, type) {
        if (!this.message) return;
        
        this.message.className = `p-4 rounded-lg text-center font-medium ${
            type === 'success' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`;
        this.message.textContent = text;
        this.message.classList.remove('hidden');
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                this.message.classList.add('hidden');
            }, 8000);
        }
    }
}

// Project Filter Management
class ProjectFilter {
    constructor() {
        this.grid = elements.projectsGrid;
        this.buttons = elements.filterButtons;
        this.init();
    }

    init() {
        if (this.buttons.length > 0 && this.grid) {
            this.buttons.forEach(button => {
                button.addEventListener('click', () => this.handleFilter(button));
            });
        }
    }

    handleFilter(clickedButton) {
        const filter = clickedButton.dataset.filter;
        
        // Update active button
        this.buttons.forEach(button => {
            button.classList.remove('active', 'bg-primary-500', 'text-dark-900');
            button.classList.add('bg-gray-100', 'dark:bg-dark-800', 'text-dark-600', 'dark:text-dark-300');
        });
        
        clickedButton.classList.remove('bg-gray-100', 'dark:bg-dark-800', 'text-dark-600', 'dark:text-dark-300');
        clickedButton.classList.add('active', 'bg-primary-500', 'text-dark-900');

        // Filter projects with smooth animation
        const projectCards = this.grid.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 50); // Stagger animation
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// FAQ Accordion Management
class FAQAccordion {
    constructor() {
        this.items = elements.faqItems;
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            if (question && answer && icon) {
                question.addEventListener('click', () => {
                    this.toggleItem(answer, icon);
                });
            }
        });
    }

    toggleItem(answer, icon) {
        const isOpen = !answer.classList.contains('hidden');
        
        // Close all other items first
        this.items.forEach(item => {
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-icon');
            if (otherAnswer !== answer) {
                otherAnswer.classList.add('hidden');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        if (isOpen) {
            answer.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.classList.remove('hidden');
            icon.style.transform = 'rotate(45deg)';
        }
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = elements.counters;
        this.init();
    }

    init() {
        if (this.counters.length > 0) {
            this.setupIntersectionObserver();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.dataset.target);
        const duration = 2500; // 2.5 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = 80; // Account for fixed header
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Animations and Effects
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for animation
        document.querySelectorAll('.animate-slide-up, .service-card, .project-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });

        // Header scroll effect
        this.setupHeaderScrollEffect();
    }

    setupHeaderScrollEffect() {
        const header = document.querySelector('nav');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }
}

// Solar Calculator (if needed for future)
class SolarCalculator {
    constructor() {
        this.init();
    }

    init() {
        // Future implementation for solar system sizing calculator
    }

    calculateSystemSize(monthlyBill, sunHours = 5.5) {
        // Basic calculation for Nigerian conditions
        const kWhPerMonth = monthlyBill / 50; // Assuming ₦50 per kWh
        const kWhPerDay = kWhPerMonth / 30;
        const systemSizeKW = kWhPerDay / sunHours;
        
        return {
            systemSize: Math.ceil(systemSizeKW),
            monthlyGeneration: kWhPerMonth,
            estimatedSavings: monthlyBill * 0.9 // 90% savings
        };
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing QiTech Solar website...');
    
    // Initialize DOM elements first
    initElements();
    
    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
        console.log('Lucide icons initialized');
    }
    
    // Initialize dark mode
    const darkModeManager = new DarkModeManager();
    
    // Initialize all other components
    const mobileMenu = new MobileMenu();
    const contactForm = new ContactForm();
    const projectFilter = new ProjectFilter();
    const faqAccordion = new FAQAccordion();
    const counterAnimation = new CounterAnimation();
    const smoothScroll = new SmoothScroll();
    const scrollAnimations = new ScrollAnimations();
    const solarCalculator = new SolarCalculator();
    
    // Make components globally accessible for debugging
    window.qitech = {
        darkModeManager,
        mobileMenu,
        contactForm,
        projectFilter,
        faqAccordion,
        counterAnimation,
        smoothScroll,
        scrollAnimations,
        solarCalculator
    };
    
    console.log('QiTech Solar website initialization complete');
    console.log('Dark mode applied successfully');
});

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.lucide) {
        window.lucide.createIcons();
    }
});

// Global utility functions
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

window.openSolarCalculator = function() {
    // Function to open solar calculator modal
    console.log('Opening solar calculator...');
    // Implementation would go here
};

// Handle window resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize actions
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, 250);
});

// Additional debugging helpers
window.debugDarkMode = function() {
    const html = document.documentElement;
    console.log('HTML classes:', html.className);
    console.log('Dark mode active:', html.classList.contains('dark'));
    console.log('System prefers dark:', window.matchMedia('(prefers-color-scheme: dark)').matches);
};