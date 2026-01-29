// ===================================
// SATVIK SAVOR - MAIN JAVASCRIPT
// ===================================

// ---- CONTACT FORM HANDLER ----
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            console.log('Form submitted to FormSubmit.co');
            // Form will automatically submit via FormSubmit.co
        });
    }
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
});

// ---- SMOOTH SCROLLING FOR NAVIGATION LINKS ----
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

// ---- GAUGE ANIMATION FUNCTIONALITY ----
class GaugeMeter {
    constructor(elementId, value, maxValue = 100) {
        this.element = document.getElementById(elementId);
        this.value = value;
        this.maxValue = maxValue;
        this.animate();
    }

    animate() {
        let currentValue = 0;
        const increment = this.value / 20;
        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= this.value) {
                currentValue = this.value;
                clearInterval(interval);
            }
            this.updateGauge(currentValue);
        }, 50);
    }

    updateGauge(value) {
        const percentage = (value / this.maxValue) * 100;
        const path = this.element.querySelector('.gauge-fill');
        if (path) {
            path.style.strokeDasharray = `${percentage}%`;
        }
    }
}

// ---- SENSOR DATA SIMULATOR ----
class SensorSimulator {
    constructor() {
        this.spiceValue = 65;
        this.saltValue = 50;
        this.tempValue = 65;
        this.updateInterval = 3000; // Update every 3 seconds
    }

    start() {
        setInterval(() => {
            this.updateSensorValues();
        }, this.updateInterval);
    }

    updateSensorValues() {
        // Simulate real-time sensor fluctuations
        this.spiceValue = this.addNoise(this.spiceValue, 65, 60, 70);
        this.saltValue = this.addNoise(this.saltValue, 50, 45, 55);
        this.tempValue = this.addNoise(this.tempValue, 65, 60, 70);

        // Update UI
        this.updateGauges();
        this.updateConsistencyScore();
    }

    addNoise(currentValue, targetValue, min, max) {
        let newValue = currentValue + (Math.random() - 0.5) * 3;
        newValue = Math.max(min, Math.min(max, newValue));
        return Math.round(newValue);
    }

    updateGauges() {
        const spiceGauge = document.querySelector('#spice-gauge .gauge-fill');
        const saltGauge = document.querySelector('#salt-gauge .gauge-fill');
        const tempGauge = document.querySelector('#temp-gauge .gauge-fill');

        if (spiceGauge) {
            spiceGauge.style.strokeDasharray = `${this.spiceValue}%`;
        }
        if (saltGauge) {
            saltGauge.style.strokeDasharray = `${this.saltValue}%`;
        }
        if (tempGauge) {
            tempGauge.style.strokeDasharray = `${this.tempValue}%`;
        }
    }

    updateConsistencyScore() {
        const score = Math.round((this.spiceValue + this.saltValue + this.tempValue) / 3);
        const scoreFill = document.querySelector('.score-fill');
        if (scoreFill) {
            scoreFill.style.width = `${score}%`;
        }
    }
}

// ---- COUNTER ANIMATION FOR STATS ----
class StatCounter {
    constructor(element, endValue) {
        this.element = element;
        this.endValue = parseInt(endValue);
        this.startValue = 0;
        this.duration = 2000; // 2 seconds
    }

    start() {
        const increment = this.endValue / (this.duration / 50);
        let currentValue = this.startValue;

        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= this.endValue) {
                currentValue = this.endValue;
                clearInterval(interval);
            }
            this.element.textContent = Math.round(currentValue).toLocaleString() + (this.element.textContent.includes('%') ? '%' : this.element.textContent.includes('K') ? 'K' : '');
        }, 50);
    }
}

// ---- FORM SUBMISSION ----
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
            successMsg.style.cssText = `
                background-color: #27AE60;
                color: white;
                padding: 16px;
                border-radius: 8px;
                margin-top: 16px;
                text-align: center;
                font-weight: 600;
            `;
            
            contactForm.appendChild(successMsg);
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                successMsg.remove();
            }, 3000);
        });
    }
});

// ---- SCROLL ANIMATION FOR ELEMENTS ----
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .stat-card, .sensor-card').forEach(el => {
    observer.observe(el);
});

// ---- STATS COUNTER INITIALIZATION ----
document.addEventListener('DOMContentLoaded', function() {
    const statsCards = document.querySelectorAll('.stat-card h3');
    let hasStarted = false;

    window.addEventListener('scroll', function() {
        if (!hasStarted && isElementInViewport(document.querySelector('.stats'))) {
            hasStarted = true;
            statsCards.forEach(card => {
                const counter = new StatCounter(card, card.textContent);
                counter.start();
            });
        }
    });

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0
        );
    }
});

// ---- REAL-TIME SENSOR SIMULATION ----
document.addEventListener('DOMContentLoaded', function() {
    const sensorSimulator = new SensorSimulator();
    sensorSimulator.start();
});

// ---- ALERT NOTIFICATION SYSTEM ----
class AlertNotification {
    constructor(message, type = 'info') {
        this.message = message;
        this.type = type; // 'success', 'warning', 'error', 'info'
    }

    show() {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${this.type}`;
        alertDiv.textContent = this.message;
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-weight: 600;
        `;

        // Color based on type
        const colors = {
            'success': '#27AE60',
            'warning': '#F39C12',
            'error': '#E74C3C',
            'info': '#3498DB'
        };

        alertDiv.style.backgroundColor = colors[this.type] || colors['info'];
        document.body.appendChild(alertDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            alertDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                alertDiv.remove();
            }, 300);
        }, 5000);
    }
}

// ---- PAGE LOAD ANIMATION ----
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ---- BUTTON RIPPLE EFFECT ----
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ---- KEYBOARD SHORTCUTS ----
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search (can be expanded)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Future: implement search functionality
    }
});

// ---- PERFORMANCE MONITORING ----
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}

// ---- UTILITY FUNCTIONS ----
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ---- API MOCK FUNCTIONS ----
async function fetchSensorData() {
    // Mock API call - replace with actual endpoint
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                spice: Math.random() * 100,
                salt: Math.random() * 100,
                temperature: 50 + Math.random() * 30,
                sweetness: Math.random() * 100,
                sourness: Math.random() * 100,
                consistency: Math.random() * 100
            });
        }, 1000);
    });
}

async function submitContactForm(formData) {
    // Mock form submission - replace with actual endpoint
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true, message: 'Form submitted successfully' });
        }, 1000);
    });
}

// ---- LIGHT/DARK MODE (OPTIONAL) ----
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference on page load
window.addEventListener('load', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// ---- EXPORT FUNCTIONALITY ----
function exportBatchReport() {
    const reportData = {
        batchId: 'batch_20241209_001',
        date: new Date().toISOString(),
        consistencyScore: 94,
        sensors: {
            spice: 65,
            salt: 50,
            temperature: 65
        }
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'batch_report.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Console welcome message
console.log('%c🌿 Welcome to Satvik Savor', 'font-size: 20px; color: #6B8E71; font-weight: bold');
console.log('%cReal-time Flavor Consistency Measurement', 'font-size: 14px; color: #E67E22');
